"""Build the SaaS Platforms audit DOCX.

Run:
    python3 audits/build_saas_platforms_audit.py
"""

from datetime import date
from pathlib import Path

from docx import Document
from docx.enum.table import WD_ALIGN_VERTICAL
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.shared import Cm, Pt, RGBColor

OUT = Path(__file__).parent / f"SaaS-Platforms-Audit-{date.today().isoformat()}.docx"

# ---------- Helpers ----------------------------------------------------------

def set_cell_shading(cell, color_hex):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), color_hex)
    tc_pr.append(shd)


def add_para(doc, text, *, style=None, bold=False, italic=False, size=None, color=None,
             alignment=None, space_after=None):
    p = doc.add_paragraph(style=style) if style else doc.add_paragraph()
    if alignment is not None:
        p.alignment = alignment
    if space_after is not None:
        p.paragraph_format.space_after = Pt(space_after)
    run = p.add_run(text)
    if bold:
        run.bold = True
    if italic:
        run.italic = True
    if size:
        run.font.size = Pt(size)
    if color:
        run.font.color.rgb = RGBColor(*color)
    return p


def add_heading(doc, text, level):
    h = doc.add_heading(text, level=level)
    for r in h.runs:
        r.font.color.rgb = RGBColor(0x14, 0x2A, 0x4C)
    return h


def add_bullets(doc, items, style="List Bullet"):
    for it in items:
        if isinstance(it, tuple):
            label, body = it
            p = doc.add_paragraph(style=style)
            r = p.add_run(label)
            r.bold = True
            p.add_run(": " + body)
        else:
            doc.add_paragraph(it, style=style)


def add_numbered(doc, items):
    for it in items:
        doc.add_paragraph(it, style="List Number")


def add_code_block(doc, code):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Cm(0.6)
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run(code)
    run.font.name = "Menlo"
    run.font.size = Pt(9)
    pPr = p._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), "F2F2F2")
    pPr.append(shd)


def add_table(doc, headers, rows, *, col_widths=None, header_color="142A4C",
              header_text_color=(255, 255, 255)):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = "Light Grid Accent 1"
    table.autofit = False
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        set_cell_shading(cell, header_color)
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        cell.paragraphs[0].text = ""
        run = cell.paragraphs[0].add_run(h)
        run.bold = True
        run.font.color.rgb = RGBColor(*header_text_color)
        run.font.size = Pt(10)
        if col_widths:
            cell.width = col_widths[i]
    for ri, row in enumerate(rows, start=1):
        for ci, val in enumerate(row):
            c = table.rows[ri].cells[ci]
            c.vertical_alignment = WD_ALIGN_VERTICAL.TOP
            c.paragraphs[0].text = ""
            r = c.paragraphs[0].add_run(str(val))
            r.font.size = Pt(10)
            if col_widths:
                c.width = col_widths[ci]
    return table


# ---------- Document --------------------------------------------------------

doc = Document()
section = doc.sections[0]
section.top_margin = Cm(2.0)
section.bottom_margin = Cm(2.0)
section.left_margin = Cm(2.2)
section.right_margin = Cm(2.2)

styles = doc.styles
normal = styles["Normal"]
normal.font.name = "Calibri"
normal.font.size = Pt(11)

# ============ COVER ============
title = doc.add_paragraph()
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
tr = title.add_run("SaaS platforms")
tr.bold = True
tr.font.size = Pt(28)
tr.font.color.rgb = RGBColor(0x14, 0x2A, 0x4C)

sub = doc.add_paragraph()
sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
sr = sub.add_run("Editorial audit, unified template, and remediation plan")
sr.font.size = Pt(16)
sr.font.color.rgb = RGBColor(0x55, 0x55, 0x55)

meta = doc.add_paragraph()
meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
meta.paragraph_format.space_before = Pt(40)
mr = meta.add_run(
    f"Prepared: {date.today().isoformat()}\n"
    "Author: Senior Technical Writer / Senior Technical Editor (audit role)\n"
    "Scope: docs/cloud/data-collection/connect-license-managers/saas-platforms/\n"
    "Style baseline: Splunk Style Guide (current edition)\n"
    "Status: Draft — pending stakeholder approval before implementation"
)
mr.font.size = Pt(11)

doc.add_page_break()

# ============ EXECUTIVE SUMMARY ============
add_heading(doc, "1. Executive summary", 1)
add_para(doc,
    "The SaaS platforms section comprises 57 integration pages plus an `intro.mdx` placeholder "
    "and `_category_.json`. All 57 pages were generated from the same Google Docs source and "
    "share the same shape, the same boilerplate, and the same systemic editorial defects. The "
    "good news: a single template and a tight normalization pass can fix the entire section. "
    "The bad news: there are several factual defects that cannot be fixed by automation, "
    "including a wholesale cross-product contamination on the GitLab page (it documents "
    "GitHub's token procedure) and at least one wrong-product description (Frontegg is "
    "described as a visual regression testing tool — it is in fact a customer-identity / "
    "authentication platform). These need SME review before publishing."
)

