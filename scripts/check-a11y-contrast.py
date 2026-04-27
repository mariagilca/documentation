#!/usr/bin/env python3
"""
Contrast regression check.

Reads every hex token in src/css/custom.css and asserts that a fixed set
of foreground/background pairs clears WCAG 2.1 AA (4.5:1 for text, 3:1
for large text) and APCA Lc 60 (perceptual threshold, used as a warning).

Fails fast when a future edit lowers contrast.

Usage: python scripts/check-a11y-contrast.py [--strict]
  --strict fails on APCA as well as WCAG.
"""
import argparse, os, re, sys

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CSS = os.path.join(REPO, "src", "css", "custom.css")

TEXT_ON_SURFACE_PAIRS = [
    # (text_token, surface_token, required_WCAG)
    ("--rmk-color-text-primary",   "--rmk-color-surface",          4.5),
    ("--rmk-color-text-heading",   "--rmk-color-surface",          3.0),  # large
    ("--rmk-color-text-body",      "--rmk-color-surface",          4.5),
    ("--rmk-color-text-muted",     "--rmk-color-surface-muted",    4.5),
    ("--rmk-color-text-subtle",    "--rmk-color-surface-subtle",   4.5),
    ("--rmk-color-text-tertiary",  "--rmk-color-surface-hover",    4.5),
    ("--rmk-color-text-neutral",   "--rmk-color-surface",          4.5),
    ("--rmk-color-link",           "--rmk-color-surface",          4.5),
    ("--rmk-color-link",           "--rmk-color-surface-subtle",   4.5),
    ("--rmk-docs-heading-h1",      "--rmk-color-surface",          3.0),
]

BADGE_WHITE_PAIRS = [
    "--rmk-color-release-updated",
    "--rmk-color-release-added",
    "--rmk-color-release-fixed",
    "--rmk-color-release-removed",
    "--rmk-color-release-improved",
]


def extract_block(src, marker):
    i = src.find(marker)
    if i < 0:
        return ""
    depth = 0
    start = src.find("{", i)
    for j in range(start, len(src)):
        if src[j] == "{":
            depth += 1
        elif src[j] == "}":
            depth -= 1
            if depth == 0:
                return src[start + 1: j]
    return ""


HEX_RE = re.compile(r"(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{6,8})\b")


def tokens_of(block):
    return dict(HEX_RE.findall(block))


def hex2rgb(h):
    h = h.lstrip("#")[:6]
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def rel_lum(rgb):
    def ch(c):
        c /= 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = rgb
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)


def wcag(fg, bg):
    l1, l2 = rel_lum(hex2rgb(fg)), rel_lum(hex2rgb(bg))
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def apca_Y(rgb):
    r, g, b = [c / 255 for c in rgb]
    return 0.2126729 * r ** 2.4 + 0.7151522 * g ** 2.4 + 0.0721750 * b ** 2.4


def apca_lc(txt, bg):
    Yt, Yb = apca_Y(hex2rgb(txt)), apca_Y(hex2rgb(bg))
    blk_t, blk_c = 0.022, 1.414

    def soft(Y):
        return Y if Y >= blk_t else Y + (blk_t - Y) ** blk_c

    Yt, Yb = soft(Yt), soft(Yb)
    if Yb > Yt:
        sapc = (Yb ** 0.56 - Yt ** 0.57) * 1.14
        return (sapc - 0.027) * 100 if sapc >= 0.001 else 0
    sapc = (Yb ** 0.62 - Yt ** 0.65) * 1.14
    return (sapc + 0.027) * 100 if sapc <= -0.001 else 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--strict", action="store_true",
                    help="Fail when APCA Lc drops below 60 (in addition to WCAG failures).")
    args = ap.parse_args()

    css = open(CSS).read()
    light = tokens_of(extract_block(css, ":root {"))
    dark = tokens_of(extract_block(css, "[data-theme='dark'] {"))

    fails = 0
    warns = 0
    print("Contrast regression check")
    print("=" * 60)
    for theme_name, toks in [("light", light), ("dark", dark)]:
        print(f"\n{theme_name.upper()} theme")
        for fg_k, bg_k, floor in TEXT_ON_SURFACE_PAIRS:
            fg = toks.get(fg_k)
            bg = toks.get(bg_k)
            if not fg or not bg:
                continue
            w = wcag(fg, bg)
            a = abs(apca_lc(fg, bg))
            status = "OK  "
            if w < floor:
                status = "FAIL"
                fails += 1
            elif a < 60 and args.strict:
                status = "FAIL"
                fails += 1
            elif a < 60:
                status = "WARN"
                warns += 1
            print(f"  {status}  {fg_k:<30} on {bg_k:<30} WCAG {w:5.2f}:1 APCA Lc {a:5.1f} (need {floor}:1)")

        # Badge contrast (white text on bg)
        for k in BADGE_WHITE_PAIRS:
            bg = toks.get(k)
            if not bg:
                continue
            w = wcag("#ffffff", bg)
            a = abs(apca_lc("#ffffff", bg))
            status = "OK  " if w >= 4.5 else "FAIL"
            if w < 4.5:
                fails += 1
            print(f"  {status}  {'white':<30} on {k:<30} WCAG {w:5.2f}:1 APCA Lc {a:5.1f} (need 4.5:1)")

    print()
    print("=" * 60)
    print(f"WCAG failures: {fails}")
    print(f"APCA warnings: {warns}")
    if fails:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
