#!/usr/bin/env python3
"""
Rebuild src/assets/portrait.jpg from a source photograph.

Framing is measured from the face rather than guessed. YuNet returns the eye
landmarks, the image is rotated so the eye line is level, and a square crop is
placed so the eyes sit at 40% from the top with the inter-eye distance at 17% of
the frame width. That last number is what makes this a head-and-shoulders shot
rather than a passport photo, and it is the one worth adjusting if the framing
looks off. A value of 0.23 crops into the hair; 0.17 is right.

Two things this exists to stop happening again:

- Eyeballing the crop. Three attempts were rejected before the numbers were
  derived from landmarks instead of estimated from a thumbnail.
- Shipping without the small-size check. The portrait renders at 56px in the CTA
  band on every page, and a crop that looks fine at 1400px can be an unreadable
  smudge there. Always look at it small before committing.

    pip install opencv-python-headless numpy
    curl -sLo /tmp/yunet.onnx \
      https://github.com/opencv/opencv_zoo/raw/main/models/face_detection_yunet/face_detection_yunet_2023mar.onnx
    python3 scripts/make-portrait.py photo.jpg /tmp/yunet.onnx
"""

import sys

import cv2
import numpy as np

OUT = "src/assets/portrait.jpg"
EYE_Y = 0.40       # eye line, as a fraction from the top of the crop
EYE_FRAC = 0.17    # inter-eye distance, as a fraction of the crop width
SIZE = 1400

if len(sys.argv) != 3:
    sys.exit(f"usage: {sys.argv[0]} <photo> <yunet.onnx>")
src, model = sys.argv[1], sys.argv[2]

img = cv2.imread(src)
if img is None:
    sys.exit(f"could not read {src}")
height, width = img.shape[:2]

# Detect on a downscaled copy: YuNet is trained near this size and it is faster.
# Landmarks are scaled back up before anything is cropped.
scale = 1000 / max(height, width)
small = cv2.resize(img, (int(width * scale), int(height * scale)))

detector = cv2.FaceDetectorYN.create(model, "", (320, 320), 0.6, 0.3, 5000)
detector.setInputSize((small.shape[1], small.shape[0]))
_, faces = detector.detect(small)
if faces is None:
    sys.exit("no face found")

face = max(faces, key=lambda f: f[2] * f[3])
right_eye = (face[4] / scale, face[5] / scale)
left_eye = (face[6] / scale, face[7] / scale)

eye_x = (right_eye[0] + left_eye[0]) / 2
eye_y = (right_eye[1] + left_eye[1]) / 2
eye_dist = float(np.hypot(left_eye[0] - right_eye[0], left_eye[1] - right_eye[1]))
tilt = float(np.degrees(np.arctan2(left_eye[1] - right_eye[1],
                                   left_eye[0] - right_eye[0])))

# Level the eye line. Rotating about the eye midpoint keeps the crop maths below
# valid, because that point does not move. Edge replication only ever affects
# corners the crop does not reach.
rotated = cv2.warpAffine(
    img,
    cv2.getRotationMatrix2D((eye_x, eye_y), tilt, 1.0),
    (width, height),
    flags=cv2.INTER_LANCZOS4,
    borderMode=cv2.BORDER_REPLICATE,
)

side = int(eye_dist / EYE_FRAC)
if side > min(width, height):
    sys.exit(f"face too small: needs a {side}px square from a {width}x{height} image")

left = max(0, min(int(eye_x - side / 2), width - side))
top = max(0, min(int(eye_y - EYE_Y * side), height - side))

crop = cv2.resize(
    rotated[top:top + side, left:left + side],
    (SIZE, SIZE),
    interpolation=cv2.INTER_LANCZOS4,
)
cv2.imwrite(OUT, crop, [cv2.IMWRITE_JPEG_QUALITY, 95])

print(f"levelled {tilt:+.2f} deg, {side}px square at ({left},{top}) -> {OUT}")
print("Grade it next (brightness ~1.03, saturation ~1.07, mild sharpen),")
print("then view it at 56x56 before you commit.")
