export const meta = {
  name: 'docs-design-audit',
  description: 'Senior UI/UX design audit of the OpenLM docs site across 11 dimensions with adversarial verification',
  phases: [
    { title: 'Audit', detail: '11 parallel dimension reviewers' },
    { title: 'Verify', detail: 'adversarial skeptic per medium/high finding' },
    { title: 'Gaps', detail: 'completeness critic + gap finders' },
  ],
}

const FINDINGS_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Short, specific finding title' },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          evidence: { type: 'string', description: 'Concrete evidence: file path + line numbers, and/or screenshot filename with what is visible in it' },
          description: { type: 'string', description: 'What the problem or missed opportunity is, from a user experience perspective' },
          recommendation: { type: 'string', description: 'Concrete, Docusaurus-feasible improvement' },
          effort: { type: 'string', enum: ['S', 'M', 'L'], description: 'S=hours, M=days, L=week+' },
        },
        required: ['title', 'severity', 'evidence', 'description', 'recommendation', 'effort'],
      },
    },
    dimensionSummary: { type: 'string', description: '2-3 sentence overall assessment of this dimension: what works well, what the biggest gap is' },
    strengths: { type: 'array', items: { type: 'string' }, description: 'Things this site does well in this dimension - be specific' },
  },
  required: ['findings', 'dimensionSummary', 'strengths'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    isReal: { type: 'boolean', description: 'The evidence actually supports the finding (you re-checked the file/screenshot)' },
    conflictsWithIntent: { type: 'boolean', description: 'True if this "issue" is actually a documented intentional design decision' },
    isWorthDoing: { type: 'boolean', description: 'A senior designer would consider this a meaningful improvement, not a nitpick or taste call' },
    adjustedSeverity: { type: 'string', enum: ['high', 'medium', 'low'] },
    notes: { type: 'string', description: 'One or two sentences: what you checked and why you ruled this way' },
  },
  required: ['isReal', 'conflictsWithIntent', 'isWorthDoing', 'adjustedSeverity', 'notes'],
}

const GAPS_SCHEMA = {
  type: 'object',
  properties: {
    gaps: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label: { type: 'string' },
          prompt: { type: 'string', description: 'A complete self-contained finder prompt for this uncovered area' },
        },
        required: ['label', 'prompt'],
      },
    },
  },
  required: ['gaps'],
}

const CONTEXT = `
You are a senior UI/UX designer and researcher auditing the OpenLM documentation site
(Docusaurus 3, deployed at https://openlm.com/documentation/). Repo: /Users/anamariagilca/projects/docs

RESOURCES AVAILABLE TO YOU:
- A static build of the site is being served RIGHT NOW at http://localhost:3017/documentation/ (do NOT kill this server; do NOT run npm run build/start).
- Pre-captured screenshots in /tmp/design-audit-shots/ (Read them as images):
  home-desktop.png, home-desktop-full.png (full landing page), home-mobile.png, home-mobile-full.png,
  home-dark.png, doc-cloud-architecture.png, doc-cloud-install-broker.png, doc-dark.png, doc-mobile.png,
  tablet-doc.png (834px), category-index.png, release-notes.png, release-notes-mobile.png, release-notes-dark.png,
  supported-software.png, legacy-intro.png, search-page.png, ja-home.png, changelog.png
- You can capture MORE screenshots of any page yourself:
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=9000 --window-size=W,H [--force-dark-mode] --screenshot=/tmp/design-audit-shots/<name>.png "http://localhost:3017/documentation/<path>"
  Then Read the png. Use this whenever a claim needs visual confirmation.
- You can curl pages for rendered HTML: curl -s http://localhost:3017/documentation/<path>
- Key code: docusaurus.config.js, sidebars-cloud.js, src/css/custom.css, src/theme/ (13 swizzled components), src/components/ (27 custom components), src/pages/ (custom pages).

INTENTIONAL DESIGN DECISIONS — do NOT report these as findings (they are settled):
- /release-notes: latest release teaser rendering expanded/open by default is INTENDED. Dual data sources for EN and JA release notes are INTENDED. Copy on that page is factual-only by policy.
- Tags: closed controlled vocabulary in docs/cloud/tags.yml; legacy doc tags are frozen.
- Blog is intentionally disabled. baseUrl /documentation/ is fixed. Hero fluid simulation (vanilla WebGL with reduced-motion + capability fallback) is intentional — refinements welcome, wholesale replacement proposals are out of scope.
- Announcement bar is date-gated by design (30-day window per release).

AUDIENCE: license administrators, IT ops, and engineers at enterprises managing software licenses (OpenLM Platform = cloud product; "Version 25"/legacy = on-prem). Both new evaluators and daily operators use this site.

QUALITY BAR for findings:
- Every finding needs concrete evidence (file:line and/or a screenshot you actually looked at).
- Recommendations must be feasible inside Docusaurus 3 theming/swizzling — no "rebuild in Next.js".
- Separate real UX problems and high-leverage opportunities from taste. A handful of sharp findings beats twenty vague ones, but DO be thorough within your dimension — sweep all relevant files and screenshots before concluding.
- Your final structured output is data for synthesis, not prose for a human.
`

