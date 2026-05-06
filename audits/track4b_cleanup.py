"""Track 4b cleanup pass.

After track4b_migrate_substantive.py, a small number of files have:
  - duplicate trailing blocks (old "Configure OpenLM Platform" + new "Approve … in OpenLM Platform"),
  - duplicate broker headings (old "Configuring through the Broker UI" + new "Configure OpenLM Broker"),
  - keyword duplication after splitting titles like "Nvidia License Manager",
  - blank lines missing between a step and the next H2.

This pass identifies and removes the legacy trailing block when a canonical Approve/Verify
block also exists, removes duplicate broker headings, and dedupes keywords.

Idempotent.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/engineering-lms"
SKIP = {"index.mdx", "amp.mdx", "arcgis-online.mdx", "flexera-flexnet-flexlm.mdx", "autodesk-cloud.mdx"}


def remove_legacy_trailing(body: str) -> tuple[str, bool]:
    """If a canonical 'Approve … in OpenLM Platform' heading exists, remove any earlier
    legacy "Configure OpenLM Platform" / "OpenLM configuration" / "OpenLM Server configuration"
    section that sits above it."""
    m_canonical = re.search(r"^##\s+Approve\s+.+\s+in OpenLM Platform\s*$", body, re.MULTILINE)
    if not m_canonical:
        return body, False

    # Look backwards from the canonical heading for the legacy block.
    legacy_re = re.compile(
        r"\n+#{2,3}\s+(?:Configure OpenLM Platform|OpenLM configuration|"
        r"Configure OpenLM Server|OpenLM Server configuration|Verifying the configuration)\s*\n",
        re.IGNORECASE,
    )
    legacy_match = legacy_re.search(body, 0, m_canonical.start())
    if not legacy_match:
        return body, False

    # Drop everything from the legacy heading up to (but not including) the canonical heading.
    new_body = body[: legacy_match.start()] + "\n\n" + body[m_canonical.start():]
    return new_body, True


def remove_duplicate_broker_heading(body: str) -> tuple[str, bool]:
    """If the file has both `## Configure OpenLM Broker` and a later
    `## Configuring through the Broker UI`, drop the duplicate UI heading
    (its content becomes part of the canonical Broker section)."""
    canonical = re.search(r"^##\s+Configure OpenLM Broker\s*$", body, re.MULTILINE)
    if not canonical:
        return body, False
    duplicate = re.search(r"^##\s+Configuring through the Broker UI\s*$", body, re.MULTILINE)
    if not duplicate or duplicate.start() <= canonical.start():
        return body, False
    # Demote the duplicate heading to a sub-section
    new_body = (
        body[: duplicate.start()]
        + "### Add manually\n"
        + body[duplicate.end() + 1:]
    )
    return new_body, True


def dedupe_keywords(text: str) -> tuple[str, bool]:
    """Frontmatter keyword block: drop duplicates and merge `license` + `manager` → `license manager`."""
    fm_re = re.compile(r"^---\nkeywords:\n((?:  - [^\n]+\n)+)", re.MULTILINE)
    # Actually more robust: match the keywords block inside any frontmatter
    fm_block_re = re.compile(r"(keywords:\n)((?:  - [^\n]+\n)+)")
    m = fm_block_re.search(text)
    if not m:
        return text, False
    raw = m.group(2)
    items = [line.strip("-").strip() for line in raw.splitlines() if line.strip()]
    # Merge pieces: if both "license" and "manager" appear as separate single-word entries,
    # drop the singletons (we already keep "license manager" as a phrase).
    if "license" in items and "manager" in items and "license manager" in items:
        items = [i for i in items if i not in {"license", "manager"}]
    seen, out = set(), []
    for it in items:
        key = it.lower()
        if key not in seen:
            seen.add(key)
            out.append(it)
    new_block = "keywords:\n" + "".join(f"  - {x}\n" for x in out)
    if new_block == m.group(0):
        return text, False
    return text[: m.start()] + new_block + text[m.end():], True


def normalize_blank_lines(body: str) -> tuple[str, bool]:
    """Ensure a blank line before every H2."""
    new_body = re.sub(r"([^\n])\n(##\s)", r"\1\n\n\2", body)
    return new_body, new_body != body


def fix_doubled_product_in_canonical(body: str) -> tuple[str, bool]:
    """For pages whose product name contains "License Manager", the canonical block
    becomes "Select the X License Manager license manager, then select…". Collapse."""
    new_body = re.sub(
        r"Select the (.+?) license manager license manager",
        r"Select the \1 license manager",
        body,
    )
    return new_body, new_body != body


def main() -> int:
    targets = sorted(ROOT.glob("*.mdx"))
    changed = 0
    for p in targets:
        if p.name in SKIP:
            continue
        text = p.read_text(encoding="utf-8")
        original = text

        # Split frontmatter
        fm_match = re.match(r"^---\n.*?\n---\n", text, re.DOTALL)
        if not fm_match:
            continue
        fm = text[: fm_match.end()]
        body = text[fm_match.end():]

        body, _ = remove_legacy_trailing(body)
        body, _ = remove_duplicate_broker_heading(body)
        body, _ = normalize_blank_lines(body)
        body, _ = fix_doubled_product_in_canonical(body)
        text = fm + body
        text, _ = dedupe_keywords(text)

        if text != original:
            p.write_text(text, encoding="utf-8")
            changed += 1

    print(f"Cleanup: changed {changed} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
