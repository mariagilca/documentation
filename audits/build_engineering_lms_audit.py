"""Build the Engineering License Managers audit DOCX.

Run:
    python3 audits/build_engineering_lms_audit.py

Produces:
    audits/Engineering-License-Managers-Audit-2026-05-06.docx
"""

from datetime import date
from pathlib import Path

from docx import Document
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.table import WD_ALIGN_VERTICAL
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.shared import Cm, Pt, RGBColor

OUT = Path(__file__).parent / f"Engineering-License-Managers-Audit-{date.today().isoformat()}.docx"
DOCS_ROOT = Path(__file__).parent.parent / "docs/cloud/data-collection/connect-license-managers/engineering-lms"

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
    # Light grey background via paragraph shading
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

    # Header row
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

    # Body rows
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


# ---------- Content ---------------------------------------------------------

doc = Document()

# Page margins
section = doc.sections[0]
section.top_margin = Cm(2.0)
section.bottom_margin = Cm(2.0)
section.left_margin = Cm(2.2)
section.right_margin = Cm(2.2)

# Default font
styles = doc.styles
normal = styles["Normal"]
normal.font.name = "Calibri"
normal.font.size = Pt(11)

# ============ COVER ============
title = doc.add_paragraph()
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
tr = title.add_run("Engineering License Managers")
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
    "Scope: docs/cloud/data-collection/connect-license-managers/engineering-lms/\n"
    "Style baseline: Splunk Style Guide (current edition)\n"
    "Status: Draft — pending stakeholder approval before implementation"
)
mr.font.size = Pt(11)
mr.font.color.rgb = RGBColor(0x33, 0x33, 0x33)

doc.add_page_break()

# ============ EXECUTIVE SUMMARY ============
add_heading(doc, "1. Executive summary", 1)

add_para(doc,
    "The Engineering license managers section comprises 100 integration pages plus an index. "
    "The pages were generated and republished quickly to support the platform refresh, and the "
    "audit found systemic editorial, structural, and factual defects that affect every published "
    "page. None of the defects are individually severe, but in aggregate they break trust, leak "
    "automation artifacts to readers, and create localization risk because the same boilerplate "
    "errors propagate to each language. This document captures the findings, proposes a single "
    "canonical template aligned with the Splunk Style Guide, and lays out a phased remediation "
    "plan that preserves every piece of existing technical information."
)

add_heading(doc, "1.1 Headline numbers", 2)
add_table(
    doc,
    headers=["Metric", "Count", "Notes"],
    rows=[
        ("Total integration pages", "100", "Plus index.mdx and _category_.json"),
        ("Substantive pages (≥1 procedure)", "~80", "All share the same boilerplate template"),
        ("Stub pages — “Placeholder: integration guide coming soon”", "13", "Free-text stub, no admonition"),
        ("Stub pages — “The integration document is under development” note", "7", "Uses :::note admonition"),
        ("Mixed/partial stubs (Office365 Cloud, Autodesk Cloud, Autodesk Token-Flex)", "3", "Inconsistent placeholder styles"),
        ("Pages with “click on Approve and Merge” (style defect)", "70", "Splunk: use “Approve and Merge”"),
        ("Pages with the “should appears” grammar error", "11", "Auto-Broker section boilerplate"),
        ("Pages with `## note` or bare `note` instead of `:::note`", "≥14", "Broken admonition rendering"),
        ("Pages with leaked “IMAGE NN” placeholder strings in alt text", "20", "Build artifact left in copy"),
        ("Pages with two integrations merged into one file", "2", "amp.mdx, flexera-flexnet-flexlm.mdx"),
        ("Pages with cross-LM copy/paste contamination", "≥6", "Sentence text references the wrong product"),
        ("Image directories on disk", "77 of 100", "23 pages reference no images (mostly stubs)"),
    ],
)

add_heading(doc, "1.2 Severity signals", 2)
add_bullets(doc, [
    ("Critical (factual)", "Wrong product names in body text (for example, Nvidia page describes Altair; OpenText page approves “Oracle Enterprise Manager”; flexnet-embedded-fne tells you to verify “AEScripts”)."),
    ("Critical (structural)", "Two pages bundle two unrelated integrations (AMP + ArcGIS Online; Flexera FlexNet + a duplicate FlexLM)."),
    ("High (renders broken)", "`## note` and bare `note` paragraphs instead of `:::note ... :::` admonitions; empty `##` heading in IBM LUM."),
    ("High (style)", "Heading inconsistency (Scope / General / Prerequisites / Requirements all in use); 70 of 100 pages use “click on”; ALL pages duplicate image alt-text as caption AND as paragraph text."),
    ("Medium (typos)", "“Innoyze”, “Razorcart”, “Modelex3D”, “LiMBPR”, “LicenseJ4”, “JETBrain”, “Canevas”, “ELPAN”, “Cosmos”, “Integraph”, “LM-DYNA”, “Pure::Variants” / “pure::variants” inconsistency, “OLicense” / “Olicense”."),
    ("Medium (terminology drift)", "OpenLM Server / OpenLM SLM / OpenLM Platform / OpenLM Web Interface used interchangeably without a defined model."),
    ("Low (cosmetic)", "Stale UI references (“OpenLM Web Interface interface”, “Vendor Name to Be Filled”), bare URLs without periods, inconsistent heading slug Configure OpenLM Platform / OpenLM configuration / Configure OpenLM Server."),
])

