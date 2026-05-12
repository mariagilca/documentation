"""SaaS Track 1 cleanup pass — fix issues introduced or surfaced by the normalizer.

  1. Line merge: `OpenLM Cloud Broker, approved in [Broker Hub](...)`.- Platform-specific Requirements
     The trailing `\\s*` consumed the newline. Re-insert a newline.
  2. Stray `\\` on its own line (manual line breaks copied from Google Docs).
  3. Bullet glyph followed by missing space (`-Foo`).
  4. Common typos: API Tocken → API Token.
  5. Trim trailing whitespace at end of file.

Idempotent.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/saas-platforms"


def fix_line_merge(text: str) -> tuple[str, int]:
    """Insert a newline+`- ` between the OpenLM components line and the immediately-merged Platform-specific bullet."""
    new_text = re.sub(
        r"(OpenLM components: OpenLM Cloud Broker, approved in \[Broker Hub\]\(/cloud/data-collection/broker-hub\)\.)\s*-\s*(Platform-specific Requirements:)",
        r"\1\n- \2",
        text,
    )
    return new_text, 1 if new_text != text else 0


def drop_orphan_backslashes(text: str) -> tuple[str, int]:
    """Drop lines that are just a `\\` (manual line breaks from Google Docs)."""
    new_text = re.sub(r"^\\\s*\n", "", text, flags=re.MULTILINE)
    return new_text, 1 if new_text != text else 0


def fix_typos(text: str) -> tuple[str, int]:
    n = 0
    for pat, rep in [
        (r"\bAPI Tocken\b", "API token"),
        (r"\bTocken\b", "token"),
        (r"setup ([A-Z])", r"set up \1"),  # "to setup X" → "to set up X" — Splunk style
    ]:
        text, k = re.subn(pat, rep, text)
        n += k
    return text, n


def trim_trailing(text: str) -> tuple[str, int]:
    new_text = text.rstrip() + "\n"
    return new_text, 1 if new_text != text else 0


def main() -> int:
    n_changed = 0
    for p in sorted(ROOT.glob("*.mdx")):
        text = p.read_text(encoding="utf-8")
        original = text
        for fn in (fix_line_merge, drop_orphan_backslashes, fix_typos, trim_trailing):
            text, _ = fn(text)
        if text != original:
            p.write_text(text, encoding="utf-8")
            n_changed += 1
    print(f"Cleanup: changed {n_changed} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
