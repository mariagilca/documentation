const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, PageBreak, ExternalHyperlink
} = require("docx");

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function heading1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 }, children: [new TextRun({ text, bold: true, font: "Arial", size: 28, color: "155FA0" })] });
}
function heading2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 160 }, children: [new TextRun({ text, bold: true, font: "Arial", size: 24, color: "0B4D88" })] });
}
function heading3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 120 }, children: [new TextRun({ text, bold: true, font: "Arial", size: 22, color: "333333" })] });
}
function para(text, opts = {}) {
  return new Paragraph({ spacing: { after: 160, line: 276 }, ...opts, children: [new TextRun({ text, font: "Arial", size: 21, ...opts.run })] });
}
function paraRuns(runs, opts = {}) {
  return new Paragraph({ spacing: { after: 160, line: 276 }, ...opts, children: runs.map(r => new TextRun({ font: "Arial", size: 21, ...r })) });
}
function bullet(text, level = 0) {
  return new Paragraph({ numbering: { reference: "bullets", level }, spacing: { after: 80, line: 276 }, children: [new TextRun({ text, font: "Arial", size: 21 })] });
}
function bulletRuns(runs, level = 0) {
  return new Paragraph({ numbering: { reference: "bullets", level }, spacing: { after: 80, line: 276 }, children: runs.map(r => new TextRun({ font: "Arial", size: 21, ...r })) });
}
function numberedItem(text, level = 0) {
  return new Paragraph({ numbering: { reference: "numbers", level }, spacing: { after: 80, line: 276 }, children: [new TextRun({ text, font: "Arial", size: 21 })] });
}
function numberedRuns(runs, level = 0) {
  return new Paragraph({ numbering: { reference: "numbers", level }, spacing: { after: 80, line: 276 }, children: runs.map(r => new TextRun({ font: "Arial", size: 21, ...r })) });
}

function makeHeaderRow(cells) {
  return new TableRow({
    children: cells.map(([text, width]) => new TableCell({
      borders, width: { size: width, type: WidthType.DXA },
      shading: { fill: "155FA0", type: ShadingType.CLEAR },
      margins: cellMargins,
      children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: 20, bold: true, color: "FFFFFF" })] })]
    }))
  });
}
function makeRow(cells) {
  return new TableRow({
    children: cells.map(([text, width]) => new TableCell({
      borders, width: { size: width, type: WidthType.DXA },
      margins: cellMargins,
      children: [new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text, font: "Arial", size: 20 })] })]
    }))
  });
}
function makeRowBold(cells) {
  return new TableRow({
    children: cells.map(([text, width]) => new TableCell({
      borders, width: { size: width, type: WidthType.DXA },
      shading: { fill: "F0F5FA", type: ShadingType.CLEAR },
      margins: cellMargins,
      children: [new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text, font: "Arial", size: 20, bold: true })] })]
    }))
  });
}