# ============ METHODOLOGY ============
add_heading(doc, "2. Methodology", 1)
add_para(doc,
    "The audit was carried out as a senior technical writer and senior technical editor would "
    "carry out an editorial pass on a candidate-for-release product area:")
add_numbered(doc, [
    "Inventory every file in the section, including index, category metadata, image directories, and stub pages.",
    "Read a representative cross-section of the corpus directly (substantive pages, partner-managed pages, full stubs, partial stubs) to establish the underlying template, the boilerplate, and the variation.",
    "Run targeted text searches across the full corpus to quantify each defect class (for example, “click on Approve”, “should appears”, “IMAGE \\d+”, broken `## note` headings, duplicate `## Requirements` sections).",
    "Map each defect class to the Splunk Style Guide rule it violates (voice, capitalization, headings, lists, procedures, UI text, terminology).",
    "Cluster defects into severity tiers and propose a single canonical template with three depth variants so that no existing technical detail is dropped.",
    "Sequence the remediation work so that the highest-impact, lowest-risk fixes can ship first and the rest can be batched safely behind redirects.",
])

# ============ FINDINGS ============
add_heading(doc, "3. Findings — defect catalogue", 1)
add_para(doc,
    "Defects are grouped by class. Each entry lists what is wrong, why it matters, the Splunk "
    "Style Guide rule that applies, representative examples, and rough corpus reach. Severities "
    "are S1 (critical / factual), S2 (high / breaks rendering or trust), S3 (medium / style and "
    "consistency), S4 (low / cosmetic).")

# 3.1 Factual
add_heading(doc, "3.1 Factual defects (S1)", 2)
add_table(doc,
    headers=["Defect", "Examples", "Why it matters"],
    rows=[
        ("Wrong product in body text",
         "nvidia-license-manager.mdx opens with “configure OpenLM with the Altair License Server (ALS)”. opentext-spicer.mdx ends with “select the Oracle Enterprise Manager license manager”. flexnet-embedded-fne.mdx step 6 says “Ensure AEScripts appears in the list”. reprise-rlm.mdx auto-detect step says “Altair should appears”.",
         "Customers following the page literally configure or expect the wrong product. Searches and AI assistants index the wrong association."),
        ("Two integrations bundled in one file",
         "amp.mdx contains AMP and ArcGIS Online. flexera-flexnet-flexlm.mdx contains the Flexera/FLEXlm guide and a duplicated standalone FlexLM guide.",
         "URL/SEO ambiguity, navigation inconsistency, sidebar gap. Translators must translate the same boilerplate twice in one file."),
        ("Misspelled product in body / verification step",
         "Innovyze → “Innoyze”; Razorcat → “Razorcart”; Moldex3D → “Modelex3D”; LiMBR → “LiMBRP”/“LiMBPR”; License4J → “LicenseJ4”; JetBrains → “JETBrain”; Canvas → “Canevas”; EPLAN → “ELPAN”; Comos → “Cosmos”; Intergraph → “Integraph”; LS-DYNA → “LM-DYNA”; pure::variants → “Pure::Variants”; Materialise Magics → “Materialise Magic”; OLicense → “Olicense”.",
         "Production-grade docs cannot ship typos in product names. Verification steps that test the wrong name will always fail or always succeed for the wrong reason."),
        ("Cross-LM copy/paste of code paths",
         "intes-permas.mdx mixes “INTES_OpenLM.exe” and “AMP_OpenLM.exe” in adjacent steps. creo.mdx imports the AEScripts requirement (“installed on the same machine as AEScripts”).",
         "Customers paste real paths into shells. Wrong paths cause silent failures."),
        ("Stale internal naming",
         "OpenLM SLM appears in 10 pages alongside the new OpenLM Platform terminology.",
         "Mixed terminology obscures the supported deployment story."),
    ],
)

