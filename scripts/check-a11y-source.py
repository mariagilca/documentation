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
  4. Tag parity and vocabulary. EN and JA copies of a doc must carry
     identical `tags:` (tag values are route keys for the generated /tags/
     pages); where a doc set has a tags.yml, every used tag must be
     declared in it, and a localized tags.yml must declare the same keys.

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


def extract_frontmatter(txt):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", txt, re.S)
    return m.group(1) if m else None


def extract_tags(fm):
    """Tag values from a frontmatter block. Handles both forms in use:
    inline array (tags: [a, b]) and block list (tags:\\n  - a)."""
    lines = fm.splitlines()
    for i, line in enumerate(lines):
        m = re.match(r"^tags:\s*(.*?)\s*$", line)
        if not m:
            continue
        rest = m.group(1)
        if rest.startswith("["):
            inner = rest.strip("[]")
            return {t.strip().strip("'\"") for t in inner.split(",") if t.strip()}
        tags = set()
        for nxt in lines[i + 1:]:
            lm = re.match(r"^\s+-\s+(.+?)\s*$", nxt)
            if not lm:
                break
            tags.add(lm.group(1).strip().strip("'\""))
        return tags
    return set()


def tags_yml_keys(path):
    """Top-level keys of a tags.yml, or None if the file doesn't exist."""
    if not os.path.isfile(path):
        return None
    keys = set()
    for line in open(path, encoding="utf-8"):
        m = re.match(r"^([A-Za-z0-9_-]+):", line)
        if m:
            keys.add(m.group(1))
    return keys


def check_tag_parity():
    """EN/JA tag-set parity per doc, plus tags.yml vocabulary checks.
    Walks DOCS + JA_ROOT only (blog is disabled and removed)."""
    violations = []
    doc_sets = {
        "cloud": os.path.join(JA_ROOT, "docusaurus-plugin-content-docs-cloud", "current"),
        "legacy": os.path.join(JA_ROOT, "docusaurus-plugin-content-docs-legacy", "current"),
    }
    used = defaultdict(set)  # doc set -> tags used in EN sources
    for p in walk_md(DOCS):
        rel_docs = os.path.relpath(p, DOCS)
        doc_set = rel_docs.split(os.sep)[0]
        if doc_set not in doc_sets:
            continue
        try:
            txt = open(p, encoding="utf-8").read()
        except OSError:
            continue
        fm = extract_frontmatter(txt)
        en_tags = extract_tags(fm) if fm else set()
        used[doc_set] |= en_tags
        ja_path = os.path.join(doc_sets[doc_set], os.path.relpath(p, os.path.join(DOCS, doc_set)))
        if not os.path.isfile(ja_path):
            continue  # missing translation is not a tag violation
        try:
            ja_txt = open(ja_path, encoding="utf-8").read()
        except OSError:
            continue
        ja_fm = extract_frontmatter(ja_txt)
        ja_tags = extract_tags(ja_fm) if ja_fm else set()
        if en_tags != ja_tags:
            violations.append((os.path.relpath(p, REPO),
                               f"EN tags {sorted(en_tags)} != JA tags {sorted(ja_tags)} "
                               f"({os.path.relpath(ja_path, REPO)})"))
    for doc_set, ja_dir in doc_sets.items():
        en_yml = os.path.join(DOCS, doc_set, "tags.yml")
        declared = tags_yml_keys(en_yml)
        if declared is None:
            continue  # no tags.yml for this doc set; vocabulary is ungoverned
        undeclared = used[doc_set] - declared
        for tag in sorted(undeclared):
            violations.append((os.path.relpath(en_yml, REPO),
                               f"tag '{tag}' is used in docs/{doc_set}/ but not declared"))
        ja_declared = tags_yml_keys(os.path.join(ja_dir, "tags.yml"))
        if ja_declared is not None and ja_declared != declared:
            violations.append((os.path.relpath(os.path.join(ja_dir, "tags.yml"), REPO),
                               f"keys {sorted(ja_declared)} != EN tags.yml keys {sorted(declared)}"))
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

    print("\n[1/4] JA/EN alt-text parity ...")
    parity = check_alt_parity(en_map)
    for rel, line, path, en_alt in parity[:10]:
        print(f"  FAIL  {rel}:{line}  empty alt; EN has: {en_alt!r}")
    if len(parity) > 10:
        print(f"  ... and {len(parity) - 10} more")
    print(f"  Total parity failures: {len(parity)}")

    print("\n[2/4] Multiple H1 in source (with frontmatter title) ...")
    multi_h1 = check_multi_h1()
    for rel, n in multi_h1[:10]:
        print(f"  FAIL  {rel}  ({n} H1s estimated)")
    if len(multi_h1) > 10:
        print(f"  ... and {len(multi_h1) - 10} more")
    print(f"  Total multi-H1 files: {len(multi_h1)}")

    print("\n[3/4] Color-only instructions ...")
    color = check_color_only()
    for rel, line, snippet in color[:10]:
        print(f"  FAIL  {rel}:{line}  {snippet!r}")
    print(f"  Total color-only instructions: {len(color)}")

    print("\n[4/4] EN/JA tag parity and tags.yml vocabulary ...")
    tag_violations = check_tag_parity()
    for rel, msg in tag_violations[:10]:
        print(f"  FAIL  {rel}  {msg}")
    if len(tag_violations) > 10:
        print(f"  ... and {len(tag_violations) - 10} more")
    print(f"  Total tag violations: {len(tag_violations)}")

    total = len(parity) + len(multi_h1) + len(color) + len(tag_violations)
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