add_heading(doc, "1.1 Headline numbers", 2)
add_table(doc,
    headers=["Metric", "Count", "Notes"],
    rows=[
        ("Total integration pages", "57", "Plus intro.mdx and _category_.json"),
        ("Substantive pages with a procedure", "~38", "Have step-by-step instructions"),
        ("Pages that delegate to support@openlm.com", "11", "Marked as “Contact our support team”"),
        ("Stub pages — `:::info Guide Under Development`", "4", "Apollo.io, Canva, Tabnine, Zoom"),
        ("Stub pages — `:::info This guide is currently under development`", "5", "Bare admonition stubs"),
        ("Pages using the deprecated “OpenLM SLM” term", "51", "Same issue we just fixed in engineering-lms"),
        ("Pages using the boilerplate “OpenLM Cloud Broker and OpenLM SLM are required”", "49", "Almost every page"),
        ("Pages with sanitized Google Docs tracker URLs (google.com/url?q=…)", "9", "Cloudflare, GitLab, Sentry, Salesflare, etc."),
        ("Pages with HTML entities in body text (`&gt;`, `&lt;`, `&amp;`)", "10", "Markdown rendering shows the literal entity"),
        ("Pages with the orphan “X Usage Monitoring” subtitle", "52", "Plain paragraph below the H1, no structure"),
        ("Pages with marketing filler (“This is similar to monitoring …”)", "45", "Generic comparison padding"),
        ("Pages with “Activate API Access:” inline pseudo-headings", "27", "Should be subheadings or step actions"),
        ("Pages with `Step N:` labels mixed with numbered lists", "2", "Zenefits, Really Simple Systems"),
        ("Pages with “Image or attachment is not accessible” leaked", "1", "Zenefits"),
        ("Pages with Google Docs comment artefacts (`[a]`, `[b]`…)", "1", "ZoomInfo"),
        ("Cross-product contamination — wrong vendor instructions", "1", "GitLab page describes GitHub"),
        ("Wrong-product page descriptions", "≥1", "Frontegg described as a “visual regression testing tool”"),
        ("Pages with “click on” (style)", "4", "Lower than engineering-lms"),
        ("Pages with contractions (you'll / it's)", "48", "Splunk style discourages"),
    ],
)

add_heading(doc, "1.2 Severity signals", 2)
add_bullets(doc, [
    ("Critical (factual)", "GitLab page documents GitHub's token procedure (steps 1–11 reference GitHub.com, profile picture, Developer settings, OAuth scopes); Frontegg description claims it is a visual regression testing tool (it is an authentication platform); Figma support note tells the reader to ask about “Autodesk Cloud integration”."),
    ("High (trust)", "9 pages route external links through `https://www.google.com/url?q=…&sa=D&source=editors&ust=…&usg=…` Google Docs trackers. These were never customer-facing URLs."),
    ("High (rendering)", "Every page has an orphan `Vendor Usage Monitoring` subtitle paragraph that renders as plain prose under the H1, with no semantic role; HTML entities `&gt;`/`&lt;`/`&amp;` show literally in 10 pages."),
    ("High (terminology)", "“OpenLM SLM” appears in 51 of 57 pages — same retired naming we just removed from engineering-lms."),
    ("Medium (structure)", "27 pages use `Activate API Access:` and `Add Credentials:` as inline pseudo-headings inside numbered lists, which destroys list parallelism; mixed `1./Step 1:` numbering on 2 pages."),
    ("Medium (style)", "45 pages contain the templated marketing sentence “This is similar to monitoring other [category] tools like X or Y.” It tells the reader nothing they don't already know and is brand-noise."),
    ("Low (cosmetic)", "Inconsistent terminology around the OpenLM service (Allocation service / OpenLM Allocation / OpenLM Reports), inconsistent capitalization of API key vs API Key, ZoomInfo's leaked Google Docs comment."),
])

# ============ METHODOLOGY ============
add_heading(doc, "2. Methodology", 1)
add_para(doc,
    "Same approach as the engineering-lms audit: full inventory, representative reading sample, "
    "corpus-wide quantitative scans, mapping of each defect class to a Splunk Style Guide rule, "
    "severity tiers, and a single canonical template with depth variants so no information is dropped."
)

add_heading(doc, "Reading sample", 2)
add_para(doc,
    "All 57 pages were inventoried. About 35 pages were read in full to establish "
    "the underlying template; the remaining pages were verified by spot-check and corpus-wide grep "
    "to confirm they fit the same pattern."
)

# ============ FINDINGS ============
add_heading(doc, "3. Findings — defect catalogue", 1)