# 3.2 Structural
add_heading(doc, "3.2 Structural and rendering defects (S2)", 2)
add_table(doc,
    headers=["Defect", "Examples", "Why it matters"],
    rows=[
        ("Broken admonition syntax",
         "Many pages use a literal `## note` heading or a bare `note` paragraph instead of the Docusaurus `:::note ... :::` admonition. cadenas.mdx, comos.mdx, datamine.mdx, gitlab.mdx, hardlock.mdx, hosted-hyperworks-units.mdx, houdini.mdx, infograph.mdx, infor-slm.mdx, ipg-lock.mdx, limbr.mdx, materialise-magics.mdx (twice), moldex3d.mdx, sentinel-superpro-license-manager.mdx all show this defect.",
         "The visual emphasis the writer intended is lost. The note becomes either a section divider in the table of contents or a flat paragraph readers will skip."),
        ("Empty heading",
         "ibm-lum.mdx line 28 is `## ` with nothing after it.",
         "Renders an empty TOC entry and a hairline rule with no purpose."),
        ("Heading hierarchy inversion",
         "sentinel-rms.mdx places `### OpenLM Broker configuration` immediately above `## Automatic Broker configuration`. infograph.mdx places `### Configure OpenLM Platform` ahead of the Broker steps that should come first.",
         "Breaks document outline accessibility; screen readers traverse the hierarchy out of order."),
        ("Image alt text leaked as body paragraph",
         "Every page uses the pattern `![alt](src)` followed by `*alt*` (caption) followed by the same alt sentence repeated as a body paragraph in the very next step. Often the alt text contains build artifacts like “IMAGE 43”, “IMAGE 156”.",
         "Doubles the body length, confuses screen readers (alt + caption + body all repeating), and exposes internal authoring artifacts."),
        ("Build placeholders leaked",
         "20 pages contain the literal string “IMAGE \\d+” (for example, “IMAGE 43”, “IMAGE 156”) in alt text and body.",
         "Customer-facing build noise."),
        ("Image dirs missing on disk",
         "77 image directories exist for 100 pages. Several substantive pages reference paths that may not exist; need a referenced-vs-on-disk audit.",
         "Broken images degrade the experience and trigger console 404s."),
    ],
)

# 3.3 Style
add_heading(doc, "3.3 Style and editorial defects (S3)", 2)
add_table(doc,
    headers=["Defect", "Splunk rule", "Reach"],
    rows=[
        ("“click on Approve and Merge” / “click on” pattern",
         "Splunk prefers the verb without “on”; “Click Approve and Merge” or “Select Approve and Merge”.",
         "70 of 100 pages."),
        ("Inconsistent intro headings",
         "Splunk: chapters/topics use sentence-style capitalization and start the body with a one-line scope sentence (no `## Scope` heading).",
         "5 pages use `## Scope`, 1 uses `## General`, 2 use `## Prerequisites`, the rest use `## Requirements`."),
        ("Inconsistent Requirements list",
         "Splunk: ordered list = sequence; unordered list = set. Requirements are a set, so should be a bulleted list.",
         "Mixed numbered/bulleted across the corpus."),
        ("“Configure OpenLM Platform” section header used as both `##` and `###`",
         "Splunk: parallel structure for repeated boilerplate sections.",
         "All substantive pages — about half use `##`, half use `###`."),
        ("Missing Oxford comma in some inline lists",
         "Splunk explicitly requires the serial comma.",
         "Sporadic."),
        ("Future tense (“will appear”, “will configure automatically”)",
         "Splunk: use present tense in documentation.",
         "Frequent in auto-Broker steps."),
        ("Bare URLs without surrounding punctuation",
         "Splunk: format URLs with terminal punctuation; for inline code, wrap in monospace.",
         "Pervasive — `http://localhost:5090/` appears unwrapped throughout."),
        ("UI elements not consistently formatted",
         "Splunk UI text guidelines: minimal special formatting; sentence-case button names; verb-first.",
         "Some pages bold UI; most use plain text; quoting style mixes “Approve” and Approve."),
        ("Headings in title case mixed with sentence-case",
         "Splunk: section headings use sentence-style capitalization (capitalize first word and proper nouns only).",
         "“Monitoring capabilities and features”, “Monitoring capabilities”, “OpenLM Broker configuration”, “Configure OpenLM Platform” all coexist."),
        ("Blanket boilerplate footer “Note: It can take up to 3 minutes…”",
         "Splunk: factual notes belong in `:::note` admonitions, not free-standing italicized prose.",
         "All ~80 substantive pages."),
        ("Title field uses inconsistent casing",
         "Splunk: product names follow vendor capitalization. The page title `\"canvas x geo\"` should be `\"Canvas X GEO\"` (or whatever the vendor uses).",
         "Multiple pages: lowercase title, missing accents."),
    ],
)

# 3.4 Cosmetic
add_heading(doc, "3.4 Cosmetic and consistency defects (S4)", 2)
add_bullets(doc, [
    "“OpenLM Web Interface interface” — duplicate noun (progecad.mdx).",
    "“Vendor Name to Be Filled” quoted from the UI in the body — should be presented as a UI element, not a sentence fragment.",
    "“Sentinel Super PROshould appears” — missing space + grammar (sentinel-superpro-license-manager.mdx).",
    "Mixed product capitalization across pages: Codemeter / CodeMeter, Hardlock / HardLock, Geovia / GEOVIA, Innoyze / Innovyze, Olicense / OLicense.",
    "Inconsistent use of `→`, `->`, and `>` for menu paths — Splunk recommends one symbol applied uniformly.",
    "Trailing double-period: `connections..` (tnavigator.mdx).",
    "Bullets used for what should be tables; tables used for what should be a one-line definition.",
    "Frontmatter `learnMoreLink` field — a custom field whose purpose is undocumented; either remove or document.",
    "`description` frontmatter sometimes equals the H1 sentence (good), sometimes is a fragment (“Diagram of how OpenLM Broker interfaces with…”) — affects search and social cards.",
])

