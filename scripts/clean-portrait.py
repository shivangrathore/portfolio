#!/usr/bin/env python3
"""
Replace the portrait background, removing whatever was behind the subject.

Why this exists: an office chair sat directly behind the head. Five hand-rolled
approaches failed before this one, and they are worth recording so nobody
repeats them.

  1. GrabCut seeded with a rectangle       cut off the top of the head.
  2. GrabCut seeded with a trimap          gave a good silhouette, but blurring
                                           the background only softens a chair,
                                           it does not remove it.
  3. Threshold the chair by darkness       found only its outline, because the
                                           chair was inside the subject matte.
  4. Darken the background to hide it      backfired: the chair stayed bright
                                           and became more prominent.
  5. rembg, then repair the old background  matte was clean, but in that frame
                                           the chair touched the shoulder, so
                                           the model absorbed it into the person.

What works is a real matting model plus discarding the original background
entirely rather than repairing it. Nothing from behind the subject survives, so
nothing behind the subject can show through.

The remaining catch is frame choice. If the chair touches the shoulder, the
matting model treats it as part of the person and no amount of compositing will
help. Composite the matte over magenta and look before trusting it: anything
that is not a person and still shows is a matte error.

`scripts/make-portrait.py` does the crop and levelling; run it first.

    pip install "rembg[cpu]" opencv-python-headless numpy
    python3 scripts/clean-portrait.py cropped.png out.jpg
"""

import sys

import cv2
import numpy as np
from rembg import new_session, remove

if len(sys.argv) != 3:
    sys.exit(f"usage: {sys.argv[0]} <cropped.png> <out.jpg>")
src, dst = sys.argv[1], sys.argv[2]

img = cv2.imread(src)
if img is None:
    sys.exit(f"could not read {src}")
img = img.astype(np.float32)
h, w = img.shape[:2]

# isnet-general-use mattes hair far better than the default u2net, which matters
# because a hard edge around hair is what makes a cut-out look fake.
mask = remove(open(src, "rb").read(),
              session=new_session("isnet-general-use"),
              only_mask=True)
alpha = cv2.imdecode(np.frombuffer(mask, np.uint8),
                     cv2.IMREAD_GRAYSCALE).astype(np.float32) / 255.0

# Sample the real wall so the replacement keeps the room's own colour rather
# than a flat grey: the brightest 30% of background pixels is the lit wall and
# nothing else, since anything darker is the furniture being removed.
bg = alpha < 0.02
lab_l = cv2.cvtColor(img.astype(np.uint8), cv2.COLOR_BGR2LAB)[..., 0].astype(np.float32)
wall = img[bg][lab_l[bg] >= np.percentile(lab_l[bg], 70)].mean(axis=0)

# Build the background from scratch: a soft radial falloff behind the head.
yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
radius = np.sqrt(((xx - w * 0.50) / (w * 0.62)) ** 2 +
                 ((yy - h * 0.34) / (h * 0.70)) ** 2)
grad = wall[None, None, :] * np.clip(1.16 - 0.52 * radius, 0.38, 1.10)[..., None]
grad = cv2.GaussianBlur(grad, (0, 0), 40)
# A little grain, so it reads as a photograph and not a CSS gradient.
grad += np.random.default_rng(7).normal(0, 1.6, grad.shape).astype(np.float32)

a = cv2.GaussianBlur(alpha, (0, 0), 1.0)[..., None]
out = np.clip(img * a + grad * (1 - a), 0, 255).astype(np.uint8)
cv2.imwrite(dst, out, [cv2.IMWRITE_JPEG_QUALITY, 93])

print(f"wall sampled at BGR {wall.round(0)} -> {dst}")
print("Check the result at 56x56 before committing.")