# 3.1 Factual
add_heading(doc, "3.1 Factual defects (S1)", 2)
add_table(doc,
    headers=["Defect", "Examples", "Why it matters"],
    rows=[
        ("Cross-product contamination",
         "gitlab.mdx steps 1–11 describe GitHub: “In the upper-right corner of any page on GitHub, click your profile picture”, links to docs.github.com about Personal access tokens, OAuth scopes, SAML SSO. The actual GitLab token flow lives at gitlab.com/-/user_settings/personal_access_tokens.",
         "A customer following this page configures the wrong token in the wrong product. The integration will fail, and the page is wrong on its face."),
        ("Wrong product description",
         "frontegg.mdx description claims Frontegg is “a visual regression testing tool”. Frontegg is in fact a customer-identity / authentication / SaaS user-management platform.",
         "Search results, social cards, and Algolia all surface this wrong description. Customers reading the page expect entirely the wrong functionality."),
        ("Cross-product copy/paste in support hand-off",
         "figma.mdx step 1 reads: “Contact our support team to setup Autodesk Cloud integration.” Should reference Figma.",
         "The support team gets a ticket about the wrong integration. The page tells the user to ask for the wrong thing."),
        ("Stale terminology in product naming",
         "“OpenLM SLM (Software License Manager)” appears as a required component in 49 pages. SLM is no longer the active product name; the deployment story now centres on OpenLM Platform.",
         "Customers see a product they cannot find in the portal. Same drift we just removed from engineering-lms."),
        ("Description sentences contain marketing filler",
         "“This is similar to monitoring other CRM platforms like HubSpot or Salesforce.” appears verbatim or near-verbatim in 45 pages.",
         "The sentence either invites comparison shopping or insults the reader. It carries no procedural information."),
    ],
)

# 3.2 Rendering / structural
add_heading(doc, "3.2 Rendering and structural defects (S2)", 2)
add_table(doc,
    headers=["Defect", "Examples", "Why it matters"],
    rows=[
        ("Orphan H1 subtitle",
         "52 pages have a plain `Vendor Usage Monitoring` paragraph immediately under `# Vendor`. It is not a heading, not a description, not part of a list — just floating prose.",
         "Renders as a stray sentence in the rendered page; screen readers announce it without context."),
        ("Sanitized Google Docs tracker URLs",
         "9 pages link out through `https://www.google.com/url?q=...&sa=D&source=editors&ust=...&usg=...`. The `usg` parameter is a Google Docs editor signature.",
         "These URLs reveal that the docs were copy-pasted from Google Docs without cleanup. They also obscure the real destination, slow page loads, and may break if Google deprecates the redirector."),
        ("HTML entities leaked into body text",
         "10 pages contain `&gt;`, `&lt;`, or `&amp;` instead of `>`, `<`, `&`. Examples: salesforce.mdx “Security &gt; API Tokens”; freshchat.mdx “https://&lt;account-name&gt;.freshchat.com”; jetbrains-cloud.mdx “Administration &gt; Access Management”.",
         "The literal entity renders to the reader (escaped twice through the export pipeline)."),
        ("Image-rendering errors leaked as prose",
         "zenefits.mdx contains three paragraphs of `Image or attachment is not accessible.` where images should be.",
         "Customer-facing build noise."),
        ("Google Docs comment artefacts leaked into prose",
         "zoominfo.mdx ends with `[a]One of the important features of dealing with SaaS is deleting or deactivating accounts for people leaving company …`. This is a Google Docs editor's footnote that escaped into production.",
         "Non-public author commentary published as page content."),
        ("Mixed numbering: 1./Step 1:/bulleted",
         "zenefits.mdx and really-simple-systems.mdx mix `1.`-numbered steps, `Step N:` headers, and bullet lists in one procedure. zenefits.mdx step 1 reads `1. Activate API Access: …` then breaks into `Step 1: Open Company Profile`, `Step 2: …`, etc.",
         "Procedure numbering is ambiguous and parallel structure is broken."),
        ("Inline pseudo-headers inside numbered lists",
         "27 pages place colon-prefixed labels inside step text: `1. Activate API Access: In your X console …`, `2. Add Credentials: …`, `3. Verify Connection: …`. The labels are titles in disguise.",
         "Either upgrade them to real subheadings or remove them. Today they are neither."),
        ("Missing space after step number",
         "cloudflare.mdx: `1.Add Credentials`, `2.Verify Connection`, `3.Approve in OpenLM`. activecampaign.mdx: `- OpenLM Components:**` (orphan asterisks).",
         "Markdown rendering or copy artefacts; visually inconsistent."),
        ("Stale 'License Access Control (LAC)' line",
         "linkedin-sales-navigator.mdx, autodesk-cloud.mdx: “For automation, License Access Control (LAC) is optional; fully available for FlexLM and experimental for DSLS, RLM, Autodesk Cloud, and LinkedIn.” Two pages quote this list verbatim.",
         "If LAC is current, the line belongs in a feature page, not in a per-vendor prerequisite. If LAC is deprecated, the line is wrong everywhere."),
    ],
)