# ============ STUB / PLACEHOLDER STRATEGY ============
add_heading(doc, "4. Stub-page strategy", 1)
add_para(doc,
    "Three different stub patterns are in use today; the audit consolidates them into one. "
    "Existing wording in stubs is preserved as a fallback message inside the new stub variant of "
    "the template; nothing is dropped.")
add_table(doc,
    headers=["Pattern in use today", "Count", "Recommendation"],
    rows=[
        ("`Placeholder: integration guide coming soon. Add details, examples and configuration for X here.`",
         "13",
         "Replace with the Stub variant of the unified template. Move authoring notes to a hidden frontmatter field or the file header comment."),
        ("`:::note The integration document is under development. :::`",
         "7",
         "Replace with the Stub variant. Keep the “under development” phrasing as the body of the admonition."),
        ("Bespoke partial stubs (Office365 Cloud, Autodesk Cloud, Autodesk Token-Flex, AIMMS, etc.)",
         "≥3",
         "Map to either the Partner-managed variant (when the integration requires Support) or the Stub variant (when the doc is genuinely pending)."),
    ],
)

# ============ TEMPLATE ============
add_heading(doc, "5. Unified template", 1)
add_para(doc,
    "The template has three variants. All three share the same frontmatter shape and headline "
    "structure, so they render consistently in the sidebar, in search, and in the Algolia index. "
    "The Full variant covers integrations with a documented Broker procedure. The Stub variant "
    "covers integrations without published instructions. The Partner-managed variant covers "
    "integrations that require OpenLM Support to provision (for example, Autodesk Cloud).")

# 5.1 Frontmatter
add_heading(doc, "5.1 Frontmatter (all variants)", 2)
add_para(doc, "Every page must declare:")
add_code_block(doc,
    "---\n"
    "title: \"<Vendor product name, exact casing>\"\n"
    "description: \"<One-sentence value statement: what OpenLM monitors and why.>\"\n"
    "slug: \"<kebab-case page slug>\"\n"
    "sidebar_position: <int — only when curating order>\n"
    "keywords:\n"
    "  - <vendor>\n"
    "  - <product>\n"
    "  - license manager\n"
    "  - openlm broker\n"
    "---")
add_bullets(doc, [
    "Title: vendor casing wins. `pure::variants`, `LM-X`, `LS-DYNA`, `Canvas X GEO`. Do not normalize to title case.",
    "Description: 120–155 characters. Used by Algolia, social cards, and the page meta. Mirrors the H1 lead sentence but is not identical to it.",
    "Slug: must match the file name; do not duplicate the section path.",
    "Drop the current `learnMoreLink` field unless it is documented and consumed by a theme component. If we keep it, document its consumer in `src/theme/`.",
])

# 5.2 Full variant
add_heading(doc, "5.2 Full variant — integrations with a documented procedure", 2)
add_para(doc,
    "Use this variant for any LM where OpenLM publishes a configuration procedure. "
    "Headings use sentence-style capitalization. Procedures use one action per step, "
    "imperative mood, and present tense.")
add_code_block(doc,
    "# <Product name>\n"
    "\n"
    "<One-sentence lead — exactly the description value, but ending in a period. Tells the reader\n"
    "what OpenLM monitors and why this integration exists. Do not repeat the heading.>\n"
    "\n"
    "## Before you begin\n"
    "\n"
    "- OpenLM Platform.\n"
    "- OpenLM Broker v25.x or later, installed on the same machine as <Product> and approved\n"
    "  in [Broker Hub](/cloud/data-collection/broker-hub).\n"
    "- <Any product-specific prereq, e.g. credentials, API token, license file path, port number>.\n"
    "\n"
    "## Monitoring capabilities\n"
    "\n"
    "| Capability | Supported |\n"
    "| --- | --- |\n"
    "| Report resolution | <By second / by minute / log file parsing> |\n"
    "| License totals | <Yes / No> |\n"
    "| License usage | <Yes / No> |\n"
    "| Denials | <Yes / No> |\n"
    "| Borrowed licenses | <Yes / No> |\n"
    "| Expiration dates | <Yes / No> |\n"
    "| Multiple-server redundancy | <Yes / No> |\n"
    "\n"
    ":::note\n"
    "Install and configure OpenLM Broker, and approve it in Broker Hub, before you continue.\n"
    ":::\n"
    "\n"
    "## Configure OpenLM Broker\n"
    "\n"
    "![How OpenLM Broker queries <Product> and forwards data to OpenLM Server](/img/engineering-lms/<slug>/architecture.png)\n"
    "\n"
    "### Option 1 — Detect <Product> automatically\n"
    "\n"
    "1. Open the Broker UI at `http://localhost:5090/`.\n"
    "2. Go to **License Managers** and select **Detect**.\n"
    "3. Confirm <Product> appears in the list.\n"
    "4. Select **Validate**, then **Save**.\n"
    "\n"
    "If detection does not configure the integration, continue with Option 2.\n"
    "\n"
    "### Option 2 — Add <Product> manually\n"
    "\n"
    "1. In the Broker UI, go to **License Managers** > **Add License Manager**.\n"
    "2. From **LM type**, select **<Product>**.\n"
    "3. Enter the port number (default: <port>).\n"
    "4. Select **Add**.\n"
    "5. In **Commands**, set the executable path to <full path to vendor utility>.\n"
    "6. Select **Execute** and confirm valid output.\n"
    "7. In **Vendors**, add the vendor name <Vendor>.\n"
    "8. (Optional) In **Log Files**, add the log file path and assign it to <Vendor>.\n"
    "9. Select **Save**.\n"
    "\n"
    "## Approve <Product> in OpenLM Platform\n"
    "\n"
    "1. Sign in to OpenLM Platform.\n"
    "2. From the menu, select **License Servers** > **Pending Server**.\n"
    "3. Select <Product> in the list, then select **Approve and Merge**.\n"
    "\n"
    "## Verify the integration\n"
    "\n"
    "1. In OpenLM Platform, go to **License Servers Live** > **Server Statistics**.\n"
    "2. Confirm <Product> appears with a green status indicator.\n"
    "\n"
    ":::note\n"
    "It can take up to 3 minutes for the status to update for a new connection.\n"
    ":::\n"
    "\n"
    "## Troubleshooting\n"
    "\n"
    "- **Status stays red after 5 minutes** — review the Broker log at `<path>` and confirm the\n"
    "  port and executable path.\n"
    "- **No usage reported** — verify the log file path and the vendor name match what you set\n"
    "  in Broker.\n"
    "- **Denials missing** — confirm the log file watcher is active and the file is rotating.\n"
    "\n"
    "## Reference\n"
    "\n"
    "- [Broker Hub](/cloud/data-collection/broker-hub)\n"
    "- [Server statistics](/cloud/openlm-administration/server-statistics)\n"
    "- <Vendor docs link>\n"
)

