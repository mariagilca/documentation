"""Track 4a: migrate stub pages to the unified Stub variant.

Targets the ~20 stub files that match one of the legacy stub patterns:
  - "Placeholder: integration guide coming soon"  (free-text)
  - ":::note The integration document is under development. :::"  (note admonition)
  - The "preparing detailed instructions" partial stub
  - The "configure OpenLM with the Altair License Server" Nvidia-style partial (already
    handled by Track 1 hand-fix; skipped here)

Substantive pages (with capability tables or procedures) are skipped — those are Track 4b.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/engineering-lms"

# Read existing frontmatter and detect product display name + slug.
FM_RE = re.compile(r"^---\n(?P<fm>.*?)\n---", re.DOTALL)


def parse_frontmatter(text: str) -> dict:
    m = FM_RE.match(text)
    if not m:
        return {}
    out = {}
    for line in m.group("fm").splitlines():
        if ":" in line:
            k, _, v = line.partition(":")
            out[k.strip()] = v.strip().strip('"').strip("'")
    return out


def is_stub(text: str) -> bool:
    """Return True if the file is one of the legacy stub patterns."""
    body = text.split("---", 2)[-1] if text.startswith("---") else text
    body = body.strip()

    # Strip the H1 heading
    body = re.sub(r"^#\s+[^\n]+\n+", "", body)

    if "Placeholder: integration guide coming soon" in body:
        return True
    if ":::note" in body and "integration document is under development" in body:
        return True
    # Bare-note version of the same
    if body.startswith(":::note") and len(body) < 200:
        return True
    # "We are preparing detailed instructions" partial stub
    if "We are preparing detailed instructions" in body or "preparing detailed instructions" in body:
        return True
    return False


STUB_TEMPLATE = """---
title: "{title}"
slug: "{slug}"
description: "{description}"
keywords:
  - {kw}
  - license manager
  - openlm broker
---
# {title}

OpenLM monitors {title} through OpenLM Broker. Detailed configuration steps are being prepared and will be published in the next documentation release.

## Before you begin

- OpenLM Platform.
- OpenLM Broker v25.x or later, installed on the same machine as {title} and approved in [Broker Hub](/cloud/data-collection/broker-hub).

:::note Documentation in progress
If you need to configure {title} today, open a ticket from the [Customer Portal](https://customer.openlm.com) and reference this page. We will share the current procedure directly while the doc is finalized.
:::
"""


def migrate(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    if not is_stub(text):
        return False

    fm = parse_frontmatter(text)
    title = fm.get("title", path.stem.title())
    slug = fm.get("slug", path.stem)
    # Sensible default description if the original was a placeholder
    desc = (
        f"OpenLM is preparing the {title} integration guide. "
        f"This page lists the prerequisites and how to request configuration help today."
    )
    kw = title.lower().split(" ")[0]

    new_text = STUB_TEMPLATE.format(title=title, slug=slug, description=desc, kw=kw)
    path.write_text(new_text, encoding="utf-8")
    return True


def main() -> int:
    targets = sorted(ROOT.glob("*.mdx"))
    migrated = []
    for p in targets:
        if p.name == "index.mdx":
            continue
        if migrate(p):
            migrated.append(p.name)
    print(f"Migrated {len(migrated)} stub files:")
    for f in migrated:
        print(f"  - {f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