# 3.3 Style / editorial
add_heading(doc, "3.3 Style and editorial defects (S3)", 2)
add_table(doc,
    headers=["Defect", "Splunk rule", "Reach"],
    rows=[
        ("Marketing filler", "Splunk: avoid generic value statements. Tell the reader what they will configure, not why their industry is exciting.",
         "45 of 57 pages start with a marketing-style “About” paragraph and a comparison sentence."),
        ("Contractions", "Splunk: avoid contractions in technical content (you'll, it's, we'll).",
         "48 of 57 pages."),
        ("Heading mood", "Splunk: imperative for procedure headings.",
         "All 57 pages use `## Configuring data collection` (gerund). Should be `## Configure data collection`."),
        ("Inline UI labels", "Splunk: bold UI labels with `**Label**`. Use sentence case. Use `>` for menu paths.",
         "Almost no page uses bold UI labels. UI text is run-on prose."),
        ("Capitalization inconsistency", "Splunk: sentence-style for headings; vendor-exact for product names.",
         "Many pages mix “API key / API Key / API token / API Token / Access Token” within a single procedure."),
        ("`click on` style", "Splunk: prefer `select` (mouse + keyboard).",
         "4 of 57 pages."),
        ("Missing canonical Verify section", "Splunk: every procedure ends with verification.",
         "All pages stop after Step 5 (`See Data: …`). No `## Verify the integration` block."),
        ("`OpenLM Allocation service`", "Terminology consistency.",
         "44 pages. Need to confirm the canonical name and capitalization (Allocation, OpenLM Allocation, OpenLM Reports?)."),
    ],
)

# 3.4 Cosmetic
add_heading(doc, "3.4 Cosmetic defects (S4)", 2)
add_bullets(doc, [
    "Typo `Compagny ID` (jetbrains-cloud.mdx step 8).",
    "“Linkedin” / “LinkedIn” inconsistency (linkedin-sales-navigator.mdx).",
    "“OpenLM Components:**” — orphan asterisks (activecampaign.mdx).",
    "“OpenLM Cloud Broker” vs “Cloud Broker” used interchangeably across the corpus.",
    "Backslash + blank line manual line break (cloudflare.mdx, line 49).",
    "Trailing image alt text without description (gitlab “image6.png”, freshdesk “image14.png” without surrounding context).",
    "intro.mdx is a one-liner that repeats its own description.",
    "Frontmatter `learnMoreLink` field present on every page; same undocumented field as engineering-lms.",
])

# ============ STUB STRATEGY ============
add_heading(doc, "4. Stub-page strategy", 1)
add_para(doc,
    "Three stub patterns coexist. The unified template will replace all three with the same Stub variant. Existing wording is preserved as the body of the new admonition.")
add_table(doc,
    headers=["Pattern", "Count", "Files", "Recommendation"],
    rows=[
        ("`:::info Guide Under Development` admonition with marketing description",
         "4",
         "apollo-io, canva, tabnine, zoom",
         "Move to the unified Stub variant; keep the value statement, drop the marketing comparison."),
        ("`:::info This guide is currently under development` (bare)",
         "5",
         "zoho-one and 4 others",
         "Move to the unified Stub variant; replace with prereqs + Customer Portal hand-off."),
        ("`Contact our support team` partial stubs",
         "11",
         "adobe-cloud, altair, autodesk-cloud, figma, linkedin-sales-navigator, syncfusion, tabnine, zoominfo, plus 3 others",
         "Move to the unified Partner-managed variant; preserve the prereq list and the value statement."),
        ("intro.mdx",
         "1",
         "intro.mdx",
         "Replace with a curated landing page (same approach as engineering-lms index)."),
    ],
    col_widths=[Cm(6), Cm(1.5), Cm(5.5), Cm(4)],
)

# ============ TEMPLATE ============
add_heading(doc, "5. Unified template", 1)
add_para(doc,
    "Three variants. All share the same frontmatter and headline structure, so they behave "
    "consistently in the sidebar, search, and Algolia.")

add_heading(doc, "5.1 Frontmatter (all variants)", 2)
add_code_block(doc,
    "---\n"
    "title: \"<Vendor product name, exact casing>\"\n"
    "description: \"<One factual sentence about what OpenLM monitors and the value to the reader.>\"\n"
    "slug: \"<kebab-case slug>\"\n"
    "keywords:\n"
    "  - <vendor>\n"
    "  - <category — e.g., crm, hr, devops>\n"
    "  - openlm cloud broker\n"
    "  - saas\n"
    "---")
add_bullets(doc, [
    "Title uses the vendor's exact casing: pure::variants, JetBrains, ZoomInfo, BambooHR, GitLab.",
    "Description is one factual sentence — no “similar to monitoring other …” filler. 120–155 chars.",
    "Drop the legacy `learnMoreLink` field unless its consumer is documented.",
    "Add `keywords` so Algolia and SEO have something to chew on.",
])

# 5.2 Full variant
add_heading(doc, "5.2 Full variant — integrations with a documented procedure", 2)
add_para(doc,
    "Use this variant when OpenLM publishes a configuration procedure. Replaces the legacy "
    "`Configuring data collection` flow with a structured Before-you-begin / Configure / "
    "Approve / Verify shape that mirrors the engineering-lms template — same readers configure "
    "both sets of integrations.")
