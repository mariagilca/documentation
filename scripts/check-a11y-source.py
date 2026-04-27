#!/usr/bin/env python3
"""
Source-level accessibility checks that run in CI.

Catches the regressions the April 2026 audit identified, without needing
a browser. Run before `npm run build` — fails fast with a non-zero exit
when violations are found.

Checks:
  1. JA/EN alt-text parity. A translated Japanese file must not drop alt
     text that the English source carries. ![](path) in JA where EN has
     ![text](path) is the pattern the audit caught (975 regressions).
  2. Multiple H1 in source. A frontmatter `title:` already produces an H1;
     any additional top-level `#` in the body breaks heading structure.
  3. Color-only instructions. Catches "click the red row" and siblings.

Usage: python scripts/check-a11y-source.py [--warn-only]
"""
import argparse, os, re, sys
from collections import defaultdict

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOCS = os.path.join(REPO, "docs")
JA_ROOT = os.path.join(REPO, "i18n", "ja")
BLOG = os.path.join(REPO, "blog")

COLOR_ONLY_PATTERNS = [
    re.compile(r"\b(?:click|double-click|select|press)\s+the\s+(red|green|blue|yellow|orange)\s+(?:row|button|item|box|cell)\b", re.I),
    re.compile(r"\b(red|green|blue|yellow) row (?:for|with)\b", re.I),
]

IMG_RE = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")
H1_RE = re.compile(r"^# +\S", re.M)


def walk_md(root):
    for r, _, files in os.walk(root):
        for f in files:
            if f.endswith(".md") or f.endswith(".mdx"):
                yield os.path.join(r, f)


def scan_en_alts():
    """Map image path → English alt text (first occurrence wins)."""
    alts = {}
    for p in walk_md(DOCS):
        try:
            txt = open(p, encoding="utf-8").read()
        except OSError:
            continue
        for m in IMG_RE.finditer(txt):
            alt, path = m.group(1).strip(), m.group(2).split("#")[0].split("?")[0].strip()
            if alt and path not in alts:
                alts[path] = alt
    return alts


def check_alt_parity(en_map):
    violations = []
    for p in walk_md(JA_ROOT):
        try:
            txt = open(p, encoding="utf-8").read()
        except OSError:
            continue
        for m in IMG_RE.finditer(txt):
            alt = m.group(1).strip()
            path = m.group(2).split("#")[0].split("?")[0].strip()
            if not alt and path in en_map:
                rel = os.path.relpath(p, REPO)
                line = txt[: m.start()].count("\n") + 1
                violations.append((rel, line, path, en_map[path]))
    return violations


def check_multi_h1():
    """Flag files with TWO OR MORE body H1s. Docusaurus dedupes a single body
    H1 against the frontmatter title when they match, so a single `#` line
    is usually safe. Two or more `#` lines always produce extra H1s in
    rendered HTML regardless of frontmatter behavior."""
    violations = []
    for p in list(walk_md(DOCS)) + list(walk_md(JA_ROOT)) + list(walk_md(BLOG)):
        try:
            txt = open(p, encoding="utf-8").read()
        except OSError:
            continue
        fm_match = re.match(r"^---\s*\n(.*?)\n---\s*\n", txt, re.S)
        body = txt[fm_match.end():] if fm_match else txt
        # Strip fenced code blocks (where `#` is a comment, not a heading)
        body_no_code = re.sub(r"```.*?```", "", body, flags=re.S)
        h1_count = len(H1_RE.findall(body_no_code))
        if h1_count >= 2:
            rel = os.path.relpath(p, REPO)
            violations.append((rel, h1_count))
    return violations


def check_color_only():
    violations = []
    for p in list(walk_md(DOCS)) + list(walk_md(JA_ROOT)):
        try:
            txt = open(p, encoding="utf-8").read()
        except OSError:
            continue
        for i, line in enumerate(txt.splitlines(), 1):
            for patt in COLOR_ONLY_PATTERNS:
                if patt.search(line):
                    rel = os.path.relpath(p, REPO)
                    violations.append((rel, i, line.strip()[:100]))
                    break
    return violations


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--warn-only", action="store_true",
                    help="Print findings but exit 0 even when violations exist.")
    args = ap.parse_args()

    print("Accessibility source checks", flush=True)
    print("=" * 60)

    en_map = scan_en_alts()
    print(f"Indexed {len(en_map)} English alt texts")

    print("\n[1/3] JA/EN alt-text parity ...")
    parity = check_alt_parity(en_map)
    for rel, line, path, en_alt in parity[:10]:
        print(f"  FAIL  {rel}:{line}  empty alt; EN has: {en_alt!r}")
    if len(parity) > 10:
        print(f"  ... and {len(parity) - 10} more")
    print(f"  Total parity failures: {len(parity)}")

    print("\n[2/3] Multiple H1 in source (with frontmatter title) ...")
    multi_h1 = check_multi_h1()
    for rel, n in multi_h1[:10]:
        print(f"  FAIL  {rel}  ({n} H1s estimated)")
    if len(multi_h1) > 10:
        print(f"  ... and {len(multi_h1) - 10} more")
    print(f"  Total multi-H1 files: {len(multi_h1)}")

    print("\n[3/3] Color-only instructions ...")
    color = check_color_only()
    for rel, line, snippet in color[:10]:
        print(f"  FAIL  {rel}:{line}  {snippet!r}")
    print(f"  Total color-only instructions: {len(color)}")

    total = len(parity) + len(multi_h1) + len(color)
    print("\n" + "=" * 60)
    print(f"Total violations: {total}")

    if total == 0:
        print("All source-level accessibility checks passed.")
        return 0
    if args.warn_only:
        print("Exiting 0 because --warn-only is set.")
        return 0
    print("Exiting 1 because violations were found.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
