"""Replace UI-navigation ` > ` and ` -> ` separators with the Unicode arrow ` → `.

Scope (corpus-wide for the connect-license-managers section, both en and ja):
  - docs/cloud/data-collection/connect-license-managers/**/*.mdx, *.md
  - i18n/ja/docusaurus-plugin-content-docs-cloud/current/data-collection/connect-license-managers/**/*.mdx, *.md

Skip rules to avoid false positives:
  - Frontmatter (between the first two `---` lines).
  - Fenced code blocks (between ``` markers, on their own lines).
  - Inline code spans (text wrapped in single backticks).
  - Markdown blockquote lines (lines that start with `> ` after optional indent).
  - HTML / JSX-like angle-bracket placeholders such as `<vendor>` and `</foo>` —
    we only touch space-separated separators ` > ` and ` -> `.

Idempotent.
"""

from __future__ import annotations

import re
from pathlib import Path

REPO = Path(__file__).parent.parent
SCOPES = [
    REPO / "docs/cloud/data-collection/connect-license-managers",
    REPO / "i18n/ja/docusaurus-plugin-content-docs-cloud/current/data-collection/connect-license-managers",
]

ARROW = " → "

# ---------- Segmenting helpers --------------------------------------------

FRONTMATTER_RE = re.compile(r"^---\n.*?\n---\n", re.DOTALL)


def split_frontmatter(text: str) -> tuple[str, str]:
    m = FRONTMATTER_RE.match(text)
    if m:
        return text[: m.end()], text[m.end():]
    return "", text


CODE_FENCE_RE = re.compile(r"^(\s*)(```|~~~)", re.MULTILINE)


def transform_body(body: str) -> tuple[str, int]:
    """Walk lines, toggling in_code_fence on fence markers, and apply the arrow rule
    to non-code, non-blockquote lines. Inline code spans are protected per-line."""
    out_lines: list[str] = []
    in_fence = False
    fence_marker: str | None = None
    n_changes = 0
    for line in body.splitlines(keepends=True):
        stripped = line.lstrip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            marker = stripped[:3]
            if not in_fence:
                in_fence = True
                fence_marker = marker
            elif fence_marker and stripped.startswith(fence_marker):
                in_fence = False
                fence_marker = None
            out_lines.append(line)
            continue
        if in_fence:
            out_lines.append(line)
            continue
        # Skip blockquote lines so we don't touch markdown `> Note:`-style quotes.
        if re.match(r"^\s{0,3}>\s", line):
            out_lines.append(line)
            continue
        new_line, k = transform_line(line)
        n_changes += k
        out_lines.append(new_line)
    return "".join(out_lines), n_changes


INLINE_CODE_RE = re.compile(r"(`[^`\n]*`)")


def transform_line(line: str) -> tuple[str, int]:
    """Apply arrow substitution to a line, leaving inline-code spans alone."""
    parts = INLINE_CODE_RE.split(line)
    n_changes = 0
    for i, part in enumerate(parts):
        if part.startswith("`") and part.endswith("`"):
            continue
        new_part, k = apply_arrow_subs(part)
        n_changes += k
        parts[i] = new_part
    return "".join(parts), n_changes


# ---------- The actual replacement -----------------------------------------

# `->` between word characters (incl. **bold**) — almost always UI navigation.
ARROW_DASH_RE = re.compile(r"(?<=\S) -> (?=\S)")
# `>` between word characters — could be UI nav or comparison; we only catch the
# cases where both sides "look like" UI labels: bold-wrapped, or capitalized text.
# Cheaper and good enough for connect-license-managers content: any ` > ` between
# non-whitespace tokens that isn't an HTML entity (e.g. "&gt;") and isn't a closing
# tag ("</foo>") will be replaced.
ARROW_GT_RE = re.compile(
    r"""
    (?<=\S)        # non-whitespace before
    [ ]>[ ]        # space, >, space
    (?=\S)         # non-whitespace after
    """,
    re.VERBOSE,
)


def apply_arrow_subs(text: str) -> tuple[str, int]:
    new_text, k1 = ARROW_DASH_RE.subn(ARROW, text)
    new_text, k2 = ARROW_GT_RE.subn(ARROW, new_text)
    return new_text, k1 + k2


# ---------- Driver ---------------------------------------------------------

def process(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    fm, body = split_frontmatter(text)
    new_body, n = transform_body(body)
    if n:
        path.write_text(fm + new_body, encoding="utf-8")
    return n


def main() -> int:
    total_files = 0
    changed_files = 0
    total_subs = 0
    for scope in SCOPES:
        if not scope.exists():
            continue
        for p in sorted(list(scope.rglob("*.mdx")) + list(scope.rglob("*.md"))):
            total_files += 1
            n = process(p)
            if n:
                changed_files += 1
                total_subs += n
    print(f"Files scanned:  {total_files}")
    print(f"Files modified: {changed_files}")
    print(f"Substitutions:  {total_subs}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
