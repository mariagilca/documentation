# Custom MDX and theme components

The components in this directory are the building blocks writers and theme code reach for. This README is the canonical inventory: what each component does, what props it takes, and where it's wired up today.

If you add a component, add it here too. If you remove a component, remove it here too. Drift is how we ended up with dead components in the tree.

---

## How to import

From an MDX page in `docs/`:

```mdx
import Checklist from '@site/src/components/Checklist';
import ChecklistItem from '@site/src/components/CheckListItem';
```

From a React file in `src/`:

```jsx
import HomepageHero from '@site/src/components/HomepageHero';
```

The `@site/` alias is configured by Docusaurus and resolves to the project root.

---

## Content components (use these in MDX)

These are designed to be used inside docs pages.

### `<ArcadeEmbed>`
**File:** `ArcadeEmbed/index.js`
**Purpose:** Embed an interactive Arcade demo with an accessible text alternative. Required for WCAG 1.2.1 (alternatives for time-based media).
**Props:**
- `src` (string, required) — Arcade share URL.
- `title` (string) — Caption rendered above the demo.
- `aspectRatio` (string, default `'16/9'`).
- `linkLabel` (string) — Override the "Open in new tab" link text.
- `steps` (string[]) — Step list rendered as the text alternative.
- `children` — Additional fallback content.

**Wired up in:** docs pages that embed product walkthroughs.

### `<Checklist>` + `<ChecklistItem>`
**Files:** `Checklist/index.js`, `CheckListItem/index.js`
**Purpose:** Verification checkpoints at the end of a procedure ("Confirm the Broker connected", "Confirm data appears in Reporting").
**Props (`Checklist`):** `children`.
**Props (`ChecklistItem`):** `title`, `children`.
**Used in:** Cloud getting-started pages (`install-broker.mdx`, `install-dsa.mdx`, etc.).

### `<DrawioArchitectureEmbed>`
**File:** `DrawioArchitectureEmbed/index.js`
**Purpose:** Embed a draw.io architecture diagram with zoom, pan, full-screen, and download. Use this for any architecture diagram that benefits from interaction; static SVGs are still fine for simple diagrams.
**Props:** none — the diagram source is internal to the component.
**Used in:** architecture pages.

### `<ReleaseNotesGenerator>`
**File:** `ReleaseNotesGenerator/index.js`
**Purpose:** Render changelog entries from `static/release-notes/<noteKey>.json`. The `llm-markdown` plugin reads the same JSON to produce LLM-friendly Markdown exports.
**Props:** `noteKey` (string, required) — basename of the JSON file in `static/release-notes/`.
**Used in:** every `docs/*/changelog/components/*.mdx` and `docs/legacy/changelog/*.mdx` page.

---

## Page components (used in `src/pages/`)

These render homepage and landing-page sections. Don't import them from MDX.

### `<HomepageHero>`
**File:** `HomepageHero/index.js`
**Purpose:** Landing-page hero, structured after the swift.org landing page (Apache-2.0 — attribution in file headers). Renders the mirrored canvas-2D swoop entrance with the docking OpenLM O-mark, title, subtitle, search pill, "Get started" CTA, and the quicklinks wayfinder; honors `prefers-reduced-motion`.
**Related files:** `HomepageHero/heroAnimation.js` (animejs entrance timeline), `HomepageHero/scrollSwoops.js` (section seam-swoop reveal + parallax, also used by `src/pages/index.js`), `HomepageHero/index.module.css`, re-tinted artwork in `static/img/homepage/` (see its `NOTICE.md`).
**Wired up in:** `src/pages/index.js`.

### `<HomepageDemo>`
**File:** `HomepageDemo/index.js`
**Purpose:** Embedded product demo section on the homepage.
**Wired up in:** `src/pages/index.js`.

### `<HomepageSupported>`
**File:** `HomepageSupported/index.js`
**Purpose:** "Supported software" grid on the homepage. Pulls icons and titles from `src/static/supported-software.json`.
**Wired up in:** `src/pages/index.js`.

### `<DeploymentCards>`
**File:** `DeploymentCards/index.js`
**Purpose:** Side-by-side comparison of OpenLM Platform and on-premise deployment paths on the homepage (a single split glass panel plus the Version 25 legacy pill).
**Wired up in:** `src/pages/index.js`.

### `<DownloadCard>`
**File:** `DownloadCard/index.js`
**Purpose:** Card for a downloadable installer with version, supported OS tags, and a dropdown when multiple links exist.
**Props:** `title`, `version`, `description`, `supportedOSVersions`, `downloadLinks`, `learnMoreLink`, `image`.
**Wired up in:** `src/pages/_downloads.js`.

### `<InstallationInstructions>`
**File:** `InstallationInstructions/index.js`
**Purpose:** Static "how to install" panel shown alongside `<DownloadCard>` on the downloads page.
**Wired up in:** `src/pages/_downloads.js`.