const DIMENSIONS = [
  {
    key: 'visual-system',
    prompt: `${CONTEXT}
YOUR DIMENSION: Visual design system & brand foundation.
Audit: typography scale and hierarchy, color tokens, spacing rhythm, border-radius/shadow/elevation language, font loading and families, consistency of the visual language between Docusaurus defaults and the 27 custom components / 13 swizzled theme components.
Read src/css/custom.css fully (it is the design-token source of truth), check the fonts in static/fonts + how they're declared, then sample component CSS modules (src/components/*/index.module.css, src/pages/*.module.css, src/theme/*/styles.module.css) to assess whether tokens are reused or values are hardcoded/drifting (grep for raw hex colors, px font sizes, one-off border-radius values across module.css files and quantify the drift).
Look at home-desktop-full.png, doc-cloud-architecture.png, release-notes.png, supported-software.png side by side: does this read as ONE designed product or several eras stitched together? Assess the brand expression: is there a distinctive identity beyond default Infima, and where does it break down?`,
  },
  {
    key: 'homepage',
    prompt: `${CONTEXT}
YOUR DIMENSION: Homepage / landing experience.
Read src/pages/index.js + index.module.css and every component it composes (src/components/HomepageHeader, HomepageAtlas, HomepageDemo, HomepageSupported, and anything else mounted). Study home-desktop.png, home-desktop-full.png (the whole page), home-mobile-full.png, home-dark.png.
Evaluate as a conversion/orientation surface: Within 5 seconds, does a new evaluator know what product this documents and where to start? Is the visual hierarchy guiding to the right first click (two distinct products: Platform vs legacy Version 25 — is that fork clear?)? Assess each section's earn-its-place value, scroll depth vs payoff, CTA clarity and wording, the search-box prominence vs navbar search duplication, the "Subscribe to release updates" placement, hero copy quality, and whether the page communicates trust/scale (logos, numbers, freshness signals). Check what the hero looks like when WebGL is unavailable (read the fallback code path in FluidCanvas.js / fluid.js).`,
  },
  {
    key: 'ia-navigation',
    prompt: `${CONTEXT}
YOUR DIMENSION: Information architecture & navigation.
Read docusaurus.config.js (navbar, footer, doc plugin routing), sidebars-cloud.js fully (the curated cloud sidebar), and skim docs/cloud/ + docs/legacy/ directory structures. Study home-desktop-full.png (footer included), doc-cloud-architecture.png, legacy-intro.png, category-index.png, and capture any additional screenshots you need (e.g. a deep sidebar section, the navbar dropdowns — note headless screenshots can't open dropdowns, so read the config for dropdown contents instead).
Evaluate: Is the two-product split (Platform at /cloud vs "Version 25" at /legacy) legible in the navbar labeling and switchable without getting lost? Sidebar: depth, grouping quality, label clarity, user-journey ordering, orphan/duplicate entries vs disk. Breadcrumbs quality. Footer: link taxonomy, dead weight, missed wayfinding. Category index pages (DocCategoryGeneratedIndexPage + CategoryPreviewCard/CategoryListItem): do they help or are they filler? Cross-linking between doc sets. URL/route hygiene visible to users.`,
  },
  {
    key: 'reading-ux',
    prompt: `${CONTEXT}
YOUR DIMENSION: Document reading experience (the core product surface).
Read src/theme/DocItem (all subfolders — layout, footer, metadata, etc.), src/theme/DocRoot, src/theme/Admonition, src/plugins/reading-time and last-updated, and reading-affordance components: CopyPageButton, FocusModeToggle, Reveal, Checklist/CheckListItem, DocLinkCard, InstallationInstructions, ArcadeEmbed, DrawioArchitectureEmbed. Study doc-cloud-architecture.png, doc-cloud-install-broker.png, doc-mobile.png, doc-dark.png, tablet-doc.png, legacy-intro.png; capture more doc pages if needed (e.g. a long reference page, a page with code blocks, a page with tabs).
Evaluate: line length/measure, content typography (headings, body, code, tables, admonitions), the metadata row (reading time, last-updated) value & placement, the action-button row (Copy page, Release updates, Focus mode — note on doc-mobile.png these pills overflow horizontally; investigate), TOC behavior on desktop & mobile ("On this page"), pagination footer, image/diagram presentation, content density and scannability. Where does the reading experience fall short of best-in-class docs (Stripe, Vercel, Tailwind) in ways fixable within Docusaurus?`,
  },
  {
    key: 'search',
    prompt: `${CONTEXT}
YOUR DIMENSION: Search & findability.
Read src/theme/SearchBar, src/theme/SearchPage, the algolia block in docusaurus.config.js, and src/components/SearchInstanceFilter. Study search-page.png and capture more: the search page with a query that has many results, with zero results, and the navbar DocSearch modal cannot be opened headlessly so audit its config instead.
Evaluate: search affordance prominence for a docs site (where do users expect it, what do they get), the dedicated /search page experience (filtering by doc set/version/language, result quality presentation, empty states), DocSearch modal configuration (contextual search per locale/version?), whether searching from the homepage hero box and from the navbar give consistent experiences, llms.txt / llms-full.txt existence as an AI-findability surface, and opensearch.xml. Also assess findability beyond search: tag pages (closed vocabulary is intentional - audit their PRESENTATION not their policy), the glossary, the service-index.`,
  },
  {
    key: 'responsive',
    prompt: `${CONTEXT}
YOUR DIMENSION: Responsive & mobile experience.
Study home-mobile.png, home-mobile-full.png, doc-mobile.png (note: the action pill row visibly overflows the viewport — investigate root cause in code), release-notes-mobile.png, tablet-doc.png. Capture additional widths where you suspect breakpoints crack: 320px (small phones), 768px, 996px (Docusaurus's navbar breakpoint), 1280px — for the homepage, a doc page, release-notes, and supported-software.
Read the media queries: grep for '@media' across src/css/custom.css, src/pages/*.module.css, src/components/*/index.module.css, src/theme/*/styles.module.css and assess breakpoint strategy coherence. Evaluate: touch target sizes, horizontal overflow/scrolling, table handling on small screens, navbar collapse behavior config, font-size scaling, hero on mobile (payoff vs scroll cost), and whether interactive components (Checklist, Reveal, modals, SubscribeWidget) adapt.`,
  },
  {
    key: 'dark-mode',
    prompt: `${CONTEXT}
YOUR DIMENSION: Dark mode & theming consistency.
Study home-dark.png, doc-dark.png, release-notes-dark.png against their light counterparts. Capture dark variants of more surfaces yourself (--force-dark-mode flag): supported-software, changelog, category index, search page, legacy doc, ja home.
In code: read the [data-theme='dark'] sections of src/css/custom.css, then grep ALL component/page/theme CSS modules for hardcoded colors lacking dark variants (raw hex, rgb(), white/black keywords) and for [data-theme='dark'] coverage. Audit images/diagrams: do PNG diagrams in docs have dark variants or do they glare? (check a few content pages with images in dark). Evaluate elevation/shadow strategy in dark, brand color legibility on dark surfaces, admonition palettes, code block theme pairing, the announcement bar in dark, and any flash-of-wrong-theme risk in swizzled Root/Layout.`,
  },
  {
    key: 'a11y',
    prompt: `${CONTEXT}
YOUR DIMENSION: Accessibility as experienced design quality.
Read scripts/check-a11y-*.py (what they enforce + their known-issues/exception lists — those lists ARE a findings goldmine), the axe step in azure-pipelines.yml, then audit the custom components' markup: src/components (CustomModal, Reveal, Checklist, SubscribeWidget, FocusModeToggle, CopyPageButton, SearchInstanceFilter, ReleaseTimeline) and swizzled src/theme components for: focus management, keyboard operability, aria usage correctness, semantic structure.
From the rendered side: curl pages and inspect heading hierarchy, landmark structure, link text quality ("click here"?), alt text patterns in docs content (sample 15-20 content files for alt text quality), color-contrast risks from custom.css token values (compute contrast ratios for key fg/bg pairs in BOTH themes, including the announcement bar and hero text over the gradient). Check reduced-motion handling beyond the hero. Severity = real user impact, not checkbox compliance.`,
  },
  {
    key: 'custom-pages',
    prompt: `${CONTEXT}
YOUR DIMENSION: Custom non-doc pages — the site's "product surfaces".
Pages: src/pages/release-notes.js (+module.css), supported-software.js, subscribe/ flow pages, privacy-policy.js, the changelog routes (build/changelog — find their source), and components they use: ReleaseNotesGenerator, ReleaseTimeline, SubscribeButton, SubscribeWidget, SoftwareCard, DownloadCard, DeploymentCard(s). Study release-notes.png, release-notes-mobile.png, release-notes-dark.png, supported-software.png, changelog.png; capture subscribe flow pages and any state you can reach.
REMEMBER the settled decisions: release-notes teaser open-by-default, dual EN/JA sources, factual-only copy — audit AROUND those, not against them. Evaluate: release-notes page scannability (filtering, grouping, date presentation, visual rhythm of entries), supported-software table/card UX (scanning 100+ items? filtering? sorting?), subscribe flow end-to-end coherence (entry points, confirmation states, unsubscribe tone), changelog presentation vs release-notes (two surfaces - is their relationship clear to users?), empty/error states, and whether these pages feel designed to the same standard as the docs.`,
  },
  {
    key: 'i18n-ja',
    prompt: `${CONTEXT}
YOUR DIMENSION: Internationalization & the Japanese experience.
Study ja-home.png vs home-desktop.png. Capture more JA pages: a JA doc page (e.g. /documentation/ja/cloud/getting-started/architecture), JA release-notes, JA search page, JA supported-software — and their mobile variants if suspicious.
Read the i18n config in docusaurus.config.js, skim i18n/ja/ structure (what's translated vs falling back to English), check how the locale dropdown is configured/labeled, and how custom components handle JA (do HomepageHeader/ReleaseNotesGenerator/SubscribeWidget/CopyPageButton render translated strings or hardcoded English? grep for translate()/<Translate> usage vs raw strings in src/).
Evaluate: mixed-language pages (EN content with JA chrome or vice versa) and how gracefully fallback is signaled, JA typography (line-height, font stack for CJK, bold rendering, line-breaking of long English tokens in JA text), date/number localization on release surfaces, search experience in JA (locale-contextual?), and whether a JA-only user can complete the core journeys (orient → find doc → subscribe → download).`,
  },
  {
    key: 'perf-polish',
    prompt: `${CONTEXT}
YOUR DIMENSION: Performance & polish as experienced UX (perceived speed, stability, craft).
Audit from the build + code, plus timing measurements against http://localhost:3017 (it's a static server — measure asset sizes and counts, not server latency claims): page weight of homepage vs a doc page (curl + count/sum assets), font loading strategy (font-display, preload, subsetting; static/fonts), image hygiene in static/img and docs (oversized PNGs? missing dimensions causing CLS? lazy loading?), the fluid sim's cost on the homepage (read fluid.js: does it pause when offscreen/tab-hidden? DPR capping? Note: reduced-motion/capability fallback exists and the sim itself is settled — audit its EFFICIENCY), layout shift risks (announcement bar injection, font swap, late-mounting components like SubscribeWidget/reading-time row), scroll performance hazards (heavy shadows/filters/backdrop-blur in CSS), and @docusaurus/faster adoption. Quantify what you can (KB, counts, dimensions). Findings must tie to USER-PERCEIVED quality, not lab scores.`,
  },
]

