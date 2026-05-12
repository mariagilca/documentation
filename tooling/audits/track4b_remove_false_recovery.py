"""Remove the false-positive `## note` sections that the recovery pass re-added.

These came from the original buggy `## note` headings; the actual note content
(typically "OpenLM Broker must be installed and configured to report to OpenLM…") is
already present in the current file as a `:::note` admonition or as plain prose.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/engineering-lms"

FALSE_POS_RE = re.compile(
    r"\n## note\n+(.+?)(?=\n## |\Z)",
    re.DOTALL,
)


def main() -> int:
    n = 0
    for p in sorted(ROOT.glob("*.mdx")):
        text = p.read_text(encoding="utf-8")
        new_text = FALSE_POS_RE.sub("", text)
        if new_text != text:
            # Tidy up the resulting blank-line collapse
            new_text = re.sub(r"\n{3,}", "\n\n", new_text)
            p.write_text(new_text, encoding="utf-8")
            n += 1
    print(f"Removed false-positive `## note` blocks from {n} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