# 5.3 Partner-managed variant
add_heading(doc, "5.3 Partner-managed variant — Support-provisioned integrations", 2)
add_para(doc,
    "Use this variant when the integration is real and supported, but configuration must be "
    "performed by OpenLM Support (for example, Autodesk Cloud). Reuses the same headings up to "
    "the Configure step, then redirects the reader to a ticket.")
add_code_block(doc,
    "# <Product name>\n"
    "\n"
    "<One-sentence lead.>\n"
    "\n"
    "## Before you begin\n"
    "\n"
    "- An active OpenLM Platform tenant.\n"
    "- <Vendor>-side prerequisites: <admin role, API permission, etc.>.\n"
    "\n"
    "## How OpenLM monitors <Product>\n"
    "\n"
    "<Two to four sentences explaining the data flow and what readers will see in OpenLM.>\n"
    "\n"
    ":::info Support assistance required\n"
    "OpenLM Support configures this integration for your tenant. Open a ticket from the\n"
    "[Customer Portal](https://customer.openlm.com) with the following information:\n"
    "\n"
    "- Tenant name\n"
    "- <Vendor> account ID\n"
    "- <Vendor>-side credentials granted to OpenLM (per the prerequisites above)\n"
    ":::\n"
    "\n"
    "## What you receive after activation\n"
    "\n"
    "- License usage reports refreshed every <interval>.\n"
    "- Allocation data in OpenLM Platform > **Licenses**.\n"
    "- <Other reports the integration unlocks>.\n"
    "\n"
    "## Reference\n"
    "\n"
    "- <Vendor docs link>\n"
)

# 5.4 Stub variant
add_heading(doc, "5.4 Stub variant — pending content", 2)
add_para(doc,
    "Use this variant when the integration is supported but the procedure has not yet been "
    "documented. The stub still has real value: it confirms support, sets the prerequisite, "
    "and gives the reader a path forward.")
add_code_block(doc,
    "# <Product name>\n"
    "\n"
    "OpenLM monitors <Product> through OpenLM Broker. Detailed configuration steps are being\n"
    "prepared and will be published in the next documentation release.\n"
    "\n"
    "## Before you begin\n"
    "\n"
    "- OpenLM Platform.\n"
    "- OpenLM Broker v25.x or later, installed on the same machine as <Product> and approved\n"
    "  in [Broker Hub](/cloud/data-collection/broker-hub).\n"
    "\n"
    ":::note Documentation in progress\n"
    "If you need to configure <Product> today, open a ticket from the\n"
    "[Customer Portal](https://customer.openlm.com) and reference this page. We will share the\n"
    "current procedure directly while the doc is finalized.\n"
    ":::\n"
)

# ============ STYLE QUICK-REFERENCE ============
add_heading(doc, "6. Style quick-reference (Splunk-aligned)", 1)
add_para(doc,
    "These are the rules the audit applies. They are a subset of the Splunk Style Guide chosen "
    "for relevance to integration / configuration topics.")