const settled = `SETTLED DECISIONS (a finding that contradicts these is conflictsWithIntent=true):
- /release-notes teaser open-by-default; dual EN/JA release-notes data sources; factual-only copy there.
- Closed tag vocabulary; frozen legacy tags. Blog disabled. baseUrl fixed. Date-gated announcement bar (30d).
- Hero = vanilla-WebGL fluid sim with reduced-motion/capability fallback (refine yes, replace no).`

const results = await pipeline(
  DIMENSIONS,
  d => agent(d.prompt, { label: `audit:${d.key}`, phase: 'Audit', schema: FINDINGS_SCHEMA }),
  async (review, d) => {
    if (!review) return null
    const toVerify = review.findings.filter(f => f.severity !== 'low')
    const verified = await parallel(toVerify.map(f => () =>
      agent(`You are a skeptical design-review verifier for the OpenLM docs site (Docusaurus 3, repo /Users/anamariagilca/projects/docs, served at http://localhost:3017/documentation/, screenshots in /tmp/design-audit-shots/ — you may capture new ones with: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=9000 --window-size=W,H --screenshot=/tmp/design-audit-shots/<name>.png "URL"; do not kill the server).

${settled}

A reviewer auditing "${d.key}" claims:
TITLE: ${f.title}
SEVERITY: ${f.severity}
EVIDENCE: ${f.evidence}
DESCRIPTION: ${f.description}
RECOMMENDATION: ${f.recommendation}

Your job: try to REFUTE it. Re-check the cited evidence yourself (open the file, look at the screenshot, curl the page). Check CLAUDE.md / CONTRIBUTING.md / project-guides/ for signs it is intentional. Ask: would fixing this meaningfully improve the experience for license admins using these docs, or is it taste/nitpick? Is the recommendation actually feasible in Docusaurus 3? If evidence doesn't hold or it's intentional or it's a nitpick, rule against it. Default skeptical.`,
        { label: `verify:${f.title.slice(0, 40)}`, phase: 'Verify', schema: VERDICT_SCHEMA })
        .then(v => ({ ...f, verdict: v }))
    ))
    const lows = review.findings.filter(f => f.severity === 'low').map(f => ({ ...f, verdict: null }))
    return { dimension: d.key, summary: review.dimensionSummary, strengths: review.strengths, findings: [...verified.filter(Boolean), ...lows] }
  }
)

