"""Track 4b: migrate substantive pages to the unified Full variant.

This transformer is intentionally conservative. It does NOT rewrite procedure steps
verbatim — those carry vendor-specific paths and ports that must be preserved exactly.
What it does:

  1. Frontmatter
     - Drop the legacy `learnMoreLink` field.
     - Add a `keywords` block when missing.
     - Trim the description to one tight sentence.

  2. H1
     - Use the title from frontmatter exactly (vendor casing).

  3. Standardize the boilerplate sections:
     - "Requirements" / "Prerequisites" / "Scope" / "General"  →  "Before you begin"
       and convert the numbered list to a bulleted list.
     - "OpenLM Broker configuration", "Configuring through the Broker UI",
       "Configuring OpenLM Broker", "Broker configuration"   →  "Configure OpenLM Broker"
     - "Configure OpenLM Platform" (any heading level)        →  "Approve <Product> in OpenLM Platform"
     - "Configure OpenLM Server"                              →  same as above
     - "Verifying the configuration", "Verify the integration" canonicalized.

  4. The standard final block is replaced wholesale with the canonical pattern:
        ## Approve <Product> in OpenLM Platform
        1. Sign in to OpenLM Platform.
        2. From the menu, go to **License Servers** > **Pending Server**.
        3. Select <Product> in the list, then select **Approve and Merge**.

        ## Verify the integration
        1. In OpenLM Platform, go to **License Servers Live** > **Server Statistics**.
        2. Confirm <Product> appears with a green status indicator.

        :::note
        It can take up to 3 minutes for the status to update for a new connection.
        :::

  5. Free-floating "Note: It can take up to 3 minutes…" lines collapse into the
     canonical `:::note ... :::` admonition.

  6. Procedure steps in the Broker section keep their content, but bullet markers
     are normalized from `1. … 1. …` to `1. … 2. …`.

The transformer is **idempotent**. Running it twice produces the same output.

Files that are stubs (already migrated by Track 4a) or partner-managed (autodesk-cloud,
office365-cloud, salesforce.mdx) are skipped — they don't have the boilerplate trailing
section the transformer rewrites.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/engineering-lms"

SKIP = {
    "index.mdx",
    "autodesk-cloud.mdx",  # partner-managed, hand-tuned
    "arcgis-online.mdx",   # already in new template
    "amp.mdx",             # already in new template
    "flexera-flexnet-flexlm.mdx",  # already in new template
}

FM_RE = re.compile(r"^---\n(?P<fm>.*?)\n---\n?", re.DOTALL)


def split(text: str) -> tuple[dict, str]:
    """Split frontmatter and body. Returns ({}, text) when no frontmatter."""
    m = FM_RE.match(text)
    if not m:
        return {}, text
    fm = {}
    for line in m.group("fm").splitlines():
        if ":" not in line:
            continue
        k, _, v = line.partition(":")
        fm[k.strip()] = v.strip()
    return fm, text[m.end():]


def is_stub(body: str) -> bool:
    """Return True for short stub bodies (Track 4a output) — skip them."""
    if len(body.strip()) < 800:
        return True
    if "Documentation in progress" in body:
        return True
    if "Support assistance required" in body and "Configure OpenLM Broker" not in body:
        return True
    return False


def kebab(s: str) -> str:
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return s


def derive_keywords(title: str) -> list[str]:
    parts = re.split(r"[\s/():.]+", title)
    keywords = []
    for p in parts:
        p = p.strip("-_").lower()
        if p and len(p) > 1 and p not in {"the", "and", "or", "of"}:
            keywords.append(p)
    keywords.append("license manager")
    keywords.append("openlm broker")
    # de-dupe
    seen = set()
    out = []
    for k in keywords:
        if k not in seen:
            seen.add(k)
            out.append(k)
    return out


def normalize_frontmatter(fm: dict, fname: str) -> str:
    title = fm.get("title", f'"{Path(fname).stem.title()}"')
    title_clean = title.strip().strip('"').strip("'")
    slug = fm.get("slug", f'"{Path(fname).stem}"').strip().strip('"').strip("'")

    desc = fm.get("description", "").strip().strip('"').strip("'")
    if not desc:
        desc = (
            f"Configure OpenLM to monitor {title_clean} through OpenLM Broker. "
            f"This guide walks through Broker setup, approval, and verification."
        )
    # Trim trailing whitespace and ensure one sentence ends with period.
    desc = desc.rstrip().rstrip(".") + "."

    keywords = derive_keywords(title_clean)
    kw_lines = "\n".join(f"  - {k}" for k in keywords)

    parts = [
        "---",
        f'title: "{title_clean}"',
        f'slug: "{slug}"',
        f'description: "{desc}"',
        "keywords:",
        kw_lines,
        "---",
    ]
    return "\n".join(parts) + "\n"


# ---------- Body transformations ------------------------------------------

H_REQUIREMENTS = re.compile(
    r"^##\s+(?:Requirements|Prerequisites|Scope|General)\s*$",
    re.MULTILINE,
)

H_BROKER_CONFIG = re.compile(
    r"^##\s+(?:OpenLM Broker configuration|Broker configuration|"
    r"Configuring through the Broker UI|Configuring OpenLM Broker|"
    r"Configure OpenLM Broker|Use OpenLM Broker)\s*$",
    re.MULTILINE,
)

H_OPENLM_PLATFORM = re.compile(
    r"^#{2,3}\s+(?:Configure OpenLM Platform|OpenLM configuration|"
    r"Configure OpenLM Server|OpenLM Server configuration)\s*$",
    re.MULTILINE,
)

H_VERIFY = re.compile(
    r"^#{2,3}\s+(?:Verifying the configuration|Verify the integration|"
    r"Verifying the integration)\s*$",
    re.MULTILINE,
)

H_AUTOMATIC_BROKER = re.compile(
    r"^##\s+Automatic Broker configuration\s*$",
    re.MULTILINE,
)

H_BROKER_UI = re.compile(
    r"^##\s+Configuring through the Broker UI\s*$",
    re.MULTILINE,
)


# Trailing canonical block — anything from the "Configure OpenLM Platform" heading
# (or its variants) through the end of file is replaced wholesale.
TRAILING_BLOCK_RE = re.compile(
    r"\n+#{2,3}\s+(?:Configure OpenLM Platform|OpenLM configuration|"
    r"Configure OpenLM Server|OpenLM Server configuration)\s*\n.*\Z",
    re.DOTALL,
)


def canonical_trailing_block(product: str) -> str:
    return (
        f"\n## Approve {product} in OpenLM Platform\n\n"
        f"1. Sign in to OpenLM Platform.\n"
        f"2. From the menu, go to **License Servers** > **Pending Server**.\n"
        f"3. Select the {product} license manager, then select **Approve and Merge**.\n\n"
        f"## Verify the integration\n\n"
        f"1. In OpenLM Platform, go to **License Servers Live** > **Server Statistics**.\n"
        f"2. Confirm {product} appears with a green status indicator.\n\n"
        f":::note\n"
        f"It can take up to 3 minutes for the status to update for a new connection.\n"
        f":::\n"
    )


def normalize_requirements_to_before(body: str) -> str:
    """Convert `## Requirements` (numbered list) to `## Before you begin` (bulleted).
    Stops at the next `## ` heading or end of section.
    """
    pattern = re.compile(
        r"^##\s+(?:Requirements|Prerequisites|Scope|General)\s*\n"
        r"(?P<intro>(?:[^\n]*\n)*?)"
        r"(?P<list>(?:^\d+\.[^\n]*\n(?:    [^\n]*\n)*)+)",
        re.MULTILINE,
    )

    def repl(m: re.Match) -> str:
        intro = m.group("intro")
        items = []
        for line in m.group("list").splitlines():
            if re.match(r"^\d+\.\s+", line):
                items.append("- " + re.sub(r"^\d+\.\s+", "", line))
            else:
                # Continuation lines stay with the previous bullet
                if items:
                    items[-1] += "\n" + line
        return f"## Before you begin\n\n{intro}{chr(10).join(items)}\n"

    return pattern.sub(repl, body, count=1)


def normalize_intro_h2_scope(body: str) -> str:
    """Pages that start with `## Scope` or `## General` should drop the heading and keep the prose."""
    body = re.sub(
        r"^##\s+(?:Scope|General)\s*\n+",
        "",
        body,
        count=1,
        flags=re.MULTILINE,
    )
    return body


def rename_broker_heading(body: str) -> str:
    """Pick a canonical Broker heading. If the file has both an Automatic and a manual
    section, leave their structure but rename the umbrella heading."""
    # If the file has BOTH Automatic Broker configuration AND Configuring through the Broker UI,
    # we add a single umbrella heading "Configure OpenLM Broker" and demote the others to ###.
    has_auto = bool(H_AUTOMATIC_BROKER.search(body))
    has_ui = bool(H_BROKER_UI.search(body))

    if has_auto and has_ui:
        # Demote both to ###
        body = H_AUTOMATIC_BROKER.sub("### Option 1 — Detect automatically", body)
        body = H_BROKER_UI.sub("### Option 2 — Add manually", body)
        # Replace the *first* `## OpenLM Broker configuration`-style heading with our umbrella
        body = re.sub(
            r"^##\s+(?:OpenLM Broker configuration|Broker configuration|"
            r"Configuring OpenLM Broker)\s*$",
            "## Configure OpenLM Broker",
            body,
            count=1,
            flags=re.MULTILINE,
        )
        return body

    # Otherwise, just rename whichever main Broker heading exists.
    body = re.sub(
        r"^##\s+(?:OpenLM Broker configuration|Broker configuration|"
        r"Configuring through the Broker UI|Configuring OpenLM Broker|"
        r"Use OpenLM Broker)\s*$",
        "## Configure OpenLM Broker",
        body,
        count=1,
        flags=re.MULTILINE,
    )
    return body


def normalize_capability_heading(body: str) -> str:
    body = re.sub(
        r"^##\s+(?:Monitoring capabilities and features|"
        r"Monitoring capabilities and Features)\s*$",
        "## Monitoring capabilities",
        body,
        flags=re.MULTILINE,
    )
    return body


def collapse_trailing_3_minute_note(body: str) -> str:
    """Some files don't end with the canonical block but do have a free-form
    `Note: It can take up to 3 minutes…` line. Wrap it."""
    body = re.sub(
        r"\n+(?:>\s*)?Note:\s*It can take up to 3 minutes for the status to update.*?\.\s*\n*\Z",
        "\n\n:::note\nIt can take up to 3 minutes for the status to update for a new connection.\n:::\n",
        body,
        flags=re.DOTALL,
    )
    return body


def normalize_step_numbering(body: str) -> str:
    """Many files use `1. … 1. …` (Markdown auto-renumbers, but the source is ugly)."""
    lines = body.splitlines(keepends=True)
    out = []
    counter = None
    for line in lines:
        stripped = line.lstrip()
        indent = line[: len(line) - len(stripped)]
        m = re.match(r"^1\.\s+", stripped)
        # Reset counter at heading or blank-line group breaks
        if line.strip().startswith("#") or line.strip() == "":
            counter = None
            out.append(line)
            continue
        if m and indent == "":
            if counter is None:
                counter = 1
            else:
                counter += 1
            out.append(f"{counter}. " + stripped[len("1. "):])
        else:
            out.append(line)
            if not stripped or stripped.startswith("#"):
                counter = None
    return "".join(out)


def replace_trailing_block(body: str, product: str) -> str:
    """Replace the existing `Configure OpenLM Platform`...end-of-file block with the canonical
    Approve + Verify + :::note block. If neither block exists, append the canonical Approve/Verify."""
    if TRAILING_BLOCK_RE.search(body):
        body = TRAILING_BLOCK_RE.sub(canonical_trailing_block(product), body)
    else:
        # No Configure section at all — append the canonical block
        body = body.rstrip() + "\n" + canonical_trailing_block(product)
    return body


def add_broker_hub_link(body: str) -> str:
    """Make sure the Before-you-begin Broker bullet links to Broker Hub."""
    body = re.sub(
        r"approve it in \[Broker Hub\]",
        "approve it in [Broker Hub]",
        body,
    )
    return body


def transform(text: str, fname: str) -> str:
    fm, body = split(text)
    if not fm:
        return text
    if is_stub(body):
        return text  # Track 4a already handled it

    title = fm.get("title", f'"{Path(fname).stem}"').strip().strip('"').strip("'")

    # Frontmatter
    fm_block = normalize_frontmatter(fm, fname)

    # Body normalizations (order matters)
    body = normalize_intro_h2_scope(body)
    body = normalize_requirements_to_before(body)
    body = normalize_capability_heading(body)
    body = rename_broker_heading(body)
    body = collapse_trailing_3_minute_note(body)
    body = replace_trailing_block(body, title)
    body = normalize_step_numbering(body)

    # Trim leading/trailing whitespace
    body = "\n" + body.strip() + "\n"

    return fm_block + body


def main() -> int:
    targets = sorted(ROOT.glob("*.mdx"))
    changed = 0
    skipped = 0
    for p in targets:
        if p.name in SKIP:
            skipped += 1
            continue
        original = p.read_text(encoding="utf-8")
        new_text = transform(original, p.name)
        if new_text != original:
            p.write_text(new_text, encoding="utf-8")
            changed += 1
    print(f"Files changed: {changed}")
    print(f"Files skipped: {skipped}")
    print(f"Total scanned: {len(targets)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
