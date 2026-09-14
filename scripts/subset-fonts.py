#!/usr/bin/env python3
"""
Shrink the shipped Geist woff2 files.

The upstream fontsource files carry the full 100 to 900 weight axis and every
OpenType feature the family has. This site uses three weights, and mono
ligatures are switched off in CSS because they overlapped in code blocks, so
most of that data is downloaded and never used. Two of these files sit on the
critical path of every page, which is why it is worth the trouble.

What it does, per file:
  - keeps every character the original mapped, so no page can lose a glyph
  - keeps only the layout features the site actually renders
  - clamps the weight axis to 400-700

Result is roughly 40% off the sans and 50% off the mono.

Originals live in src/assets/fonts/source/ and are never edited. This writes
the shipped copies one directory up. Re-run after replacing a source file:

    python3 -m venv /tmp/fontenv
    /tmp/fontenv/bin/pip install fonttools brotli
    /tmp/fontenv/bin/python scripts/subset-fonts.py

Weight range note: 400 is body, 500 is `font-medium`, 600 is `font-semibold`,
700 is what <strong> falls back to in prose. Anything outside that range gets
clamped by the browser, so widen this if the design ever uses a lighter face.
"""

import os
import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.subset import Options, Subsetter

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src/assets/fonts/source"
DEST = ROOT / "src/assets/fonts"

WEIGHT_RANGE = (400, 400, 700)

# Sans keeps contextual alternates and standard ligatures. Mono keeps neither:
# global.css disables them, and shipping the tables anyway costs bytes.
FEATURES = {
    "geist-latin-wght-normal": ["kern", "liga", "calt"],
    "geist-latin-ext-wght-normal": ["kern", "liga", "calt"],
    "geist-mono-latin-wght-normal": ["kern"],
    "geist-mono-latin-ext-wght-normal": ["kern"],
}


def shrink(name: str, features: list[str]) -> tuple[int, int]:
    src = SOURCE / f"{name}.woff2"
    font = TTFont(src)

    # Every mapped codepoint is retained. The unicode-range in fonts.css
    # promises the browser this file covers them; dropping any would render
    # tofu rather than falling through to the next face.
    unicodes = sorted(font.getBestCmap())

    options = Options()
    options.layout_features = features
    options.name_IDs = [1, 2, 3, 4, 5, 6]
    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)

    # Subset first, instance second. The other order trips a .notdef lookup
    # inside fontTools when it prunes gvar.
    font = instancer.instantiateVariableFont(
        font, {"wght": WEIGHT_RANGE}, updateFontNames=False
    )

    font.flavor = "woff2"
    out = DEST / f"{name}.woff2"
    font.save(out)
    return os.path.getsize(src), os.path.getsize(out)


def main() -> int:
    if not SOURCE.is_dir():
        print(f"no source directory at {SOURCE}", file=sys.stderr)
        return 1

    total_before = total_after = 0
    for name, features in FEATURES.items():
        before, after = shrink(name, features)
        total_before += before
        total_after += after
        print(f"{name}: {before:,} -> {after:,} ({100 - round(after / before * 100)}% smaller)")

    print(f"total: {total_before:,} -> {total_after:,}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