const clean = results.filter(Boolean)
const confirmed = clean.flatMap(r => r.findings.filter(f =>
  f.verdict ? (f.verdict.isReal && f.verdict.isWorthDoing && !f.verdict.conflictsWithIntent) : true
).map(f => ({ ...f, dimension: r.dimension })))
const rejected = clean.flatMap(r => r.findings.filter(f =>
  f.verdict && !(f.verdict.isReal && f.verdict.isWorthDoing && !f.verdict.conflictsWithIntent)
).map(f => ({ title: f.title, dimension: r.dimension, why: f.verdict.notes })))

log(`Confirmed ${confirmed.length} findings, rejected ${rejected.length} after adversarial verification`)

phase('Gaps')
const critic = await agent(`${CONTEXT}
You are the completeness critic for a finished multi-dimension design audit of this site. Dimensions covered: ${DIMENSIONS.map(d => d.key).join(', ')}.
Confirmed finding titles so far:
${confirmed.map(f => `- [${f.dimension}] ${f.title}`).join('\n')}

Identify AT MOST 3 genuinely uncovered, high-value areas of the user experience this audit missed (e.g. a page type nobody screenshotted, an interaction state nobody tested, a user journey nobody walked end-to-end like "evaluator arrives from Google → finds install guide → downloads component"). Skim the site/build/code briefly to ground your gaps in reality. For each, write a complete self-contained finder prompt (it must include the resources block: server URL, screenshot dir, Chrome command, repo path, and the settled-decisions list). If coverage is genuinely complete, return zero gaps.`,
  { label: 'completeness-critic', schema: GAPS_SCHEMA })

let gapFindings = []
if (critic && critic.gaps.length) {
  log(`Critic found ${critic.gaps.length} coverage gaps: ${critic.gaps.map(g => g.label).join('; ')}`)
  const gapResults = await parallel(critic.gaps.slice(0, 3).map(g => () =>
    agent(`${g.prompt}\n\nReturn findings with the same quality bar: concrete evidence, Docusaurus-feasible recommendations.`,
      { label: `gap:${g.label.slice(0, 30)}`, phase: 'Gaps', schema: FINDINGS_SCHEMA })))
  gapFindings = gapResults.filter(Boolean).flatMap(r => r.findings.map(f => ({ ...f, dimension: 'gap', verdict: null })))
}

return {
  dimensions: clean.map(r => ({ dimension: r.dimension, summary: r.summary, strengths: r.strengths })),
  confirmed,
  gapFindings,
  rejected,
}