add_table(doc,
    headers=["Area", "Rule", "Apply this", "Don’t do this"],
    rows=[
        ("Voice", "Active voice, present tense.",
         "“OpenLM Broker queries the license server.”",
         "“The license server will be queried by OpenLM Broker.”"),
        ("Person", "Address the reader as you. Use we sparingly and only when OpenLM acts.",
         "“You install OpenLM Broker on the license server.”",
         "“The user shall install Broker.”"),
        ("Headings", "Sentence-style capitalization. Capitalize the first word and proper nouns only.",
         "“Configure OpenLM Broker”, “Verify the integration”.",
         "“Configure The OpenLM Broker”, “Configuring Through The Broker UI”."),
        ("Lists", "Numbered = sequence (procedures). Bulleted = set (requirements, options). One action per step. Parallel construction.",
         "“1. Open the Broker UI. 2. Select Add License Manager.”",
         "“1. Open the Broker UI, then select Add License Manager and configure the port and click Save.”"),
        ("UI text", "Bold UI labels. Use > for menu paths. Sentence-case for buttons.",
         "“Select **License Managers** > **Add License Manager**.”",
         "“click on the ‘License Managers’ tab and then click on ‘Add License Manager’ button”."),
        ("Click vs select", "Prefer “select” (works with mouse and keyboard); “click” is acceptable when the action is unambiguously a mouse click.",
         "“Select Approve and Merge.”",
         "“Click on Approve and Merge.”"),
        ("Code, paths, ports", "Inline code in backticks. Block code for multi-line.",
         "`http://localhost:5090/`, `lmutil.exe`",
         "Bare URLs in body prose."),
        ("Numbers", "Numerals for all numbers, including 0–9.",
         "“up to 3 minutes”",
         "“up to three minutes”."),
        ("Punctuation", "Oxford comma. Period at the end of every full sentence in a list.",
         "“totals, usage, and denials.”",
         "“totals, usage and denials”."),
        ("Admonitions", ":::note for caveats, :::info for context, :::tip for shortcuts. Never use a heading or a bare paragraph.",
         ":::note\\nIt can take up to 3 minutes…\\n:::",
         "## note\\nIt can take up to 3 minutes…"),
        ("Images", "One image per concept. Alt text describes the image; do not repeat alt text in body. Captions are optional and short.",
         "![Broker UI showing a green status indicator](…)",
         "Alt + caption + same sentence as a paragraph."),
        ("Product names", "Use the vendor’s casing exactly. Verify per release.",
         "Codemeter (Wibu), pure::variants, LS-DYNA, FLEXlm.",
         "CodeMeter / Codemeter mixed in one page."),
        ("Tense", "Present tense always. Future tense only for deprecation notices and tutorial framing.",
         "“Broker forwards the data to OpenLM Server.”",
         "“Broker will forward the data.”"),
        ("Tone", "Concise, neutral, instructional. No marketing words.",
         "“Configure”, “Verify”, “Approve”.",
         "“Easily”, “simply”, “please”, “amazing”."),
    ],
    col_widths=[Cm(2.5), Cm(5), Cm(5), Cm(4)],
)

# ============ TERMINOLOGY ============
add_heading(doc, "7. Terminology decisions to confirm", 1)
add_para(doc,
    "These are decisions the audit cannot make alone. Approving them removes the largest source "
    "of inconsistency.")
add_table(doc,
    headers=["Term", "Variants in use", "Recommended canonical form"],
    rows=[
        ("Platform name",
         "OpenLM, OpenLM Server, OpenLM SLM, OpenLM Platform, OpenLM Web Interface",
         "OpenLM Platform (the SaaS product). Reserve OpenLM Server for the on-prem component."),
        ("Web UI",
         "OpenLM Web Interface, OpenLM Platform UI, OpenLM Web UI",
         "OpenLM Platform UI (when the surface matters); otherwise use OpenLM Platform."),
        ("Approve action",
         "Approve and Merge / Approve&Merge / Approve+Merge",
         "Approve and Merge — bolded as a UI element."),
        ("Pending area",
         "Pending Server / Pending Servers / pending server",
         "Pending Server (UI label) — bolded; lowercase “pending server” for prose."),
        ("Verb for clicking",
         "click, click on, select",
         "Select. Reserve click for explicit mouse-only paths."),
        ("Time format",
         "“up to 3 minutes”, “3 minutes”, “3 mins”",
         "“up to 3 minutes” (numeral + full unit)."),
    ],
)

# ============ MIGRATION PLAN ============
add_heading(doc, "8. Remediation plan", 1)
add_para(doc,
    "Five tracks, sequenced. No technical content is dropped — Track 4 explicitly migrates "
    "every existing detail into the new template.")

add_heading(doc, "Track 1 — Stop the bleeding (1 day)", 2)
add_bullets(doc, [
    "Replace every `## note` and bare `note` paragraph with `:::note ... :::` admonition (≈14 pages).",
    "Remove the empty heading from ibm-lum.mdx.",
    "Patch the four cross-LM copy/paste defects: nvidia-license-manager, opentext-spicer, flexnet-embedded-fne, reprise-rlm.",
    "Remove leaked “IMAGE NN” strings from alt text and adjacent body text in the 20 affected files.",
    "Outcome: rendering and factual integrity restored across the section. Low risk, high signal.",
])

