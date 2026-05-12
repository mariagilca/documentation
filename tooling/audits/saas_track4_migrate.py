"""SaaS Track 4: migrate pages to the unified template.

Three variants:
  - Stub          : "Guide Under Development" admonition pages and pure under-development.
  - Partner-managed: "Contact our support team" partial stubs with no real procedure.
  - Full          : substantive integration pages.

The transformer is conservative on the Full variant — it standardizes structure but does
NOT rewrite vendor-specific procedure steps.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/saas-platforms"

STUB_FILES = {
    "zoho-one.mdx",
    "apollo-io.mdx",
    "canva.mdx",
    "tabnine.mdx",
    "zoom.mdx",
}
PARTNER_FILES = {
    "adobe-cloud.mdx",
    "altair.mdx",
    "autodesk-cloud.mdx",
    "figma.mdx",
    "linkedin-sales-navigator.mdx",
    "syncfusion.mdx",
    "zoominfo.mdx",
}
SKIP = {"intro.mdx"}

FM_RE = re.compile(r"^---\n(?P<fm>.*?)\n---\n?", re.DOTALL)


def parse_fm(text: str) -> tuple[dict, str]:
    m = FM_RE.match(text)
    if not m:
        return {}, text
    fm: dict = {}
    for line in m.group("fm").splitlines():
        if ":" not in line:
            continue
        k, _, v = line.partition(":")
        fm[k.strip()] = v.strip()
    return fm, text[m.end():]


def derive_keywords(title: str, *, kind: str) -> list[str]:
    parts = [p.strip("-_:.()/").lower() for p in re.split(r"[\s/():.]+", title) if p]
    keywords = [p for p in parts if p and p not in {"the", "and", "or", "of"}]
    keywords.append("openlm cloud broker")
    keywords.append("saas")
    seen, out = set(), []
    for k in keywords:
        if k not in seen:
            seen.add(k)
            out.append(k)
    return out


def render_frontmatter(fm: dict, title: str, slug: str, *, description: str, keywords: list[str]) -> str:
    lines = [
        "---",
        f"title: {title}" if " " not in title else f'title: "{title}"',
        f"slug: {slug}",
        f'description: "{description}"',
        "keywords:",
    ]
    for k in keywords:
        if any(c in k for c in (":", "#", "&", "%")):
            lines.append(f'  - "{k}"')
        else:
            lines.append(f"  - {k}")
    lines.append("---")
    return "\n".join(lines) + "\n"


# ---------------- Migration variants -------------------------------------

def migrate_stub(path: Path, fm: dict, body: str) -> str:
    title = fm.get("title", path.stem.title()).strip().strip('"').strip("'")
    slug = fm.get("slug", path.stem).strip().strip('"').strip("'")
    desc = (
        f"OpenLM is preparing the {title} integration guide. This page lists the "
        f"prerequisites and how to request configuration help today."
    )
    kws = derive_keywords(title, kind="stub")
    fm_block = render_frontmatter(fm, title, slug, description=desc, keywords=kws)
    body = (
        f"# {title}\n\n"
        f"OpenLM monitors {title} through OpenLM Cloud Broker. Detailed configuration steps are being prepared and will be published in the next documentation release.\n\n"
        f"## Before you begin\n\n"
        f"- An active OpenLM Platform tenant.\n"
        f"- OpenLM Cloud Broker, approved in [Broker Hub](/cloud/data-collection/broker-hub).\n\n"
        f":::note Documentation in progress\n"
        f"If you need to configure {title} today, open a ticket from the [Customer Portal](https://customer.openlm.com) and reference this page. We will share the current procedure directly while the doc is finalized.\n"
        f":::\n"
    )
    return fm_block + body


def migrate_partner(path: Path, fm: dict, body: str) -> str:
    title = fm.get("title", path.stem.title()).strip().strip('"').strip("'")
    slug = fm.get("slug", path.stem).strip().strip('"').strip("'")

    # Try to extract the original About / value statement to preserve.
    about_m = re.search(r"^## About [^\n]+\n+(?P<para>(?:[^\n]+\n)+)", body, re.MULTILINE)
    value_para = ""
    if about_m:
        para = about_m.group("para").strip()
        # Take the first sentence — it's typically the value statement.
        # Drop "Monitoring X usage is..." and the marketing comparison.
        sentences = re.split(r"(?<=[.!?])\s+", para)
        keep = []
        for s in sentences:
            if s.startswith("Monitoring "):
                continue
            if s.lower().startswith(("this is similar", "similar to monitoring")):
                continue
            keep.append(s)
        value_para = " ".join(keep).strip()

    if not value_para:
        value_para = f"OpenLM monitors {title} usage so you can track active users, optimize costs, and reclaim unused seats."

    desc = (
        f"OpenLM Support configures the {title} integration for your tenant. "
        f"This page covers the prerequisites and how to open the ticket."
    )[:160]
    kws = derive_keywords(title, kind="partner")
    fm_block = render_frontmatter(fm, title, slug, description=desc, keywords=kws)
    body = (
        f"# {title}\n\n"
        f"{value_para}\n\n"
        f"## Before you begin\n\n"
        f"- An active OpenLM Platform tenant.\n"
        f"- {title}-side administrator access who can authorize the connection.\n\n"
        f"## How OpenLM monitors {title}\n\n"
        f"OpenLM Support configures the connection between your {title} account and your OpenLM tenant. "
        f"Once activated, {title} usage data appears in OpenLM Platform alongside your other data sources, "
        f"refreshed on the same cadence as the rest of your integrations.\n\n"
        f":::info Support assistance required\n"
        f"OpenLM Support configures this integration for your tenant. Open a ticket from the "
        f"[Customer Portal](https://customer.openlm.com) with:\n\n"
        f"- Your OpenLM tenant name\n"
        f"- Your {title} account ID\n"
        f"- Confirmation that a {title} administrator is available to authorize the connection\n"
        f":::\n\n"
        f"## What you receive after activation\n\n"
        f"- {title} usage data in OpenLM Platform reports.\n"
        f"- Allocation data alongside your other data sources.\n"
    )
    return fm_block + body


def migrate_full(path: Path, fm: dict, body: str) -> str:
    """Conservative Full migration: standardize headings and the trailing block, preserve the
    vendor-specific Configure steps as-is."""
    title = fm.get("title", path.stem.title()).strip().strip('"').strip("'")
    slug = fm.get("slug", path.stem).strip().strip('"').strip("'")

    # Pull out the original description if present.
    orig_desc = fm.get("description", "").strip().strip('"').strip("'")
    # Strip marketing tail from the description if present.
    desc = orig_desc.strip().rstrip(".")
    if not desc or "is a" in desc.lower():
        desc = f"Monitor {title} usage through OpenLM Cloud Broker"
    desc = desc + "."
    # Cap length.
    if len(desc) > 200:
        desc = desc[:197].rstrip() + "..."

    kws = derive_keywords(title, kind="full")
    fm_block = render_frontmatter(fm, title, slug, description=desc, keywords=kws)

    # --- Body restructure ---
    # 1. Drop legacy `## About` heading; keep the paragraph as the lead.
    body = re.sub(r"^## About [^\n]+\n+", "", body, count=1, flags=re.MULTILINE)
    # 2. Drop the H1 line if present (we'll add a clean one back).
    body = re.sub(r"^#\s+[^\n]+\n+", "", body, count=1, flags=re.MULTILINE)
    # 3. Strip "Monitoring X usage is..." and "similar to monitoring" filler from the lead paragraph.
    body = re.sub(r"\s*Monitoring [^.]+\.", "", body, count=1)
    body = re.sub(r"\s*This is similar to[^.]+\.", "", body)
    # 4. Rename "Prerequisites" → "Before you begin"
    body = re.sub(r"^##\s+Prerequisites\s*$", "## Before you begin", body, flags=re.MULTILINE)
    # 5. Rename "Configuring data collection" → "Configure data collection"
    body = re.sub(
        r"^##\s+Configuring data collection\s*$",
        "## Configure data collection",
        body,
        flags=re.MULTILINE,
    )
    # 6. Drop the lead-in line "Follow these step-by-step instructions to set up data collection for X in OpenLM Cloud Broker:" — it's just preamble.
    body = re.sub(
        r"\nFollow these step-by-step instructions to set up data collection for [^\n]+\n+",
        "\n",
        body,
    )
    # 7. Replace `## Viewing reports` ... end-of-file with a canonical Verify + reports block.
    body = re.sub(
        r"\n+##\s+Viewing reports\s*\n.*\Z",
        "",
        body,
        flags=re.DOTALL,
    )
    # 8. Append the canonical Verify + Reports + :::note + Reference block.
    canonical_tail = (
        f"\n## Approve {title} in OpenLM Platform\n\n"
        f"1. Sign in to OpenLM Platform.\n"
        f"2. From the menu, go to **License Servers** > **Pending Server**.\n"
        f"3. Select the {title} data source, then select **Approve and Merge**.\n\n"
        f"## Verify the integration\n\n"
        f"1. In OpenLM Platform, go to **Allocation**.\n"
        f"2. Confirm {title} usage data appears.\n\n"
        f":::note\n"
        f"It can take up to 3 minutes for data to appear after approval.\n"
        f":::\n\n"
        f"## Viewing reports\n\n"
        f"- **User activity trends** — see which users are most active in the platform; reallocate seats accordingly.\n"
        f"- **Expired or unused licenses** — identify inactive users and reclaim their seats.\n\n"
        f"## Reference\n\n"
        f"- [Broker Hub](/cloud/data-collection/broker-hub)\n"
    )
    body = body.rstrip() + "\n" + canonical_tail

    # 9. Drop trailing "5. See Data: ..." style steps (replaced by canonical Verify above).
    body = re.sub(
        r"\n\d+\.\s+See Data:[^\n]+\n",
        "\n",
        body,
    )
    body = re.sub(
        r"\n\d+\.\s+Approve in OpenLM:[^\n]+\n",
        "\n",
        body,
    )
    body = re.sub(
        r"\n\d+\.\s+Verify Connection:[^\n]+\n",
        "\n",
        body,
    )

    # 10. Renumber the Configure section steps (we removed Verify/Approve/See).
    # Conservative: keep the existing numbering. Markdown auto-renders `1. … 1.` anyway.

    # Compose final
    body_clean = re.sub(r"\n{3,}", "\n\n", body).rstrip() + "\n"
    return fm_block + f"# {title}\n" + body_clean


def main() -> int:
    n_stub = n_partner = n_full = 0
    for p in sorted(ROOT.glob("*.mdx")):
        if p.name in SKIP:
            continue
        text = p.read_text(encoding="utf-8")
        fm, body = parse_fm(text)
        if not fm:
            continue
        if p.name in STUB_FILES:
            new_text = migrate_stub(p, fm, body)
            n_stub += 1
        elif p.name in PARTNER_FILES:
            new_text = migrate_partner(p, fm, body)
            n_partner += 1
        else:
            new_text = migrate_full(p, fm, body)
            n_full += 1
        p.write_text(new_text, encoding="utf-8")
    print(f"Stubs migrated:    {n_stub}")
    print(f"Partner migrated:  {n_partner}")
    print(f"Full migrated:     {n_full}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