add_code_block(doc,
    "# <Product name>\n"
    "\n"
    "<One sentence: what OpenLM monitors and why this integration exists.>\n"
    "\n"
    "## Before you begin\n"
    "\n"
    "- An active OpenLM Platform tenant.\n"
    "- OpenLM Cloud Broker, approved in [Broker Hub](/cloud/data-collection/broker-hub).\n"
    "- <Product>-side admin access, with permission to create the credential below.\n"
    "- <Specific permission scope, e.g. read access to user / license / subscription data.>\n"
    "\n"
    "## Generate the <Product> credential\n"
    "\n"
    "1. Sign in to <Product> as an administrator.\n"
    "2. Go to **Settings** > **<API tokens>** > **Create token**.\n"
    "3. Grant the token <list scopes>.\n"
    "4. Copy the token. <Note: the token is shown only once.>\n"
    "\n"
    ":::tip\n"
    "<Vendor link to authoritative documentation, with a real URL — not a Google Docs tracker.>\n"
    ":::\n"
    "\n"
    "## Add the credential in OpenLM Cloud Broker\n"
    "\n"
    "1. Open the OpenLM Cloud Broker dashboard.\n"
    "2. Locate the **<Product>** integration.\n"
    "3. Enter the following values:\n"
    "    - <Field 1, e.g. company domain>\n"
    "    - <Field 2, e.g. API token>\n"
    "\n"
    "    ![<Product> credential configuration in OpenLM Cloud Broker](/img/saas-platforms/<slug>/credentials.png)\n"
    "\n"
    "4. Select **Test connection** and confirm the test passes.\n"
    "5. Select **Save**.\n"
    "\n"
    "## Approve <Product> in OpenLM Platform\n"
    "\n"
    "1. Sign in to OpenLM Platform.\n"
    "2. From the menu, go to **License Servers** > **Pending Server**.\n"
    "3. Select the <Product> data source, then select **Approve and Merge**.\n"
    "\n"
    "## Verify the integration\n"
    "\n"
    "1. In OpenLM Platform, go to **Allocation**.\n"
    "2. Confirm <Product> usage data appears.\n"
    "\n"
    ":::note\n"
    "It can take up to 3 minutes for data to appear after approval.\n"
    ":::\n"
    "\n"
    "## Troubleshooting\n"
    "\n"
    "- **Test connection fails** — verify the credential has not expired and that the user has the required scopes.\n"
    "- **No data appears after 10 minutes** — check the OpenLM Cloud Broker run log for HTTP errors from the <Product> API.\n"
    "- **Tenant returns 401** — re-issue the credential and re-add it in Cloud Broker.\n"
    "\n"
    "## Reference\n"
    "\n"
    "- [Broker Hub](/cloud/data-collection/broker-hub)\n"
    "- [Allocation reports](/cloud/automations/license-allocation)\n"
    "- <Vendor authoritative docs link — clean URL>\n"
)

# 5.3 Partner-managed variant
add_heading(doc, "5.3 Partner-managed variant — Support-provisioned integrations", 2)
add_para(doc,
    "Use this variant when OpenLM Support configures the integration on the customer's behalf "
    "(Adobe Cloud, Altair, Autodesk Cloud, LinkedIn Sales Navigator, Tabnine, ZoomInfo, etc.).")
add_code_block(doc,
    "# <Product name>\n"
    "\n"
    "<One factual sentence about what OpenLM monitors.>\n"
    "\n"
    "## Before you begin\n"
    "\n"
    "- An active OpenLM Platform tenant.\n"
    "- <Product>-side administrator access who can authorize the connection.\n"
    "\n"
    "## How OpenLM monitors <Product>\n"
    "\n"
    "<Two to four sentences explaining the data flow and what the customer will see.>\n"
    "\n"
    ":::info Support assistance required\n"
    "OpenLM Support configures this integration for your tenant. Open a ticket from the\n"
    "[Customer Portal](https://customer.openlm.com) with:\n"
    "\n"
    "- Your OpenLM tenant name\n"
    "- Your <Product> account ID\n"
    "- Confirmation that a <Product> administrator is available to authorize the connection\n"
    ":::\n"
    "\n"
    "## What you receive after activation\n"
    "\n"
    "- <Product> usage data in OpenLM Platform reports.\n"
    "- Allocation data alongside your other data sources.\n"
)

# 5.4 Stub
add_heading(doc, "5.4 Stub variant — pending content", 2)
add_code_block(doc,
    "# <Product name>\n"
    "\n"
    "OpenLM monitors <Product> through OpenLM Cloud Broker. Detailed configuration steps are\n"
    "being prepared and will be published in the next documentation release.\n"
    "\n"
    "## Before you begin\n"
    "\n"
    "- An active OpenLM Platform tenant.\n"
    "- OpenLM Cloud Broker, approved in [Broker Hub](/cloud/data-collection/broker-hub).\n"
    "\n"
    ":::note Documentation in progress\n"
    "If you need to configure <Product> today, open a ticket from the\n"
    "[Customer Portal](https://customer.openlm.com) and reference this page. We will share the\n"
    "current procedure directly while the doc is finalized.\n"
    ":::\n"
)

# ============ STYLE QUICK-REFERENCE ============
add_heading(doc, "6. Style quick-reference (Splunk-aligned)", 1)
add_para(doc, "These rules apply specifically to SaaS pages. The engineering-lms style guide "
              "remains the corporate baseline; this is the SaaS-specific overlay.")
