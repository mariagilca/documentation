"""Global admonition syntax fix.

Two corpus-wide bugs:

  1. Space-separated admonition titles render as plain text in Docusaurus 3
     (e.g. `:::note Documentation in progress`). They must use the bracket form
     (`:::note[Documentation in progress]`).

  2. `:::caution`, `:::success`, and `:::important` are not registered in
     docusaurus.config.js (`admonitions.keywords`). Docusaurus 3 renamed `caution`
     to `warning`. We convert in-place:
        :::caution      → :::warning
        :::success      → :::tip
        :::important    → :::info
     while preserving any title.

Idempotent. Run from repo root:
    python3 audits/admonition_global_fix.py
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs"

REGISTERED_KEYWORDS = {"note", "tip", "info", "warning", "danger", "discontinued"}

UNREGISTERED_REPLACEMENT = {
    "caution": "warning",
    "success": "tip",
    "important": "info",
}


def fix_space_separated_titles(text: str) -> tuple[str, int]:
    """Convert `:::type Title text…` (start of line) to `:::type[Title text…]`.

    The opening marker must be at the start of the line. The title runs to the
    end of that line. Anything that already uses the bracket form is left alone.
    """
    pattern = re.compile(
        r"^:::(?P<type>[a-z]+) (?!\[)(?P<title>[^\n]+?)\s*$",
        re.MULTILINE,
    )

    def repl(m: re.Match) -> str:
        return f":::{m.group('type')}[{m.group('title')}]"

    new_text, n = pattern.subn(repl, text)
    return new_text, n


def fix_unregistered_types(text: str) -> tuple[str, int]:
    """Rename `:::caution` / `:::success` / `:::important` to a registered type."""
    n = 0
    for old, new in UNREGISTERED_REPLACEMENT.items():
        # Match `:::old` followed by either end-of-line, whitespace, or `[`.
        new_text, k = re.subn(
            rf"^:::{old}(?=$|\s|\[)",
            f":::{new}",
            text,
            flags=re.MULTILINE,
        )
        n += k
        text = new_text
    return text, n


def main() -> int:
    targets = sorted(
        list(ROOT.rglob("*.mdx")) + list(ROOT.rglob("*.md"))
    )
    n_files_changed = 0
    title_total = 0
    type_total = 0
    for p in targets:
        text = p.read_text(encoding="utf-8")
        original = text
        text, n_titles = fix_space_separated_titles(text)
        text, n_types = fix_unregistered_types(text)
        title_total += n_titles
        type_total += n_types
        if text != original:
            p.write_text(text, encoding="utf-8")
            n_files_changed += 1
    print(f"Files scanned:               {len(targets)}")
    print(f"Files modified:              {n_files_changed}")
    print(f"Space→bracket title fixes:   {title_total}")
    print(f"Type renames (caution etc.): {type_total}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
