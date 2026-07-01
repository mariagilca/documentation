# AI product disambiguation strategy

How to stop AI assistants (ChatGPT, Claude, Gemini, Perplexity, and AI Overviews) from blending **OpenLM Platform** and **OpenLM Version 25 / v26 (legacy)** into a single, mixed-up product when they answer questions about OpenLM.

This is an information-architecture and machine-discoverability problem, not a content-accuracy problem. The docs are already correct per product. The goal is to make the *distinction* survive crawling, retrieval, and training.

## The short version

You already have strong disambiguation for one channel (`llms.txt`), but that channel is the one the public models mostly ignore. The channels that actually feed those models — crawled HTML, live search snippets, and structured data — carry weaker signals or none. Close three gaps, in this order:

1. Add schema.org structured data that declares two distinct products (highest leverage).
2. Stamp the product signal on Platform pages too, not only legacy (the signal is currently asymmetric).
3. Add a subtle, visible cross-product notice on doc pages (helps readers and crawlers).

The Open Knowledge Format link is not the tool for this. Reasoning is in [On the Open Knowledge Format](#on-the-open-knowledge-format).

## What already works — keep it

The repo has more machinery here than most docs sites. Credit where due, so nobody rips it out:

- **`llms.txt` and `llms-full.txt`** are generated at build time by `src/plugins/llm-markdown/index.js`. The `buildLlmsPreamble()` function is a genuinely good disambiguation brief: it states the two product lines are distinct, maps former names (OpenLM Cloud, Annapurna) to Platform, lists component-compatibility rules, and flags version-specific tells (EasyAdmin, End-User Services, and Software License Management Cloud all mean legacy).
- **Per-page Markdown twins** carry a `product:` frontmatter field, and legacy pages get a one-line body note ("This page documents the legacy product, not OpenLM Platform") written specifically to survive retrieval-augmented-generation (RAG) chunking.
- **Legacy HTML pages** emit `<meta name="doc-product">`, `<meta name="doc-version" content="v25-legacy">`, and a `Version 25:` `<title>` prefix, from `src/theme/DocItem/Layout/index.tsx`.

None of this should change. It is cheap, correct, and useful — IDE agents, Model Context Protocol servers, and in-product assistants do read `llms.txt`, even though the big crawlers don't.

## Why AI still conflates them

Two reasons, one structural and one about the channel.

**The public models don't read your best signal.** A 300,000-domain study puts `llms.txt` adoption near 10%, but the answer engines effectively don't consume it. Google confirmed in July 2025 that it doesn't support `llms.txt` and compared it to the obsolete keywords meta tag. Server logs show GPTBot fetches it occasionally; ClaudeBot, Google-Extended, and PerplexityBot effectively don't. So your carefully written preamble reaches developer tools, not the assistants that are giving people mixed answers about OpenLM.

**What those models actually use** is crawled HTML (which becomes training data), live search snippets, and structured data. Measured against those three channels, the current setup has gaps:

- The visible HTML a crawler reads carries no product statement. The legacy body note exists only in the `.md` twin, and the `doc-product` meta is machine-only and legacy-only.
- There is almost no structured data. The only JSON-LD in the repo is a single `TechArticle` node on the release-notes page (`src/pages/release-notes.js`). Nothing declares the *products* themselves — no `SoftwareApplication` entity, no `sameAs`, no site-wide entity graph — so no machine-readable statement anywhere says two distinct OpenLM products exist.
- The product signal is asymmetric. Legacy pages are stamped; Platform (`/cloud/`) pages are not. An unstamped page is ambiguous by default, so a model reading a single Platform page in isolation has nothing telling it *which* OpenLM it is looking at.

Set expectations on timing: structured data and HTML signals change **retrieval-based** answers within weeks, as pages are re-crawled. They change **training-based** answers only when a model is next retrained, which is months out and outside your control. This work improves every future answer; it does not reach into weights that are already baked.

## Recommended fixes, prioritized

| # | Fix | Channel it repairs | Effort | Leverage |
|---|-----|--------------------|--------|----------|
| 1 | schema.org `SoftwareApplication` entities | Structured data, search, AI answers | Low–Medium | Highest |
| 2 | Symmetric `doc-product` meta on Platform pages | Crawled HTML | Low | High |
| 3 | Subtle visible cross-product notice | HTML + reader experience | Medium | Medium–High |
| 4 | Naming discipline + description coverage | All channels | Ongoing | Compounding |

### Fix 1 — Declare two products with structured data

This is the single highest-leverage change. Structured data is the primary machine-readable signal AI answer engines use to decide which entity a page is about, and the `sameAs` property is the standard mechanism for entity disambiguation — the same tool that separates "Paris, France" from "Paris, Texas."

Declare **two distinct `SoftwareApplication` entities** with stable identifiers, distinct names, alias lists, and cross-links to authoritative URLs. Inject them once site-wide through `headTags` in `docusaurus.config.js` (no swizzle required):

```js
// docusaurus.config.js → headTags
{
  tagName: 'script',
  attributes: { type: 'application/ld+json' },
  innerHTML: JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://openlm.com/#organization',
        name: 'OpenLM',
        url: 'https://openlm.com/',
        sameAs: [ /* real, authoritative URLs only: LinkedIn, Wikidata, G2, Capterra */ ]
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://openlm.com/#platform',
        name: 'OpenLM Platform',
        alternateName: ['OpenLM Cloud'],          // Annapurna is internal; omit publicly
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web-based, Kubernetes',
        softwareVersion: 'current',
        url: 'https://openlm.com/documentation/cloud',
        description:
          'Current-generation OpenLM engineering-license monitoring and ' +
          'optimization platform, delivered as Kubernetes microservices. ' +
          'Distinct from OpenLM Version 25 (legacy).',
        publisher: { '@id': 'https://openlm.com/#organization' }
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://openlm.com/#version25',
        name: 'OpenLM Version 25',
        alternateName: ['OpenLM v25', 'OpenLM v26', 'OpenLM Legacy'],
        applicationCategory: 'BusinessApplication',
        softwareVersion: '25, 26',
        url: 'https://openlm.com/documentation/legacy',
        description:
          'Legacy generation of OpenLM (releases v25 and v26), fully ' +
          'supported through 2027. Distinct from the current OpenLM Platform.',
        publisher: { '@id': 'https://openlm.com/#organization' }
      }
    ]
  })
}
```

This extends an established pattern rather than introducing a new one: the repo already emits JSON-LD once, a `TechArticle` on the release-notes page (`src/pages/release-notes.js`). Give that node's `Organization` the same `@id` (`https://openlm.com/#organization`) so both feed one consistent entity graph. (Its `headline` and `datePublished` are hardcoded to the Broad Peak release and drift over time — worth fixing while you're there, but separate from this task.)