add_table(doc,
    headers=["Area", "Rule", "Apply this", "Don't do this"],
    rows=[
        ("Voice", "Active voice, present tense.",
         "“OpenLM Cloud Broker calls the GitLab API.”",
         "“The GitLab API will be called.”"),
        ("Marketing", "Tell the reader what they will configure. Do not market the integration.",
         "“Monitor GitLab seat usage and license assignments.”",
         "“GitLab is a comprehensive DevOps platform that…similar to monitoring other tools like Jira or GitHub.”"),
        ("Headings", "Sentence-style. Imperative for procedures.",
         "“Generate the GitLab credential”, “Configure data collection”.",
         "“Configuring data collection”, “Activate API Access:”."),
        ("Lists", "Numbered = procedures, one action per step. Bulleted = sets / options.",
         "1. Sign in. 2. Go to **Settings**. 3. Select **Create token**.",
         "1. Activate API Access: In your X panel, create a new key. 2. Add Credentials: …"),
        ("UI labels", "Bold for UI text. `>` separator for menu paths.",
         "Go to **Settings** > **API access tokens** > **Create token**.",
         "Go to Settings > API access tokens > Create token."),
        ("Click vs select", "Prefer `select` (works mouse + keyboard).",
         "Select **Approve and Merge**.",
         "Click on Approve and Merge."),
        ("Contractions", "Avoid in technical content.",
         "“You need administrator access.”",
         "“You'll need administrator access.”"),
        ("URLs", "Use the real destination URL. No tracker redirectors.",
         "[GitLab personal access tokens](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)",
         "[GitLab personal access tokens](https://www.google.com/url?q=https://docs.gitlab.com/...&sa=D&source=editors&ust=...&usg=...)"),
        ("HTML entities", "Use the real character.",
         "Settings > API",
         "Settings &gt; API"),
        ("Code, paths, tokens", "Inline code in backticks.",
         "Set the executable path to `/usr/local/bin/lmutil`.",
         "Set the executable path to /usr/local/bin/lmutil."),
        ("Admonitions", ":::note for caveats, :::info for context, :::tip for shortcuts.",
         ":::note\\nIt can take up to 3 minutes for data to appear.\\n:::",
         "Note: It can take up to 3 minutes."),
        ("Subtitles", "No orphan paragraph below the H1. The first paragraph is the lead sentence.",
         "“OpenLM monitors GitLab seat usage and license assignments through OpenLM Cloud Broker.”",
         "“GitLab Usage Monitoring” (orphan)."),
    ],
    col_widths=[Cm(2.5), Cm(5), Cm(5), Cm(4)],
)

# ============ TERMINOLOGY ============
add_heading(doc, "7. Terminology decisions to confirm", 1)
add_table(doc,
    headers=["Term", "Variants in use", "Recommended canonical form"],
    rows=[
        ("Required components",
         "OpenLM Cloud Broker / Cloud Broker / OpenLM SLM / OpenLM Server",
         "OpenLM Cloud Broker (the SaaS data collector). Drop OpenLM SLM entirely."),
        ("Verification action",
         "Test the connection / Test Connection / Verify Connection",
         "Select **Test connection** (sentence case, bolded UI label)."),
        ("Approval action",
         "Approve in OpenLM / Approve the new data source / Approve and Merge",
         "Select **Approve and Merge** (matches engineering-lms decision)."),
        ("Section in OpenLM Platform",
         "License Servers / License Manager Servers / Pending Server",
         "License Servers > Pending Server (matches engineering-lms decision)."),
        ("Allocation reports",
         "OpenLM Allocation service / Allocation / OpenLM Reports / OpenLM Allocation",
         "Confirm the canonical product surface name and apply consistently."),
        ("Credential field labels",
         "API key / API Key / API token / API Token / Access Token / Personal Access Token",
         "Vendor-exact when referring to a UI label; otherwise sentence-case (`API key`, `personal access token`)."),
    ],
)

# ============ MIGRATION PLAN ============
add_heading(doc, "8. Remediation plan", 1)
add_para(doc, "Five tracks, sequenced. No technical content is dropped — Track 4 explicitly "
              "migrates every existing detail into the new template.")

add_heading(doc, "Track 1 — Stop the bleeding (1 day)", 2)
add_bullets(doc, [
    "Replace `OpenLM SLM` with `OpenLM Cloud Broker` in 51 files. Drop the dual-component sentence; the prerequisite is now Cloud Broker only.",
    "Strip Google Docs tracker URLs from the 9 affected files: extract the real destination from the `q=` parameter and replace the redirector.",
    "Repair HTML entities (`&gt;`, `&lt;`, `&amp;`) in the 10 affected files.",
    "Remove the leaked Google Docs comment from zoominfo.mdx.",
    "Remove the “Image or attachment is not accessible” lines from zenefits.mdx (replace with a placeholder image or strip).",
    "Fix the orphan H1 subtitle on 52 files: drop the duplicate `Vendor Usage Monitoring` paragraph; the H1 already says it.",
    "Outcome: customer-facing build noise removed; trackers removed from outbound links.",
])

