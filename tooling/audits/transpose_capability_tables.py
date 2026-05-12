"""Transpose vertical 2-column 'Monitoring capabilities' tables to horizontal.

Vertical (current):
    | Item              | Value      |
    | ---               | ---        |
    | Report resolution | By second  |
    | License totals    | Yes        |
    | License usage     | Yes        |

Horizontal (target):
    | Report resolution | License totals | License usage |
    | ---               | ---            | ---           |
    | By second         | Yes            | Yes           |

Scope:
  - docs/cloud/data-collection/connect-license-managers/**/*.mdx
  - i18n/ja/docusaurus-plugin-content-docs-cloud/current/data-collection/connect-license-managers/**/*.mdx

Detection:
  - Table sits inside the section starting with `## Monitoring capabilities` (en) or
    `## 監視機能` (ja) and ending at the next `## ` heading or end-of-file.
  - Table header has exactly two columns whose first cell is `Item` / `項目` and
    whose second cell is `Value` / `値`.

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

CAPABILITIES_HEADING_RE = re.compile(
    r"^##\s+(?:Monitoring capabilities(?:\s+and features)?|監視機能)\s*$",
    re.MULTILINE,
)


def split_section(text: str, heading_match: re.Match) -> tuple[str, str, str]:
    """Return (before, section, after) where `section` is the body of the
    Monitoring capabilities section, up to the next ## heading or end."""
    section_start = heading_match.end()
    next_h2 = re.search(r"\n##\s", text[section_start:])
    if next_h2:
        section_end = section_start + next_h2.start()
    else:
        section_end = len(text)
    return text[:heading_match.end()], text[heading_match.end():section_end], text[section_end:]


TABLE_RE = re.compile(
    r"(?P<header>\|[^\n]+\|)\s*\n"
    r"(?P<separator>\|[\s|:-]+\|)\s*\n"
    r"(?P<rows>(?:\|[^\n]+\|\s*\n)+)",
    re.MULTILINE,
)


def parse_row(row: str) -> list[str]:
    """Parse a markdown table row line into a list of cell strings."""
    inner = row.strip()
    if inner.startswith("|"):
        inner = inner[1:]
    if inner.endswith("|"):
        inner = inner[:-1]
    return [c.strip() for c in inner.split("|")]


def make_row(cells: list[str]) -> str:
    return "| " + " | ".join(cells) + " |"


def transpose_vertical_to_horizontal(table_text: str) -> str | None:
    """Given the matched table text, return the horizontal form, or None if the table
    isn't a 2-column Item/Value table."""
    m = TABLE_RE.search(table_text)
    if not m:
        return None
    header_cells = parse_row(m.group("header"))
    if len(header_cells) != 2:
        return None
    h0, h1 = header_cells[0].lower(), header_cells[1].lower()
    if h0 not in ("item", "項目") or h1 not in ("value", "値"):
        return None
    items: list[str] = []
    values: list[str] = []
    for line in m.group("rows").rstrip("\n").splitlines():
        cells = parse_row(line)
        if len(cells) < 2:
            continue
        items.append(cells[0])
        values.append(cells[1])
    if not items:
        return None
    new_header = make_row(items)
    new_separator = "| " + " | ".join("---" for _ in items) + " |"
    new_values = make_row(values)
    return f"{new_header}\n{new_separator}\n{new_values}\n"


def process(text: str) -> tuple[str, int]:
    n = 0
    while True:
        h = CAPABILITIES_HEADING_RE.search(text)
        if not h:
            break
        before_section_end_idx = h.end()
        # Find the section end
        next_h2 = re.search(r"\n##\s", text[before_section_end_idx:])
        section_end = before_section_end_idx + next_h2.start() if next_h2 else len(text)
        section = text[before_section_end_idx:section_end]
        # Detect the table inside the section
        m = TABLE_RE.search(section)
        if not m:
            # No table found → mark heading as visited by moving past it
            text = text[:h.start()] + "##__VISITED__" + text[h.start() + 2:]
            continue
        replacement = transpose_vertical_to_horizontal(section[m.start():m.end()])
        if replacement is None:
            text = text[:h.start()] + "##__VISITED__" + text[h.start() + 2:]
            continue
        # Splice the replacement back into text
        new_section = section[:m.start()] + replacement + section[m.end():]
        text = text[:before_section_end_idx] + new_section + text[section_end:]
        n += 1
        # Continue scanning past this heading by sentinel
        text = text[:h.start()] + "##__VISITED__" + text[h.start() + 2:]
    # Restore the sentinel back to "##"
    text = text.replace("##__VISITED__", "##")
    return text, n


def main() -> int:
    total_files = 0
    changed_files = 0
    total_tables = 0
    for scope in SCOPES:
        if not scope.exists():
            continue
        for p in sorted(scope.rglob("*.mdx")):
            total_files += 1
            original = p.read_text(encoding="utf-8")
            new_text, n = process(original)
            if new_text != original:
                p.write_text(new_text, encoding="utf-8")
                changed_files += 1
                total_tables += n
    print(f"Files scanned:    {total_files}")
    print(f"Files modified:   {changed_files}")
    print(f"Tables transposed:{total_tables}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