add_heading(doc, "Track 2 — Split bundled pages (½ day)", 2)
add_bullets(doc, [
    "Split amp.mdx into amp.mdx and arcgis-online.mdx.",
    "Split flexera-flexnet-flexlm.mdx — keep the Flexera/FLEXlm section, drop the duplicated FlexLM block (or move it to its own page if it documents a distinct deployment).",
    "Add `createRedirects` entries in `docusaurus.config.js` so existing links keep working.",
    "Outcome: clean URL space and clean sidebar.",
])

add_heading(doc, "Track 3 — Approve the template (½ day, blocking)", 2)
add_bullets(doc, [
    "Stakeholders sign off on the unified template (§5) and the terminology table (§7).",
    "Decisions captured in CONTRIBUTING.md and src/theme/ as appropriate.",
    "Outcome: a single source of truth that future authors and translators can rely on.",
])

add_heading(doc, "Track 4 — Migrate every page to the template (5–7 days)", 2)
add_bullets(doc, [
    "Migrate the 80 substantive pages. Per page: align headings, fix capitalization and click→select, dedupe alt text, repair admonitions, fix product-name typos, normalize the Approve and Verify sections, attach the Troubleshooting and Reference blocks where source content exists.",
    "Migrate the 20+ stub pages to the Stub variant. Mark partner-managed integrations with the Partner-managed variant.",
    "Run the section through `npm run vale` after each batch of 10–15 pages.",
    "Run `npm run build` after each batch — the dev server tolerates structural problems that the build catches.",
    "Outcome: 100 pages on one template, no information dropped.",
])

add_heading(doc, "Track 5 — i18n alignment (2 days, after Track 4)", 2)
add_bullets(doc, [
    "Run `npm run write-translations -- --locale ja`.",
    "Translate (or have translators translate) the new boilerplate once. Because every page now shares the same boilerplate, translators no longer translate the same sentence 80 times with subtle drift each time.",
    "Outcome: per the CLAUDE.md gotcha, fresh Japanese coverage that does not propagate the legacy errors.",
])

# ============ CHECKLIST ============
add_heading(doc, "9. Per-page editorial checklist", 1)
add_para(doc, "The reviewer applies this checklist to every migrated page before merging.")
add_bullets(doc, [
    "Frontmatter: title uses vendor casing; description is 120–155 chars; slug matches file name; keywords present.",
    "H1 matches the title field.",
    "Lead sentence is one sentence; mirrors but does not duplicate the description.",
    "Headings present in this order, sentence-case: Before you begin · Monitoring capabilities · Configure OpenLM Broker · Approve <Product> in OpenLM Platform · Verify the integration · Troubleshooting · Reference.",
    "“Before you begin” is a bulleted list.",
    "“Monitoring capabilities” is a 2-column table with the columns shown in §5.2.",
    "Procedure steps are in numbered lists, one action per step, imperative mood, present tense.",
    "Every UI label is bolded; menu paths use the > separator with spaces around it.",
    "No instance of “click on”; “select” is preferred.",
    "No `## note` headings; admonitions use `:::note`, `:::info`, `:::tip`.",
    "Each image has descriptive alt text; the alt text is not repeated as a body paragraph.",
    "No leaked “IMAGE NN” strings.",
    "No future tense except deprecation framing.",
    "Oxford comma applied.",
    "All product names spelled exactly as the vendor spells them.",
    "All paths and ports in inline code or code blocks.",
    "Verification step is present; troubleshooting block is present (or marked “n/a — single-path integration” explicitly).",
    "Vale passes; `npm run build` passes; broken-link warnings reviewed.",
])

# ============ RISKS ============
add_heading(doc, "10. Risks and mitigations", 1)
add_table(doc,
    headers=["Risk", "Likelihood", "Impact", "Mitigation"],
    rows=[
        ("Renames break existing inbound links",
         "Medium",
         "High (SEO, partner integrations)",
         "Add `createRedirects` for any moved/split file. Run `npm run build` after each batch and review broken-link warnings."),
        ("Translations drift while migration is in flight",
         "High",
         "Medium",
         "Freeze the Japanese branch until Track 4 is complete. Run write-translations once, in one batch (Track 5)."),
        ("Stakeholders disagree on terminology",
         "Medium",
         "Medium (rework cost)",
         "Track 3 is gating. Do not start Track 4 until §7 is signed off."),
        ("Unverified product capability tables",
         "High",
         "High (we publish wrong claims)",
         "Capability tables come straight from the existing pages. Migration preserves them as written; flag any cell where the existing page is internally inconsistent for SME review before publishing."),
        ("Image set on disk does not match references",
         "Medium",
         "Low (404s in console)",
         "After Track 4, run a referenced-vs-on-disk audit. Replace any missing image with a single canonical architecture diagram per LM."),
        ("Bundled file split causes link rot",
         "Medium",
         "Medium",
         "Maintain redirects from the old anchors (`#arcgis-online`, `#flexlm`) to the new pages."),
    ],
)