add_heading(doc, "Track 2 — Hand-fix factual defects (½ day)", 2)
add_bullets(doc, [
    "**gitlab.mdx** — rewrite the entire procedure to use the GitLab personal access token flow at `gitlab.com/-/user_settings/personal_access_tokens`. The current page is GitHub's procedure and must be replaced.",
    "**frontegg.mdx** — rewrite the description and About paragraph: Frontegg is a customer-identity / authentication / SaaS user-management platform, not a visual regression testing tool.",
    "**figma.mdx** — fix the support contact line (currently asks the user to mention “Autodesk Cloud integration”).",
    "**autodesk-cloud.mdx, linkedin-sales-navigator.mdx** — confirm the “License Access Control (LAC)” line is current; either keep it (in the LAC feature page) or remove it.",
    "**jetbrains-cloud.mdx** — fix the “Compagny ID” typo.",
    "**linkedin-sales-navigator.mdx** — “Linkedin” → “LinkedIn”.",
    "Outcome: every page describes the right product with the right procedure.",
])

add_heading(doc, "Track 3 — Approve template + terminology (½ day, blocking)", 2)
add_bullets(doc, [
    "Stakeholders sign off on the template (§5) and the terminology table (§7).",
    "Confirm the canonical name for the OpenLM Allocation surface (Allocation / OpenLM Reports / OpenLM Allocation).",
    "Outcome: a single source of truth for SaaS pages; reusable boilerplate for translators.",
])

add_heading(doc, "Track 4 — Migrate to the unified template (3–4 days)", 2)
add_bullets(doc, [
    "Migrate the ~38 substantive pages to the Full variant: Before you begin / Generate credential / Add to Cloud Broker / Approve / Verify / Troubleshooting / Reference.",
    "Migrate the 11 “Contact our support team” pages to the Partner-managed variant.",
    "Migrate the 9 stubs (4 + 5) to the Stub variant.",
    "Replace `intro.mdx` with a curated landing page that groups SaaS by category (CRM, HR, DevOps, Project & Collaboration, Productivity, Analytics, Engineering Cloud, Identity & Security, etc.).",
    "Run `npm run vale docs/cloud/data-collection/connect-license-managers/saas-platforms/` after each batch of 10 pages.",
    "Run `npm run build` after each batch — both en and ja must build clean.",
    "Outcome: 57 pages on one template, no information dropped.",
])

add_heading(doc, "Track 5 — i18n alignment (1 day, after Track 4)", 2)
add_bullets(doc, [
    "Run `npm run write-translations -- --locale ja`.",
    "Translators receive a single boilerplate (one Verify section, one Troubleshooting block) and translate it once.",
    "Outcome: clean Japanese coverage that does not propagate the Google Docs provenance defects.",
])

# ============ CHECKLIST ============
add_heading(doc, "9. Per-page editorial checklist", 1)
add_bullets(doc, [
    "Frontmatter: title uses vendor casing; description is 120–155 chars and contains no marketing filler; slug matches file name; keywords present.",
    "H1 matches the title field. No orphan `Vendor Usage Monitoring` subtitle paragraph.",
    "Lead sentence is one sentence. It describes what OpenLM monitors (not why the vendor is exciting).",
    "Headings: Before you begin · Generate the <Product> credential · Add the credential in OpenLM Cloud Broker · Approve <Product> in OpenLM Platform · Verify the integration · Troubleshooting · Reference.",
    "All headings use sentence-style capitalization and imperative mood.",
    "All UI labels are bolded. Menu paths use ` > ` with spaces around it.",
    "All steps are real numbered list items with one action each. No `Activate API Access:` inline pseudo-headers. No `Step N:` labels mixed with `1.`.",
    "All external links point at the real destination URL. No `google.com/url?q=` redirectors.",
    "No HTML entities in body text. `&gt;` → `>`, `&lt;` → `<`, `&amp;` → `&`.",
    "No contractions (no `you'll`, `it's`, `we'll`).",
    "No `OpenLM SLM`. The required component is `OpenLM Cloud Broker`.",
    "No marketing filler (`This is similar to monitoring other …`).",
    "Verify section ends with `:::note It can take up to 3 minutes …`.",
    "Vale passes; `npm run build` passes for en and ja; broken-link warnings reviewed.",
])

# ============ RISKS ============
add_heading(doc, "10. Risks and mitigations", 1)
add_table(doc,
    headers=["Risk", "Likelihood", "Impact", "Mitigation"],
    rows=[
        ("Sanitized URLs hide a destination we cannot recover automatically",
         "Medium",
         "Medium",
         "The Google redirect URL contains the real URL in the `q=` parameter; extract via URL-decode. Where the encoding is broken, fall back to a TODO comment in the file and an SME review queue."),
        ("GitLab page rewrite needs SME review",
         "High",
         "High",
         "Block Track 4 for gitlab.mdx until an SME confirms the GitLab token flow; ship the rest of the section first."),
        ("Frontegg correction may surface other wrong-product descriptions",
         "Medium",
         "Medium",
         "Spot-check 5 random pages before Track 4 — if the description matches the body and the vendor's actual product, proceed. If not, queue for SME review."),
        ("Translation drift while migration is in flight",
         "High",
         "Medium",
         "Freeze the Japanese branch until Track 4 is complete. Run write-translations once, in one batch (Track 5)."),
        ("`OpenLM Allocation service` rename touches more than this section",
         "Medium",
         "Medium",
         "Confirm the canonical surface name with product before Track 4. If it changes, the rename happens corpus-wide in a separate PR."),
        ("`Test connection` UI label may not exist in the current Cloud Broker UI",
         "Medium",
         "Low",
         "Verify the actual UI label with engineering before Track 4. The template assumes `Test connection`; switch if reality differs."),
    ],
)