Why this shape works:

- Two separate `@type: SoftwareApplication` nodes with distinct `@id` values tell a crawler these are two entities, not one with two version numbers.
- `alternateName` teaches the alias mapping directly in machine-readable form: "OpenLM Cloud" resolves to Platform, so the alias stops leaking onto legacy pages.
- `description` restates the distinction in prose, because AI summaries often quote the description verbatim.
- `sameAs` is where disambiguation gets its authority. Populate it only with URLs that actually exist and that you control or that are authoritative (your own product pages, LinkedIn, and any Wikidata, G2, or Capterra entries). Do not invent targets — a broken or wrong `sameAs` weakens the signal.

Optional enhancement: add a per-page `TechArticle` node (via the swizzled `DocItem/Layout`) whose `isPartOf` points at the correct product `@id`. That scopes every individual doc to its product. Start with the two site-wide entities; they deliver most of the benefit.

### Fix 2 — Make the product signal symmetric

Today `src/theme/DocItem/Layout/index.tsx` stamps `doc-product` and `doc-version` only when `activePlugin?.pluginId === 'legacy'`. Add the mirror branch so Platform pages assert their identity instead of leaving it implied:

```tsx
// Platform (/cloud/) pages
<meta name="doc-product" content="OpenLM Platform" />
<meta name="doc-version" content="platform-current" />
```

An explicitly stamped page can never be read as ambiguous. This is a few lines next to logic that already exists.

