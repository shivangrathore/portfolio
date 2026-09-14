#!/usr/bin/env python3
"""
Regenerate public/favicon.svg from the shipped Archivo file.

The favicon is the letter S at the same variable-font axis settings the wordmark
and every headline use, baked to a path. It has to be a path: an SVG favicon
cannot load a web font, so a <text> node falls back to whatever the OS calls
sans-serif and renders differently on every machine.

Run this after changing the accent colour or the display axis settings:

    pip install fonttools brotli
    python3 scripts/make-favicon.py
    node scripts/make-icons.mjs      # PNG derivatives

Requires fonttools and brotli (the latter only to read the woff2).
"""
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

FONT = "src/assets/fonts/archivo-latin-wdth-wght.woff2"
GLYPH = "S"
AXES = {"wdth": 125, "wght": 800}   # keep in step with the `expanded` utility
ACCENT = "#2f6eff"                  # --color-accent, dark value, as sRGB
INK = "#ffffff"                     # --color-accent-fg
TILE = 32.0
CAP_ON_TILE = 20.0                  # leaves ~6px of quiet zone top and bottom

font = instantiateVariableFont(TTFont(FONT), AXES, inplace=False)
glyphs = font.getGlyphSet()

bounds = BoundsPen(glyphs)
glyphs[GLYPH].draw(bounds)
x_min, y_min, x_max, y_max = bounds.bounds

pen = SVGPathPen(glyphs)
glyphs[GLYPH].draw(pen)
path = pen.getCommands()

scale = CAP_ON_TILE / (y_max - y_min)
ink_w = (x_max - x_min) * scale
# Centre the ink box rather than the advance width. Archivo's S has asymmetric
# sidebearings, and centring on the advance leaves the mark visibly to the left.
tx = (TILE - ink_w) / 2 - x_min * scale
ty = (TILE + CAP_ON_TILE) / 2 + y_min * scale

print(f"{GLYPH} at {AXES}: ink {ink_w:.2f}px wide, scale {scale:.5f}")
