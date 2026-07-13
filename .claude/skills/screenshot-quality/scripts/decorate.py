#!/usr/bin/env python3
"""Crop the browser chrome off a raw 2x screencapture, then apply the house
decoration: ANTI-ALIASED rounded corners + a soft drop shadow, saved as an alpha PNG.

Usage:  decorate.py <raw.png> <out.png>

- Auto-detects the top of the app (first mostly-dark-navy row) and crops everything
  above it (Chrome tab bar / address bar / any "Claude is debugging" infobar).
  If the app header isn't dark, set FALLBACK_TOP or crop the raw yourself first.
- Rounded corners use a 4x-supersampled mask downscaled with LANCZOS. Do NOT replace
  this with ImageMagick `-compose DstIn` / `CopyOpacity` — both render a black card in IM7.

Requires: Pillow  (pip install Pillow)
"""
import sys
from PIL import Image, ImageDraw, ImageFilter

FALLBACK_TOP = 348          # used if the dark-header auto-detect fails (2x px)
RADIUS = 26                 # corner radius (2x px)
PAD = 30                    # transparent padding around the card (room for the shadow)
BLUR = 20                   # shadow blur radius
SHADOW_DY = 10              # shadow vertical offset
SHADOW = (15, 23, 42, 60)   # navy shadow, ~24% opacity

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
W, H = im.size
px = im.load()


def is_navy(p):
    r, g, b = p
    return r < 55 and g < 80 and b < 115 and b >= r


xs = list(range(300, min(W - 200, 2600), 60))
top = FALLBACK_TOP
for y in range(0, min(H // 2, 760)):
    if sum(1 for x in xs if is_navy(px[x, y])) >= 0.85 * len(xs):
        top = y
        break

im = im.crop((0, top, W, H)).convert('RGBA')
W, H = im.size

ss = 4
mb = Image.new('L', (W * ss, H * ss), 0)
ImageDraw.Draw(mb).rounded_rectangle((0, 0, W * ss - 1, H * ss - 1), radius=RADIUS * ss, fill=255)
im.putalpha(mb.resize((W, H), Image.LANCZOS))

sh = Image.new('RGBA', (W + 2 * PAD, H + 2 * PAD), (0, 0, 0, 0))
ImageDraw.Draw(sh).rounded_rectangle(
    (PAD, PAD + SHADOW_DY, PAD + W - 1, PAD + H - 1 + SHADOW_DY), radius=RADIUS, fill=SHADOW)
sh = sh.filter(ImageFilter.GaussianBlur(BLUR))
sh.alpha_composite(im, (PAD, PAD))
sh.save(dst)
print('wrote', dst, sh.size, 'cropTop=', top)
