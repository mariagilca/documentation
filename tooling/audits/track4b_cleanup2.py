"""Track 4b cleanup pass 2.

Fixes the leftovers from the previous pass:
  1. Keyword block emitted with double dashes (`  - - creo` → `  - creo`).
  2. Legacy trailing block where the original "Configure OpenLM Platform" was hidden in an
     image's alt text, not in a heading. We detect by content signature instead.
  3. Free-floating "Step 1:", bullet glyphs `•`, and "•Click" missing-space defects.
  4. Two adjacent canonical blocks (only one should remain).

Idempotent.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/engineering-lms"
SKIP = {"index.mdx", "amp.mdx", "arcgis-online.mdx", "flexera-flexnet-flexlm.mdx", "autodesk-cloud.mdx"}

# Canonical Approve heading marker — exists once per migrated file.
CANON_APPROVE = re.compile(r"^##\s+Approve\s+.+\s+in OpenLM Platform\s*$", re.MULTILINE)

# Boilerplate signature for the legacy block.  We look for this sequence in the body
# and snip the contiguous block surrounding it.
LEGACY_SIGNATURES = [
    re.compile(r"On left menu, select Pending Server", re.IGNORECASE),
    re.compile(r"and select \*\*Approve and Merge\*\*", re.IGNORECASE),
    re.compile(r"License Servers Live -> Server Statistics", re.IGNORECASE),
    re.compile(r"appears in the list with a green status indicator", re.IGNORECASE),
]


def fix_keywords_double_dash(text: str) -> tuple[str, bool]:
    """`  - - foo` → `  - foo`."""
    new_text = re.sub(r"^(  )- - ", r"\1- ", text, flags=re.MULTILINE)
    return new_text, new_text != text


def remove_legacy_trailing_by_content(body: str) -> tuple[str, bool]:
    """When the canonical Approve block exists, find the preceding stretch of body that
    contains the legacy boilerplate by content signature and snip it out."""
    canonical = CANON_APPROVE.search(body)
    if not canonical:
        return body, False

    # Look for any of the legacy signatures *before* the canonical heading.
    head = body[: canonical.start()]
    last_sig_pos = -1
    first_sig_pos = -1
    for sig in LEGACY_SIGNATURES:
        m = sig.search(head)
        if m:
            if first_sig_pos == -1 or m.start() < first_sig_pos:
                first_sig_pos = m.start()
            if m.end() > last_sig_pos:
                last_sig_pos = m.end()

    if first_sig_pos == -1:
        return body, False

    # Walk backwards from first_sig_pos to find the start of the legacy block.
    # We treat the start as the most recent blank-line-separated boundary that contains
    # one of: "1. Log in to OpenLM Platform", "1. Sign in to OpenLM Platform",
    # "From Menu, go to License Servers", or the "Pending Server" image.
    start_markers = [
        "Log in to OpenLM Platform",
        "Sign in to OpenLM Platform",
        "From Menu, go to License Servers",
        "From the menu, go to License Servers",
        "Pending Server](",  # image alt
    ]
    block_start = -1
    for marker in start_markers:
        m = re.search(re.escape(marker), head)
        if m:
            # Walk back to the previous blank line
            text_before = head[: m.start()]
            blank = text_before.rfind("\n\n")
            if blank == -1:
                blank = 0
            if block_start == -1 or blank < block_start:
                block_start = blank

    if block_start == -1:
        return body, False

    # Drop everything between block_start and the canonical heading
    new_body = body[: block_start].rstrip() + "\n\n" + body[canonical.start():]
    return new_body, True


def fix_step_n_glyphs(body: str) -> tuple[str, bool]:
    """`Step 1:` headings → embed in surrounding numbered list. `• ` → `- `. `•Click` → `Click`.
    Also remove the duplicate Step heading appearing right after its image."""
    n_changes = 0

    # Replace `•Click` with proper space + word
    new_body, k = re.subn(r"^(\s*)•(?=\S)", r"\1- ", body, flags=re.MULTILINE)
    n_changes += k
    body = new_body

    # Replace `• ` bullets at any indentation with `- `
    new_body, k = re.subn(r"^(\s*)•\s+", r"\1- ", body, flags=re.MULTILINE)
    n_changes += k
    body = new_body

    # Drop free-floating "Step N:" labels (the next paragraph already explains)
    new_body, k = re.subn(
        r"^Step \d+:[^\n]*\n+",
        "",
        body,
        flags=re.MULTILINE,
    )
    n_changes += k
    body = new_body

    return body, n_changes > 0


def collapse_double_canonical(body: str) -> tuple[str, bool]:
    """If, after all cleanups, two `## Approve … in OpenLM Platform` blocks exist, keep the second."""
    matches = list(CANON_APPROVE.finditer(body))
    if len(matches) < 2:
        return body, False
    # Drop everything from the start of the first canonical to the start of the last canonical
    new_body = body[: matches[0].start()].rstrip() + "\n\n" + body[matches[-1].start():]
    return new_body, True


def main() -> int:
    targets = sorted(ROOT.glob("*.mdx"))
    changed = 0
    for p in targets:
        if p.name in SKIP:
            continue
        text = p.read_text(encoding="utf-8")
        original = text

        # Frontmatter-level fix
        text, _ = fix_keywords_double_dash(text)

        # Body-level fixes
        fm_match = re.match(r"^---\n.*?\n---\n", text, re.DOTALL)
        if fm_match:
            fm = text[: fm_match.end()]
            body = text[fm_match.end():]
            body, _ = remove_legacy_trailing_by_content(body)
            body, _ = fix_step_n_glyphs(body)
            body, _ = collapse_double_canonical(body)
            text = fm + body

        if text != original:
            p.write_text(text, encoding="utf-8")
            changed += 1

    print(f"Cleanup pass 2: changed {changed} files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