### Fix 3 — Add a subtle visible cross-product notice

Per your choice, pair the machine signals with a light visible notice. `DocItem/Layout` already knows `isLegacy` from `activePlugin`, so a small component can render:

- On legacy pages: a slim banner — "You're reading OpenLM Version 25 (legacy) docs. For the current product, see [OpenLM Platform](/documentation/cloud)." Keep it quiet; legacy is in maintenance mode and shouldn't feel alarming.
- On Platform pages: an even lighter note only where confusion is likely (for example, on shared-component pages such as Broker), linking back to the Version 25 equivalent.

This earns its place twice. Readers who land on the wrong product from a search engine self-correct, and the visible anchor text ("OpenLM Platform," "OpenLM Version 25") is crawlable, so it reinforces the two-entity distinction in exactly the HTML the models train on.

### Fix 4 — Naming discipline and description coverage

Entity resolution only holds if the names are stable everywhere. The config already notes the product "previously surfaced under four different names." Two ongoing habits protect the gains from fixes 1–3:

- **One canonical name per product**, used identically across docs, the marketing site, and the structured data: "OpenLM Platform" and "OpenLM Version 25." Every extra synonym in the wild is a chance for a model to re-merge the entities. A Vale rule (`npm run vale`) can flag drift such as bare "OpenLM Cloud" in prose.
- **Product-scoped `description` frontmatter on every page.** Pages without it fall back to an auto-excerpt that rarely names the product, which then becomes the search snippet. A short description that names the product turns every snippet into a disambiguation signal.

## On the Open Knowledge Format

The Google Cloud article proposes the Open Knowledge Format (OKF): a directory of Markdown files with YAML frontmatter that AI agents consume as a knowledge catalog. That is, almost exactly the `.md`-twin-plus-frontmatter corpus your `llm-markdown` plugin already produces.

It's the wrong lever for this problem, for three reasons:

- **It targets a different consumer.** OKF is for feeding *your own* agents an internal, curated knowledge base — for example, an OpenLM support bot you might build. It is not a signal that ChatGPT, Claude, Gemini, or Perplexity read from your site.
- **It has no relevant adoption.** OKF is v0.1, published in June 2026. No public answer engine ingests OKF bundles from arbitrary websites, so publishing one would not change the mixed answers people get today.
- **You've already built its equivalent.** Your `llms-full.txt` plus per-page twins are the same pattern. Reformatting them as OKF is lateral motion, not progress.

Revisit OKF only if OpenLM builds its own AI assistant over the docs. At that point your existing corpus is a near-ready producer, and conforming to OKF would let an off-the-shelf consumer read it. For fixing third-party model confusion, skip it.

## How to verify

- **Structured data:** validate the JSON-LD with the [Schema Markup Validator](https://validator.schema.org/) and Google's Rich Results Test. Confirm both `SoftwareApplication` nodes parse and the `@id` values are distinct.
- **Symmetric meta:** view source on a `/cloud/` page and a `/legacy/` page; confirm each carries a `doc-product` meta with the right value.
- **Build integrity:** run `npm run build` and confirm `llms.txt` still generates and the parity guard reports no new skips.
- **Behavioral tracking (the real test):** keep a fixed list of about ten "OpenLM" questions that currently produce mixed answers. Re-ask them across ChatGPT, Claude, Gemini, and Perplexity monthly, and log whether each answer stays within one product. Expect retrieval-based answers to improve within weeks; treat training-based improvements as a longer, uncontrolled tail.

## What not to do

- Don't remove `llms.txt` or the `.md` twins. They cost nothing to maintain and developer tools genuinely use them.
- Don't adopt OKF now. See above.
- Don't make the legacy notice loud. A subtle banner corrects course; an alarming one undermines customers who are correctly on Version 25.
- Don't populate `sameAs` with guessed URLs. Wrong links weaken the exact signal you're trying to strengthen.

## Priority recap

Start with Fix 1 (structured data) — it's low effort and the highest leverage. Fix 2 is a few lines and should ride along with it. Fix 3 is the visible layer you chose and can follow once the machine signals are in. Fix 4 is the discipline that keeps all of it from eroding.
