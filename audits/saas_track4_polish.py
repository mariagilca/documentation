"""SaaS Track 4 polish — fix spacing and a few residuals from the migration."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/saas-platforms"
SKIP = {"intro.mdx"}


def add_blank_after_heading(text: str) -> str:
    return re.sub(r"^(#{1,6}\s+[^\n]+)\n(?=[^\n#])", r"\1\n\n", text, flags=re.MULTILINE)


def collapse_blank_runs(text: str) -> str:
    return re.sub(r"\n{3,}", "\n\n", text)


def main() -> int:
    n = 0
    for p in sorted(ROOT.glob("*.mdx")):
        if p.name in SKIP:
            continue
        text = p.read_text(encoding="utf-8")
        original = text
        # Frontmatter: keep as-is
        fm_match = re.match(r"^---\n.*?\n---\n", text, re.DOTALL)
        if not fm_match:
            continue
        fm = text[: fm_match.end()]
        body = text[fm_match.end():]
        body = add_blank_after_heading(body)
        body = collapse_blank_runs(body)
        body = body.rstrip() + "\n"
        text = fm + body
        if text != original:
            p.write_text(text, encoding="utf-8")
            n += 1
    print(f"Polish: changed {n} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