### `<SoftwareCard>`
**File:** `SoftwareCard/index.js`
**Purpose:** Compact card linking to a supported-software docs page. Used on the `/supported-software/` index.
**Props:** `title`, `learnMoreLink`, `icon`.
**Wired up in:** `src/pages/supported-software.js`.

---

## Theme-injected components (rendered by swizzles)

These are injected by code under `src/theme/`. Don't import them from MDX — the swizzle decides where they appear.

### `<CategoryListItem>`
**File:** `CategoryListItem/index.tsx`
**Purpose:** Row layout for a documentation category on a generated-index landing page (the `/cloud/category/*` URLs). Shows label, description, article count, and copy-link button.
**Wired up in:** `src/theme/DocCategoryGeneratedIndexPage/index.tsx`.

### `<DocListItem>`
**File:** `DocListItem/index.tsx`
**Purpose:** Row layout for a documentation link on a generated-index landing page. Shows reading time and last-updated metadata next to the link.
**Wired up in:** `src/theme/DocCategoryGeneratedIndexPage/index.tsx`.

### `<CopyPageButton>`
**File:** `CopyPageButton/index.js`
**Purpose:** Page-header button that copies the current page as Markdown or sends it to ChatGPT / Claude. Part of the LLM-era affordances.
**Wired up in:** `src/theme/DocItem/Content/index.tsx`.

### `<FocusModeToggle>`
**File:** `FocusModeToggle/index.tsx`
**Purpose:** Toggle that hides the sidebar and TOC for distraction-free reading. Backed by a React context provider.
**Wired up in:** `src/theme/DocItem/Layout/index.tsx`, `src/theme/BlogLayout/index.tsx`.

### `<ImageZoom>`
**File:** `ImageZoom/index.tsx`
**Purpose:** Click-to-zoom for every markdown image (Mintlify-style). Renders the standard lazy-loading `<img>` with no wrapper element, and on click/Enter opens a FLIP-animated lightbox portaled to `<body>` over a plain opaque canvas in the page background color (no dimming, no chrome). Escape, any click, or scrolling dismisses it. Skips inline icons (natural size ≤96px), `data:image/svg+xml` placeholders, broken images, and images inside links.
**Props:** standard `<img>` props plus `noZoom` (boolean). The usual opt-out is writing a literal JSX `<img>` tag, which bypasses the mapping entirely; `noZoom` exists for the rare case where you import `ImageZoom` explicitly in MDX (the one sanctioned exception to this section's "don't import" rule) and want the standard rendering without the zoom behavior.
**Wired up in:** `src/theme/MDXComponents.js` (mapped over the markdown `img` element).

### `<SearchInstanceFilter>`
**File:** `SearchInstanceFilter/index.tsx`
**Purpose:** Filter that scopes Algolia search to Cloud, Legacy, or both. State is shared via `src/context/searchInstanceFilters.tsx`.
**Wired up in:** `src/theme/SearchBar/`, `src/theme/SearchPage/`, `src/theme/Root/index.tsx`.

---

## Dead or partially-wired components

These need a decision: complete the wiring, or remove. Flagged here to prevent assumptions about reach.

### `<CategoryPreviewCard>`
**File:** `CategoryPreviewCard/index.tsx`
**Status:** Defined but unreferenced anywhere outside its own file.
**Action:** Remove, or use in place of `<CategoryListItem>` on certain category landing pages.

### `<DocLinkCard>`
**File:** `DocLinkCard/index.tsx`
**Status:** Defined but unreferenced anywhere outside its own file. The README in `STYLE_GUIDE.md` references it as if it's available for "see also" sections — it isn't yet.
**Action:** Wire it in, or remove and update the style guide.

### `<CustomModal>`
**File:** `CustomModal/index.js`
**Status:** Defined but unreferenced. Probably superseded by Docusaurus's own modal primitives or by the `<CopyPageButton>` hint dialog.
**Action:** Remove unless a planned feature needs it.

---

## Where things live

| Concern | Location |
| --- | --- |
| Component implementations | `src/components/<Name>/` |
| Styles | `src/components/<Name>/styles.module.css` or `index.module.css` |
| Page-level imports | `src/pages/` |
| Theme swizzles | `src/theme/` |
| Shared React context | `src/context/` |
| Static JSON / images | `src/static/`, `static/` |

A component should own its CSS module. Don't reach into another component's styles — extract to `src/css/custom.css` or `src/css/<theme>.css` if a token is genuinely shared.

---

## Adding a new component

1. Create the directory: `src/components/MyComponent/`.
2. Add `index.js` (or `.tsx` if you need types). Default-export the component.
3. Add `index.module.css` if it has styles.
4. If it's an MDX component, document props at the top with a JSDoc block.
5. If it's a theme-injected component, also create the swizzle that uses it under `src/theme/`.
6. **Add an entry to this README** — what it does, props, where it's wired.
7. Run `npm run build` to make sure the production build picks it up.

---

*Inventory last updated 2026-05-12 from a read of every `index.{js,jsx,tsx}` under `src/components/` and a usage scan across `docs/`, `src/pages/`, and `src/theme/`. Re-verify when components are added or removed.*