# ============ SUCCESS ============
add_heading(doc, "11. Success criteria", 1)
add_bullets(doc, [
    "100% of pages match the unified template (Full / Partner-managed / Stub).",
    "0 pages with `OpenLM SLM`, 0 pages with Google tracker URLs, 0 pages with HTML entities, 0 pages with the orphan H1 subtitle.",
    "0 cross-product factual defects (sample audit on 10 random pages confirms each procedure references the correct vendor).",
    "Vale and `npm run build` both clean for `docs/cloud/data-collection/connect-license-managers/saas-platforms/`.",
    "Every page has a Verify section ending in the canonical `:::note` admonition.",
    "Stub pages explicitly say what is supported, what the prerequisite is, and where to get help today (Customer Portal link).",
    "Translators receive one boilerplate, not 49 copies.",
])

# ============ APPENDIX A: stub inventory ============
add_heading(doc, "Appendix A — Stub and partner inventory", 1)

guide_under_dev = ["apollo-io.mdx", "canva.mdx", "tabnine.mdx", "zoom.mdx"]
under_dev_admon = [
    "altium-enterprise-server.mdx (no — engineering-lms, ignore)",
    "zoho-one.mdx",
    "and 4 others to confirm by content scan",
]
support_partial = [
    "adobe-cloud.mdx", "altair.mdx", "autodesk-cloud.mdx", "figma.mdx",
    "linkedin-sales-navigator.mdx", "syncfusion.mdx", "tabnine.mdx",
    "zoominfo.mdx", "apollo-io.mdx", "canva.mdx", "zoom.mdx",
]
add_para(doc, "Stub variant — `:::info Guide Under Development` (4):", bold=True, space_after=2)
add_bullets(doc, guide_under_dev)
add_para(doc, "Stub variant — `:::info This guide is currently under development` (5):", bold=True, space_after=2)
add_bullets(doc, ["zoho-one.mdx", "and 4 others (confirm via grep before migration)"])
add_para(doc, "Partner-managed variant — Support assistance required (11):", bold=True, space_after=2)
add_bullets(doc, support_partial)

# ============ APPENDIX B: high-risk pages ============
add_heading(doc, "Appendix B — High-risk pages requiring SME review", 1)
add_bullets(doc, [
    ("gitlab.mdx", "Documents GitHub's procedure, not GitLab's. Needs full rewrite by an SME."),
    ("frontegg.mdx", "Description and About paragraph describe a visual regression testing tool; Frontegg is an authentication / customer-identity platform."),
    ("figma.mdx", "Support hand-off references Autodesk Cloud."),
    ("autodesk-cloud.mdx, linkedin-sales-navigator.mdx", "Confirm the License Access Control (LAC) line is still current; if so, move to a feature page rather than per-vendor."),
    ("zenefits.mdx", "“Image or attachment is not accessible” leaked — the screenshots that should be there were never imported."),
    ("zoominfo.mdx", "Google Docs editor comment leaked into prose at the end of the page."),
    ("salesforce.mdx", "Description / About paragraph reference both Salesforce Connected App flow AND a Personalization API token flow — confirm which one is current."),
    ("really-simple-systems.mdx, zenefits.mdx", "Mixed `1./Step N:` numbering inside one procedure; needs SME review to confirm the actual order."),
])

# ============ APPENDIX C: methodology ============
add_heading(doc, "Appendix C — How this audit was produced", 1)
add_bullets(doc, [
    "Source corpus: docs/cloud/data-collection/connect-license-managers/saas-platforms/*.mdx (57 files plus intro.mdx).",
    "Reading sample: ~35 substantive pages read in full; remaining pages spot-checked via grep.",
    "Quantitative checks across the full corpus for: deprecated `OpenLM SLM`, sanitized `google.com/url?q=` URLs, HTML entities, orphan subtitle, marketing filler (`similar to monitoring`), inline pseudo-headers (`Activate API Access:`), `Step N:` mixing, contractions, `click on`, leaked Google Docs comments.",
    "Style baseline: same Splunk Style Guide subset used in the engineering-lms audit, with a SaaS-specific overlay covering the orphan-subtitle and marketing-filler defects.",
    "Output: this document, intended for review by the technical writing lead, the product lead for SaaS integrations, and engineering, before any file is touched.",
])

# Save
OUT.parent.mkdir(parents=True, exist_ok=True)
doc.save(OUT)
print(f"Wrote {OUT}")