const doc = new Document({
  numbering: {
    config: [
      { reference: "bullets", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "\u2013", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
      ]},
      { reference: "numbers", levels: [
        { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        { level: 1, format: LevelFormat.LOWER_LETTER, text: "%2.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 1440, hanging: 360 } } } },
      ]},
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, font: "Arial", color: "155FA0" }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, font: "Arial", color: "0B4D88" }, paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 22, bold: true, font: "Arial", color: "333333" }, paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({ children: [
        new Paragraph({ alignment: AlignmentType.RIGHT, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "155FA0", space: 4 } }, children: [
          new TextRun({ text: "OpenLM Documentation \u2014 Information Architecture Review", font: "Arial", size: 16, color: "666666", italics: true })
        ]})
      ]})
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({ alignment: AlignmentType.CENTER, border: { top: { style: BorderStyle.SINGLE, size: 2, color: "CCCCCC", space: 4 } }, children: [
          new TextRun({ text: "Page ", font: "Arial", size: 16, color: "999999" }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "999999" })
        ]})
      ]})
    },
    children: [
      // ===== TITLE PAGE =====
      new Paragraph({ spacing: { before: 2400 }, children: [] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
        new TextRun({ text: "OpenLM Documentation", font: "Arial", size: 44, bold: true, color: "155FA0" })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [
        new TextRun({ text: "Information Architecture & User Journey Review", font: "Arial", size: 32, color: "0B4D88" })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
        new TextRun({ text: "Get Started Section \u2022 Platform & Architecture \u2022 Onboarding Flow", font: "Arial", size: 22, color: "666666" })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600, after: 40 }, children: [
        new TextRun({ text: "Prepared for: OpenLM Documentation Team", font: "Arial", size: 21, color: "333333" })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [
        new TextRun({ text: "Date: April 10, 2026", font: "Arial", size: 21, color: "333333" })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [
        new TextRun({ text: "Classification: Internal", font: "Arial", size: 21, color: "999999" })
      ]}),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== EXECUTIVE SUMMARY =====
      heading1("Executive summary"),
      para("This document presents a comprehensive information architecture and user journey review of the OpenLM Platform documentation, focused on the /cloud/category/get-started section and its relationship to the broader doc set. The analysis is grounded in a full audit of the Docusaurus repository structure, the cloud doc tree, project guides, the intern task backlog, and available SharePoint knowledge sources."),
      para("The review identifies structural gaps, content sequencing problems, audience misalignment, and missing wayfinding elements that reduce the effectiveness of the getting-started experience. It then proposes concrete, prioritized improvements organized into three tiers: quick wins, structural refactors, and long-term information architecture enhancements."),

      heading2("Scope of analysis"),
      bullet("docs/cloud/getting-started/ \u2014 all pages and subcategories"),
      bullet("docs/cloud/deployment-operations/ \u2014 cloud and on-premise deployment docs"),
      bullet("docs/cloud/openlm-administration/ \u2014 identity, products, audit, configuration"),
      bullet("docs/cloud/data-collection/ \u2014 broker hub, cloud broker, agents hub, process manager"),
      bullet("docs/cloud/understanding-openlm/ \u2014 FAQ, feature-service matrix"),
      bullet("docs/cloud/for-end-users/ \u2014 end-user onboarding materials"),
      bullet("project-guides/ \u2014 contributor docs, intern task backlog"),
      bullet("docusaurus.config.js \u2014 sidebar, navigation, and redirect configuration"),
      bullet("SharePoint \u2014 openlm.com and openlm sites (limited content in readable formats)"),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== SECTION 1: CURRENT STATE =====
      heading1("1. Current state assessment"),

      heading2("1.1 Getting-started structure today"),
      para("The Get Started category (sidebar position 1) contains three pages and one large subcategory:"),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3200, 1560, 4600],
        rows: [
          makeHeaderRow([["Page / Category", 3200], ["Position", 1560], ["Purpose", 4600]]),
          makeRow([["About OpenLM Platform (what-is-openlm.mdx)", 3200], ["1", 1560], ["Product overview, key capabilities", 4600]]),
          makeRow([["Architecture (architecture.md)", 3200], ["2", 1560], ["Platform architecture, microservices, data flow", 4600]]),
          makeRow([["Quick Start Guide (available_installation_methods.mdx)", 3200], ["3", 1560], ["Registration, onboarding checklist, component install", 4600]]),
          makeRow([["Connect License Managers (subcategory)", 3200], ["8", 1560], ["100+ individual LM integration pages (engineering + SaaS)", 4600]]),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      heading2("1.2 Key findings"),

      heading3("Finding 1: The About page lacks a clear value proposition and user path"),
      para("The what-is-openlm.mdx page reads more like marketing copy than a documentation landing page. It lists six capabilities as bullet points but does not orient the reader toward their first task. The closing line \u2014 \u201cExplore documentation to get started with set-up, configuration, and advanced features\u201d \u2014 provides no link and no actionable next step. A new user finishes the page without knowing where to go or what to do."),

      heading3("Finding 2: Architecture is premature in the onboarding sequence"),
      para("Placing a deep-dive architecture page (microservices, Kafka, Spark, Mermaid diagrams) at position 2, before the Quick Start Guide, front-loads complexity. A first-time reader does not need to understand enrichment services, staging databases, or Level 2 data pipelines before they have registered for the product. Architecture is valuable reference material, but it interrupts the \u201cwhat do I do first?\u201d flow."),

      heading3("Finding 3: The Quick Start Guide mixes prerequisites, registration, and installation without clear segmentation"),
      para("The Quick Start Guide attempts to cover prerequisites, registration, the onboarding checklist, authorization, and three separate component installations in a single page. While the use of tabs and checklist components helps, the page conflates \u201cwhat you need before you start\u201d with \u201chow to register\u201d with \u201chow to install Broker/Agent/DSA.\u201d This creates a wall-of-text experience that does not match the progressive-disclosure pattern users expect from getting-started content."),

      heading3("Finding 4: Connect License Managers is misplaced inside Get Started"),
      para("The Connect License Managers subcategory contains over 100 integration-specific pages (engineering LMs and SaaS platforms). This volume belongs in a dedicated reference section, not inside the getting-started flow. A new user scanning the sidebar sees the Get Started category expand into a massive list of vendor names, which obscures the three onboarding pages that matter. The redirect configuration in docusaurus.config.js confirms this content was previously under /cloud/data-collection/interfacing-lms/ and was moved here \u2014 an IA regression."),

      heading3("Finding 5: Deployment and operations content is disconnected from onboarding"),
      para("The Deployment & Operations section (position 2) contains critical setup information \u2014 system requirements, components installation, networking, TLS certificates \u2014 that a new user needs during onboarding. But the Quick Start Guide does not link to these pages. The components-installation.mdx page in deployment-operations duplicates part of the Quick Start Guide\u2019s install content with more detail and interactive Arcade embeds. Users encounter two competing installation narratives with no bridge between them."),

      heading3("Finding 6: No role-based entry points"),
      para("OpenLM serves at least four distinct personas: IT administrators deploying the platform, license managers configuring policies, end users running licensed software, and executives reviewing compliance reports. The current structure provides a single linear path that assumes an administrator persona. End users have a separate \u201cFor End Users\u201d section at sidebar position 15, but it is invisible during onboarding."),

      heading3("Finding 7: Placeholder and incomplete content erodes trust"),
      para("The intern task list documents 13 placeholder integration pages, a placeholder license-manager.mdx administration page, unresolved TODOs in on-premise deployment docs, and multiple \u201ccoming soon\u201d stubs. Two cloud deployment pages (regions/SLAs, data residency) are also marked as under development. When new users encounter stubs during their first session, it signals that the documentation is unreliable."),

      heading3("Finding 8: Glossary and service index are buried"),
      para("The Glossary (position 998) and Service Index (position 999) are pushed to the bottom of the sidebar. These are high-value reference resources for a product with 150+ microservices and domain-specific terminology. Users learning OpenLM terminology during onboarding have no easy access to definitions."),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== SECTION 2: USER JOURNEY ANALYSIS =====
      heading1("2. User journey analysis"),

      heading2("2.1 Current journey (administrator persona)"),
      para("The following table maps the steps a new IT administrator takes today, from first visit to first useful report, against the documentation pages they encounter."),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [600, 2000, 2680, 1600, 2480],
        rows: [
          makeHeaderRow([["Step", 600], ["User goal", 2000], ["Current page", 2680], ["Friction", 1600], ["Gap", 2480]]),
          makeRow([["1", 600], ["Understand what OpenLM does", 2000], ["what-is-openlm.mdx", 2680], ["Medium", 1600], ["No next-step link; no persona routing", 2480]]),
          makeRow([["2", 600], ["Understand architecture", 2000], ["architecture.md", 2680], ["High", 1600], ["Too deep too soon; blocks momentum", 2480]]),
          makeRow([["3", 600], ["Register and log in", 2000], ["Quick Start Guide (mid-page)", 2680], ["Medium", 1600], ["Buried below prerequisites section", 2480]]),
          makeRow([["4", 600], ["Activate products", 2000], ["Quick Start Guide (checklist)", 2680], ["Low", 1600], ["Checklist component works well", 2480]]),
          makeRow([["5", 600], ["Set up reporting (Quick Suite)", 2000], ["Quick Start Guide (checklist)", 2680], ["High", 1600], ["Complex 5-step sub-flow inline; should be its own page", 2480]]),
          makeRow([["6", 600], ["Generate auth files", 2000], ["Quick Start Guide \u2192 Identity docs", 2680], ["High", 1600], ["Cross-reference to admin section; no inline summary", 2480]]),
          makeRow([["7", 600], ["Install Broker", 2000], ["Quick Start Guide (tab)", 2680], ["Medium", 1600], ["Thin steps; deeper guide in deployment-operations", 2480]]),
          makeRow([["8", 600], ["Install Workstation Agent", 2000], ["Quick Start Guide (tab)", 2680], ["Medium", 1600], ["Same thin-step problem", 2480]]),
          makeRow([["9", 600], ["Install DSA", 2000], ["Quick Start Guide (tab)", 2680], ["Medium", 1600], ["Same thin-step problem", 2480]]),
          makeRow([["10", 600], ["Connect a license manager", 2000], ["Connect LMs subcategory", 2680], ["High", 1600], ["100+ pages with no \u201cstart here\u201d guidance", 2480]]),
          makeRow([["11", 600], ["Verify data collection", 2000], ["(none)", 2680], ["Critical", 1600], ["No verification / smoke-test page exists", 2480]]),
          makeRow([["12", 600], ["View first report", 2000], ["Reporting section (position 8)", 2680], ["High", 1600], ["No link from getting-started; user must discover it", 2480]]),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      heading2("2.2 Ideal journey (proposed)"),
      para("The ideal journey follows a progressive-disclosure pattern: orient, then register, then install, then connect, then verify, then expand. Each step should conclude with an explicit link to the next step."),

      numberedItem("Orient: Understand what OpenLM does and which persona path to follow (1 page, 2 minutes)"),
      numberedItem("Register: Create an account and activate products (1 page, 5 minutes)"),
      numberedItem("Deploy components: Install Broker, Agent, DSA with authorization (1 page per component, 15\u201330 minutes each)"),
      numberedItem("Connect: Add your first license manager (guided, not a 100-page catalog) (1 page, 10 minutes)"),
      numberedItem("Verify: Confirm data is flowing and view your first report (1 page, 5 minutes)"),
      numberedItem("Expand: Explore advanced features \u2014 compliance, alerts, LAC, reporting (links to feature sections)"),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== SECTION 3: RECOMMENDATIONS =====
      heading1("3. Recommendations"),

      heading2("3.1 Tier 1 \u2014 Quick wins (1\u20132 weeks)"),
      para("These changes require minimal restructuring and deliver immediate improvements to the onboarding experience."),

      heading3("R1. Rewrite the About page as a true landing page"),
      bullet("Open with a one-sentence value proposition, not a product description."),
      bullet("Add a \u201cChoose your path\u201d section with three cards: Administrator, License Manager, End User."),
      bullet("Each card links to the appropriate starting point (Quick Start Guide, configuration guide, For End Users section)."),
      bullet("End with a \u201cWhat\u2019s next\u201d callout linking directly to the Quick Start Guide."),
      bulletRuns([{ text: "Splunk style alignment: ", bold: true }, { text: "task-oriented entry; every page answers \u201cwhat do I do next?\u201d" }]),

      heading3("R2. Move Architecture to a reference position"),
      bullet("Change sidebar_position from 2 to 6 or later, after the user has completed onboarding."),
      bullet("Alternatively, move it under understanding-openlm/ alongside the FAQ and feature-service matrix."),
      bullet("Add a brief \u201cHow OpenLM works\u201d summary (5 sentences max) to the About page with a \u201cSee full architecture\u201d link."),

      heading3("R3. Add explicit next-step links to every getting-started page"),
      bullet("At the bottom of each page, add a styled callout: \u201cNext step: [page title]\u201d with a direct link."),
      bullet("This creates a guided path through the onboarding sequence without requiring sidebar navigation."),
      bullet("Use the Docusaurus pagination or a custom NextStep component."),

      heading3("R4. Add a \u201cVerify your setup\u201d page"),
      bullet("Create a new page at the end of the getting-started flow: verify-setup.md."),
      bullet("Content: How to confirm Broker is connected, Agent is reporting, DSA has synced, and data appears in reports."),
      bullet("This closes the critical gap at step 11 in the current journey."),

      heading3("R5. Surface the Glossary in context"),
      bullet("Add a tooltip or sidebar link component that surfaces glossary definitions on first use of key terms."),
      bullet("At minimum, add a \u201cKey terms\u201d callout on the About page linking to the Glossary."),

      new Paragraph({ spacing: { after: 120 }, children: [] }),
      heading2("3.2 Tier 2 \u2014 Structural refactors (2\u20134 weeks)"),

      heading3("R6. Split the Quick Start Guide into discrete pages"),
      para("The current monolithic page should be decomposed into a mini-sequence:"),
      numberedRuns([{ text: "Prerequisites and planning", bold: true }, { text: " \u2014 what you need before you start (infrastructure, network, knowledge)" }]),
      numberedRuns([{ text: "Register and onboard", bold: true }, { text: " \u2014 account creation, product activation, reporting setup" }]),
      numberedRuns([{ text: "Authorize components", bold: true }, { text: " \u2014 generating auth files in Identity Service (currently a cross-reference)" }]),
      numberedRuns([{ text: "Install Broker", bold: true }, { text: " \u2014 dedicated page consolidating the tab content with the fuller deployment-operations guide" }]),
      numberedRuns([{ text: "Install Workstation Agent", bold: true }, { text: " \u2014 same pattern" }]),
      numberedRuns([{ text: "Install DSA", bold: true }, { text: " \u2014 same pattern" }]),
      numberedRuns([{ text: "Connect your first license manager", bold: true }, { text: " \u2014 guided walkthrough for the most common LM (FlexNet), with links to the full catalog" }]),
      numberedRuns([{ text: "Verify your setup", bold: true }, { text: " \u2014 smoke test (R4 above)" }]),
      para("Each page should be standalone, task-focused, and end with a \u201cNext step\u201d link. This aligns with the Splunk style guide\u2019s topic-type model: separate concept, task, and reference content."),

      heading3("R7. Relocate Connect License Managers out of Get Started"),
      bullet("Move the connect-license-managers/ subcategory back under data-collection/ or to a top-level \u201cConnectors\u201d category."),
      bullet("Replace it in getting-started with a single \u201cConnect your first license manager\u201d task page (R6, step 7)."),
      bullet("Update the redirect rules in docusaurus.config.js to preserve existing URLs."),
      bullet("This reduces the Get Started sidebar from 100+ items to fewer than 10."),

      heading3("R8. Consolidate duplicate installation content"),
      bullet("The Quick Start Guide and deployment-operations/components-installation.mdx cover the same ground."),
      bullet("Make components-installation.mdx the canonical source for detailed install steps."),
      bullet("In the getting-started install pages, provide a concise task flow and link to the canonical page for advanced options, troubleshooting, and platform-specific instructions."),
      bullet("Remove duplicated Arcade embeds and download links so they are maintained in one place."),

      heading3("R9. Create a \u201cWhat you\u2019ll build\u201d orientation diagram"),
      bullet("Add a simple Mermaid diagram to the About page or the first getting-started page showing the end-state topology: License Servers \u2192 Broker \u2192 OpenLM Platform \u2192 Reports."),
      bullet("Label each component and link to the relevant install page."),
      bullet("This gives users a mental model before they begin and serves as a progress tracker."),

      new Paragraph({ spacing: { after: 120 }, children: [] }),
      heading2("3.3 Tier 3 \u2014 Long-term IA enhancements (1\u20132 months)"),

      heading3("R10. Implement role-based documentation paths"),
      para("Create distinct onboarding tracks for each persona:"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2000, 3680, 3680],
        rows: [
          makeHeaderRow([["Persona", 2000], ["Onboarding path", 3680], ["Key sections", 3680]]),
          makeRow([["IT Administrator", 2000], ["Full getting-started sequence (deploy + configure)", 3680], ["Getting Started, Deployment & Operations, Administration", 3680]]),
          makeRow([["License Manager", 2000], ["Configuration-focused (assumes platform is deployed)", 3680], ["SLM, Automations, Compliance, Reporting", 3680]]),
          makeRow([["End User", 2000], ["Lightweight (what to expect, personal dashboard)", 3680], ["For End Users (existing section)", 3680]]),
          makeRow([["Executive / Auditor", 2000], ["Reporting-first (compliance, dashboards)", 3680], ["Reporting, Compliance, SAM", 3680]]),
        ]
      }),
      new Paragraph({ spacing: { after: 160 }, children: [] }),
      bullet("Link each path from the About page landing cards (R1)."),
      bullet("Use Docusaurus sidebar category links or custom landing pages per persona."),

      heading3("R11. Restructure the sidebar hierarchy"),
      para("Proposed top-level sidebar order aligned with the user journey:"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [600, 2800, 3000, 2960],
        rows: [
          makeHeaderRow([["Pos", 600], ["Category", 2800], ["Current name / position", 3000], ["Change", 2960]]),
          makeRow([["1", 600], ["Get Started", 2800], ["Get Started (1)", 3000], ["Refactor into 8-page sequence", 2960]]),
          makeRow([["2", 600], ["Deployment & Operations", 2800], ["Deployment & Operations (2)", 3000], ["No change", 2960]]),
          makeRow([["3", 600], ["Administration", 2800], ["OpenLM Administration (2)", 3000], ["Clarify position", 2960]]),
          makeRow([["4", 600], ["Data Collection", 2800], ["Data Collection (4)", 3000], ["No change", 2960]]),
          makeRow([["5", 600], ["Connectors", 2800], ["Connect LMs (inside Get Started)", 3000], ["Promote to top level", 2960]]),
          makeRow([["6", 600], ["License Management", 2800], ["SLM (5)", 3000], ["Rename for clarity", 2960]]),
          makeRow([["7", 600], ["Automations", 2800], ["Automations (6)", 3000], ["No change", 2960]]),
          makeRow([["8", 600], ["User Management", 2800], ["User Management (7)", 3000], ["No change", 2960]]),
          makeRow([["9", 600], ["Reporting", 2800], ["Reporting (8)", 3000], ["No change", 2960]]),
          makeRow([["10", 600], ["Integrations", 2800], ["Integrations (9)", 3000], ["No change", 2960]]),
          makeRow([["11", 600], ["API Reference", 2800], ["API Reference (11)", 3000], ["No change", 2960]]),
          makeRow([["12", 600], ["Platform Reference", 2800], ["(new)", 3000], ["Group: Architecture, FAQ, Feature Matrix, Service Index, Glossary", 2960]]),
          makeRow([["13", 600], ["For End Users", 2800], ["For End Users (15)", 3000], ["Move earlier or link from About", 2960]]),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      heading3("R12. Introduce a \u201cPlatform Reference\u201d hub"),
      bullet("Consolidate architecture.md, the FAQ, feature-service matrix, service-index.md, service-map.mdx, and glossary.md into a single \u201cPlatform Reference\u201d category."),
      bullet("This creates a clear home for deep technical content that does not belong in the onboarding flow."),
      bullet("Position it after the operational sections but before changelog."),

      heading3("R13. Build a guided \u201cFirst License Manager\u201d tutorial"),
      bullet("Create a step-by-step tutorial for connecting the most common license manager (FlexNet/FlexLM) as the canonical onboarding example."),
      bullet("Include: prerequisites, Broker configuration, FlexNet server details, verification, troubleshooting."),
      bullet("Link to it from the getting-started sequence and from the Connectors landing page."),
      bullet("This replaces the current approach of dumping users into a 100-page catalog with no guidance."),

      heading3("R14. Resolve placeholder content before next release"),
      bullet("Prioritize the 13 placeholder integration pages, the license-manager.mdx stub, and the two cloud deployment stubs."),
      bullet("Either complete them or explicitly mark them as \u201cComing soon\u201d with an expected date, so users know the gap is intentional."),
      bullet("This aligns with the intern task backlog items 1\u20134 and should be tracked in Azure DevOps."),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== SECTION 4: ABOUT PAGE + ARCHITECTURE IMPROVEMENTS =====
      heading1("4. Improving the About page and Architecture content"),

      heading2("4.1 About OpenLM Platform \u2014 proposed structure"),
      para("The About page should function as the documentation home page. Every reader lands here first. The page must answer three questions in under 60 seconds: What is this product? Am I in the right place? What should I do next?"),

      heading3("Proposed outline"),
      numberedRuns([{ text: "Opening paragraph (2\u20133 sentences): ", bold: true }, { text: "What OpenLM does, who it is for, what problems it solves. Direct, task-oriented language." }]),
      numberedRuns([{ text: "How OpenLM works (5 sentences + simple diagram): ", bold: true }, { text: "High-level component overview: agents collect data, platform processes it, dashboards report it. Link to full architecture page." }]),
      numberedRuns([{ text: "Choose your path (3 cards): ", bold: true }, { text: "Administrator \u2192 Quick Start Guide. License Manager \u2192 SLM & Automations. End User \u2192 For End Users. Each card has a one-line description and a link." }]),
      numberedRuns([{ text: "Key capabilities (brief): ", bold: true }, { text: "Retain the current six-item list but convert to a compact table or icon grid with links to relevant sections." }]),
      numberedRuns([{ text: "What\u2019s next (callout): ", bold: true }, { text: "Primary CTA linking to the first getting-started page. Secondary link to the Glossary for new terminology." }]),

      heading2("4.2 Architecture page \u2014 proposed improvements"),
      para("The architecture page is well-written technically. The main issues are placement and density. With the relocation recommended in R2, the following content improvements apply:"),

      bullet("Add a \u201cWhen to read this\u201d note at the top: \u201cThis page is for administrators and architects who need to understand how the platform processes data. If you are setting up OpenLM for the first time, start with the Quick Start Guide.\u201d"),
      bullet("Convert the bulleted key-components list into a comparison table with columns: Component, Runs on, Collects, Sends data to."),
      bullet("Add alt text and captions to the Level 1 and Level 2 architecture images (currently rely on image rendering)."),
      bullet("Fix the typo: \u201cOpenLm Platform\u201d \u2192 \u201cOpenLM Platform\u201d (line 132 of architecture.md)."),
      bullet("Consider splitting the comprehensive Mermaid diagram into two: one showing the data collection pipeline and one showing the service mesh. The current diagram has 40+ nodes and is difficult to parse at any viewport width."),
      bullet("Cross-link from each architecture component to the relevant operational documentation (Broker Hub, Agents Hub, Identity)."),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== SECTION 5: GETTING STARTED GUIDE IMPROVEMENTS =====
      heading1("5. Improving the Getting Started guide"),

      heading2("5.1 Content issues in the current Quick Start Guide"),

      heading3("Prerequisites section"),
      bullet("The prerequisites are organized as a flat list. Convert to a checklist table with columns: Requirement, Details, Verification."),
      bullet("Add specific port numbers, minimum OS versions (already partially present), and link to the system-requirements.mdx page."),
      bullet("\u201cSoftware license manager knowledge\u201d and \u201cNetwork and security readiness\u201d are vague. Replace with specific checks: \u201cCan you access port 27000 on your FlexNet server?\u201d"),

      heading3("Registration section"),
      bullet("The registration flow is clear but should be its own page to reduce the length of the Quick Start Guide."),
      bullet("The screenshot of the identity registration screen is helpful. Add alt text."),
      bullet("After registration, the page says \u201cyou are redirected to the OpenLM homepage and onboarding guide\u201d but does not explain what the onboarding guide contains or link to an in-product screenshot."),

      heading3("Onboarding checklist"),
      bullet("The \u201cRegister for Reporting service (Amazon Quick Suite)\u201d checklist item is the longest and most complex on the page. It describes a 5-step flow involving an external email, a third-party sign-up page, and a specific account name. This should be a dedicated sub-page or expandable section."),
      bullet("The formatting within this checklist item is inconsistent: some steps use bold headings, others do not."),

      heading3("Component installation"),
      bullet("The three-tab install section provides identical four-step checklists (download, run, upload auth, verify) with minor variations. This is appropriate for a quick-start summary, but each tab should include a \u201cDetailed guide\u201d link to the canonical install page in deployment-operations."),
      bullet("The authorization step references Identity Service but does not explain what the authorization file contains or why it is needed. A one-sentence explanation would reduce confusion."),

      heading2("5.2 Proposed getting-started page sequence"),
      para("Based on the analysis, the recommended getting-started section structure is:"),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [600, 2800, 3000, 2960],
        rows: [
          makeHeaderRow([["Pos", 600], ["Page title", 2800], ["Content", 3000], ["Time to complete", 2960]]),
          makeRow([["1", 600], ["About OpenLM Platform", 2800], ["Value prop, persona routing, next steps", 3000], ["2 min (read)", 2960]]),
          makeRow([["2", 600], ["Prerequisites", 2800], ["Checklist table, system requirements link", 3000], ["5 min (read)", 2960]]),
          makeRow([["3", 600], ["Register and activate", 2800], ["Registration, product activation, reporting setup", 3000], ["10 min (do)", 2960]]),
          makeRow([["4", 600], ["Authorize components", 2800], ["Auth file generation in Identity", 3000], ["5 min (do)", 2960]]),
          makeRow([["5", 600], ["Install Broker", 2800], ["Step-by-step Broker install", 3000], ["15 min (do)", 2960]]),
          makeRow([["6", 600], ["Install Workstation Agent", 2800], ["Step-by-step Agent install", 3000], ["15 min (do)", 2960]]),
          makeRow([["7", 600], ["Install DSA", 2800], ["Step-by-step DSA install", 3000], ["15 min (do)", 2960]]),
          makeRow([["8", 600], ["Connect your first license manager", 2800], ["Guided FlexNet tutorial", 3000], ["10 min (do)", 2960]]),
          makeRow([["9", 600], ["Verify your setup", 2800], ["Smoke test, first report link", 3000], ["5 min (do)", 2960]]),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),
      para("Total estimated time from landing to first report: 80\u201390 minutes, with clear progress markers at each step."),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== SECTION 6: SPLUNK STYLE ALIGNMENT =====
      heading1("6. Splunk style guide alignment notes"),
      para("The CLAUDE.md file references the Splunk style guide. The following principles from that guide are most relevant to the issues identified in this review:"),

      heading3("Topic types: concept, task, reference"),
      bullet("The current getting-started pages mix all three. The About page is a concept topic that should remain concept-only. The Quick Start Guide is a task topic that should contain only procedural steps. Architecture is a reference topic. Splitting by type improves scanability and reuse."),

      heading3("Task-oriented writing"),
      bullet("Every task topic should open with a brief statement of what the user will accomplish, followed by prerequisites, steps, and verification. The current Quick Start Guide partially follows this pattern but buries it under too much preamble."),

      heading3("User-focused language"),
      bullet("The Vale style rules in styles/OpenLM/UserFocus.yml and We.yml enforce user-focused language. Several getting-started pages use passive constructions (\u201cdata is collected\u201d) instead of direct instructions (\u201cthe Broker collects data from your license servers\u201d). A Vale pass would flag these."),

      heading3("Progressive disclosure"),
      bullet("Present the minimum information needed at each step. Link to deeper content rather than embedding it. The architecture diagrams and the Quick Suite registration flow violate this principle."),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== SECTION 7: IMPLEMENTATION ROADMAP =====
      heading1("7. Implementation roadmap"),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 1400, 1400, 2200, 1960],
        rows: [
          makeHeaderRow([["Action", 2400], ["Tier", 1400], ["Effort", 1400], ["Dependencies", 2200], ["Priority", 1960]]),
          makeRow([["Rewrite About page (R1)", 2400], ["Tier 1", 1400], ["2\u20133 days", 1400], ["None", 2200], ["P0 \u2014 Critical", 1960]]),
          makeRow([["Move Architecture (R2)", 2400], ["Tier 1", 1400], ["1 day", 1400], ["R1 for \u201cHow it works\u201d summary", 2200], ["P0 \u2014 Critical", 1960]]),
          makeRow([["Add next-step links (R3)", 2400], ["Tier 1", 1400], ["1 day", 1400], ["None", 2200], ["P0 \u2014 Critical", 1960]]),
          makeRow([["Add Verify page (R4)", 2400], ["Tier 1", 1400], ["2 days", 1400], ["SME input on verification steps", 2200], ["P1 \u2014 High", 1960]]),
          makeRow([["Surface Glossary (R5)", 2400], ["Tier 1", 1400], ["1 day", 1400], ["None", 2200], ["P1 \u2014 High", 1960]]),
          makeRow([["Split Quick Start Guide (R6)", 2400], ["Tier 2", 1400], ["5\u20137 days", 1400], ["R1, R2, R3", 2200], ["P1 \u2014 High", 1960]]),
          makeRow([["Relocate Connect LMs (R7)", 2400], ["Tier 2", 1400], ["2\u20133 days", 1400], ["R6; redirect config update", 2200], ["P1 \u2014 High", 1960]]),
          makeRow([["Consolidate install content (R8)", 2400], ["Tier 2", 1400], ["3\u20134 days", 1400], ["R6", 2200], ["P2 \u2014 Medium", 1960]]),
          makeRow([["Orientation diagram (R9)", 2400], ["Tier 2", 1400], ["1\u20132 days", 1400], ["R1", 2200], ["P2 \u2014 Medium", 1960]]),
          makeRow([["Role-based paths (R10)", 2400], ["Tier 3", 1400], ["2\u20133 weeks", 1400], ["R1, R6, R11", 2200], ["P2 \u2014 Medium", 1960]]),
          makeRow([["Sidebar restructure (R11)", 2400], ["Tier 3", 1400], ["1\u20132 weeks", 1400], ["R6, R7, R12", 2200], ["P2 \u2014 Medium", 1960]]),
          makeRow([["Platform Reference hub (R12)", 2400], ["Tier 3", 1400], ["3\u20135 days", 1400], ["R2", 2200], ["P2 \u2014 Medium", 1960]]),
          makeRow([["First LM tutorial (R13)", 2400], ["Tier 3", 1400], ["3\u20135 days", 1400], ["R6, R7; SME input", 2200], ["P1 \u2014 High", 1960]]),
          makeRow([["Resolve placeholders (R14)", 2400], ["Tier 3", 1400], ["Ongoing", 1400], ["SME input per page", 2200], ["P1 \u2014 High", 1960]]),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      new Paragraph({ children: [new PageBreak()] }),

      // ===== SECTION 8: SHAREPOINT & KNOWLEDGE GAPS =====
      heading1("8. Knowledge source gaps"),

      heading2("8.1 SharePoint findings"),
      para("A search of the OpenLM SharePoint sites (openlm.com and openlm) returned only OneNote notebooks and Teams Wiki pages in formats that cannot be read programmatically. No Word documents, PDFs, or structured content files were found related to architecture, onboarding, or platform documentation."),
      para("This means the Docusaurus repository is effectively the single source of truth for OpenLM Platform documentation. Any architectural knowledge, deployment runbooks, or onboarding procedures that exist only in OneNote or Teams channels should be surfaced and migrated into the doc set."),

      heading2("8.2 Recommendations for knowledge management"),
      bullet("Audit the OneNote notebooks on SharePoint for content that should be in the public docs."),
      bullet("Establish a content pipeline: internal knowledge (OneNote/Teams) \u2192 draft doc (branch) \u2192 reviewed doc (main)."),
      bullet("Consider tracking documentation tasks in Azure DevOps alongside development work, rather than in a Markdown intern task list."),

      new Paragraph({ spacing: { after: 400 }, children: [] }),

      // ===== CLOSING =====
      heading1("9. Summary"),
      para("The OpenLM documentation has strong technical depth, a well-organized Docusaurus infrastructure, and useful interactive elements like Arcade embeds and Mermaid diagrams. The primary gaps are in information architecture and user journey design: new users encounter too much complexity too early, miss critical setup steps due to poor cross-linking, and get lost in a connector catalog that belongs elsewhere."),
      para("The 14 recommendations in this review address these gaps at three levels of effort. The Tier 1 quick wins (rewriting the About page, relocating Architecture, adding next-step links, and creating a verification page) can be completed within two weeks and will materially improve the first-time user experience. The Tier 2 structural refactors and Tier 3 IA enhancements build on that foundation to create a documentation set that scales with the product."),

    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/sessions/eager-hopeful-davinci/mnt/docs/openlm-docs-ia-review.docx", buffer);
  console.log("Document created successfully");
});