# ============ SUCCESS CRITERIA ============
add_heading(doc, "11. Success criteria", 1)
add_bullets(doc, [
    "100% of pages match the unified template (Full / Partner-managed / Stub).",
    "0 broken admonitions; 0 empty headings; 0 leaked “IMAGE NN” strings.",
    "0 cross-LM copy/paste defects (sample audit on 10 random pages confirms each verification step references the correct product).",
    "Vale and `npm run build` both clean.",
    "All terms in §7 resolve to one canonical form across the section.",
    "Stub pages explicitly say what is supported, what the prerequisite is, and where to get the procedure today (Customer Portal link).",
    "Translators receive a single boilerplate to translate, not 80 near-duplicates.",
])

# ============ APPENDIX A: stubs ============
add_heading(doc, "Appendix A — Stub inventory", 1)
add_para(doc,
    "All stub pages identified, with the recommended target variant. Existing wording is "
    "preserved as the body of the new admonition.")
stubs_placeholder = [
    "altair-managed.mdx", "altiva.mdx", "autodesk-token-flex.mdx", "ibm-jazz.mdx",
    "juniper.mdx", "msc-licensing-helium.mdx", "peloton-rigview.mdx",
    "phase2phase.mdx", "re-vision-effects.mdx", "seisware.mdx",
    "sparx-pro.mdx", "tebis-tg.mdx", "tweak.mdx",
]
stubs_note = [
    "aimms.mdx", "altium-enterprise-server.mdx", "dug-insight.mdx", "etap.mdx",
    "limelm.mdx", "ogi-systems.mdx", "squish.mdx",
]
partner = [
    "autodesk-cloud.mdx", "office365-cloud.mdx", "salesforce.mdx (partial — confirm)",
]
add_para(doc, "Stub variant — “Placeholder” free-text (13):", bold=True, space_after=2)
add_bullets(doc, stubs_placeholder)
add_para(doc, "Stub variant — “:::note under development” (7):", bold=True, space_after=2)
add_bullets(doc, stubs_note)
add_para(doc, "Partner-managed variant — Support assistance required (3, confirm):", bold=True, space_after=2)
add_bullets(doc, partner)

# ============ APPENDIX B: high-risk pages ============
add_heading(doc, "Appendix B — High-risk pages requiring SME review", 1)
add_para(doc, "These pages have factual or structural defects that need a Subject Matter Expert "
              "to confirm intent before migration.")
add_bullets(doc, [
    ("amp.mdx", "Bundles AMP and ArcGIS Online; needs split. Confirm whether ArcGIS Online belongs under engineering-lms or under another section."),
    ("flexera-flexnet-flexlm.mdx", "Bundles two FlexLM/FlexNet guides; confirm whether the second block documents a distinct deployment that warrants its own page."),
    ("nvidia-license-manager.mdx", "Lead sentence describes Altair, not Nvidia. Confirm the actual procedure with engineering."),
    ("opentext-spicer.mdx", "Approve step references Oracle Enterprise Manager; confirm correct verification step."),
    ("flexnet-embedded-fne.mdx", "Verification step references AEScripts; confirm correct check."),
    ("reprise-rlm.mdx", "Detect step says “Altair should appears”; confirm Reprise auto-detects and update copy."),
    ("solidworks-epdm.mdx", "Procedure references the Windows Start menu and OpenLM Server desktop UI; confirm whether this integration still exists in the OpenLM Platform world."),
    ("infor-slm.mdx", "Verification asks the reader to ensure “AEScripts” appears; confirm correct check."),
    ("intes-permas.mdx", "Step 5 points at AMP_OpenLM.exe; confirm that this isn’t a real cross-product workflow we are simply describing badly."),
    ("creo.mdx", "Requirements line says “installed on the same machine as AEScripts”; confirm correct prereq."),
    ("ibm-lum.mdx", "Empty `##` heading and incomplete cluster section; confirm intent."),
    ("salesforce.mdx", "Requires an external Connected App procedure that is partially described; confirm we are not redirecting to vendor docs that change."),
])

# ============ APPENDIX C: change log of audit ============
add_heading(doc, "Appendix C — How this audit was produced", 1)
add_bullets(doc, [
    "Source corpus: docs/cloud/data-collection/connect-license-managers/engineering-lms/*.mdx (100 files).",
    "Reading sample: ~70 substantive pages read in full; remaining pages spot-checked via grep.",
    "Quantitative checks performed across the full corpus, not the sample, for: “click on”, “should appears”, broken `## note`, leaked “IMAGE NN”, duplicate `## Requirements`, empty `##`, occurrences of “OpenLM SLM”, presence of placeholder vs note stubs.",
    "Style baseline: the current Splunk Style Guide, specifically the Capitalization, Titles and headings, Voice and tone (active and present), Lists (best practices and ordered lists), and UI text guidelines pages.",
    "Output: this document, intended to be reviewed by the technical writing lead, the engineering lead, and product, before any file is touched.",
])

# Save
OUT.parent.mkdir(parents=True, exist_ok=True)
doc.save(OUT)
print(f"Wrote {OUT}")
