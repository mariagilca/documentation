# Image Quality Standard

**Status:** Guideline adopted 2026-07-08; enforcement and recapture not yet implemented (see [Implementation plan](#implementation-plan-next-session))
**Owner:** Docs infrastructure
**Related:** [`screenshot-automation-plan.md`](./screenshot-automation-plan.md) (capture tooling; its conventions are amended by this document), `src/components/ImageZoom/` (the lightbox this standard exists to serve), CONTRIBUTING.md "Assets" (author-facing summary)

## Why this standard exists

Every markdown image in the docs is click-to-zoom (`src/components/ImageZoom/`). The lightbox enlarges a screenshot to fill the viewport — up to ~1,360 CSS px wide on a typical desktop — and **never upscales past the image's native resolution**, because upscaling only produces blur. Two consequences:

1. A low-resolution capture gets a *small* zoom. A 1,640px-wide capture can only grow ~2.2× from its ~746px column slot instead of filling the screen.
2. On Retina/HiDPI displays (2× device-pixel ratio — the majority of our readers' laptops), 1,360 CSS px of zoomed image consumes **~2,720 device pixels**. An image with fewer native pixels than that is interpolated by the display and reads soft.

This is the whole difference between our zoomed screenshots and Mintlify's. Measured 2026-07-08:

| | OpenLM docs today | Mintlify docs |
| --- | --- | --- |
| Content column | ~746 px | ~632 px |
| Typical screenshot native width | 1,273 px median; 70.6% under 1,500 px | 2,500–3,024 px (2× Retina captures) |
| Oversampling at rest | ~1.7× | 3–4.8× |
| Pixels available to the zoom | usually < 1,700 | up to ~3,000 |

Their serving stack (CDN srcset ladder, AVIF/WebP) reduces *bytes*, not quality — the crispness comes entirely from authors uploading 2× captures and the pipeline never discarding resolution. That part we can copy with no infrastructure at all.

## The rule

For every **new or re-captured** content screenshot in `docs/cloud`-facing pages (`static/img/**`, `static/services/**`, page-local `img/`):

1. **Capture at 2× device scale.** Browser window at **1440×900 logical px, deviceScaleFactor 2** → a raw full-window capture is **2880×1800 native px**. On macOS any Retina display does this automatically; in Playwright/Chrome DevTools set `deviceScaleFactor: 2`.
2. **Full-window shots: native width ≥ 2,560 px** (target 2,880). Do not downscale the export. This supersedes the "downscale to ≤1,600 px" convention in `screenshot-automation-plan.md`.
3. **Crops and dialogs: crop from the 2× capture, never resize.** A crop meant to span the content column must be **≥ 1,500 px** native (2× the ~750px column); narrower fragments must be at least 2× their intended rendered width.
4. **Never upscale** an undersized capture to pass the bar — recapture it.
5. **Format: PNG** for anything containing UI text (which is nearly everything). JPEG only for photographic content. The baked rounded-corner + drop-shadow decoration requires PNG's alpha channel — keep using the established ImageMagick pass, applied *after* cropping, at full resolution.
6. **Optimize losslessly** (`oxipng`, the same pass the June 2026 audit used). No lossy quantization on gradient-heavy UI. Budget: a 2,880px app screenshot should land ≤ 500 KB; investigate anything over 1 MB.
7. **Capture hygiene** (unchanged from the automation plan): 100% browser zoom, light theme, EN locale, demo-tenant data only, no browser chrome or OS shadows.
8. **Animated captures (GIF):** minimum 1,600 px wide at 1×; keep under 2 MB. If a flow can't fit that budget, prefer a short sequence of stills. (Longer term: `<video>`/MP4 embeds — out of scope here.)

### Exemptions

- **Inline icons** (≤ 96 px in both dimensions) — the lightbox never zooms them; any legible size is fine.
- **`static/img/legacy/**`** (1,342 images, Version 25) — maintenance product, out of scope; do not re-shoot. The rule applies to legacy pages only if a screenshot is being replaced anyway.
- **Authored diagrams** — prefer `DrawioArchitectureEmbed` (vector, zooms losslessly). Static diagram *exports* follow rule 3.

### Quick self-check for authors

Before committing a screenshot: `identify -format '%wx%h %[size]\n' file.png` (ImageMagick). Full-window → width ≥ 2,560. Column-width crop → ≥ 1,500. If you captured on a Retina Mac at the standard 1440×900 window, you are already compliant.

## Current inventory (baseline, measured 2026-07-08)

- 2,046 files, ~197 MiB under `static/img` + `static/services`; 96% PNG by count.
- Non-icon content screenshots (n=1,903): median width **1,273 px**, p90 1,999 px. **70.6% < 1,500 px; 97.0% < 2,500 px** — i.e. almost nothing meets the zoom-on-Retina bar today.
- Recent sets, all below the new bar: `users_and_groups` 1,640px, `identity_service` 1,465px, `broker-hub` mixed 1,510–2,560px, `lac` 2,046px. All carry the baked corner+shadow decoration (keep).

## Implementation plan (next session)

Ordered; each step is independently shippable.

1. **Amend the automation-plan defaults** — done in this change: `maxWidthPx: 1600` → keep native 2× (2,880). Verify nothing else hardcodes 1,600.
2. **Recapture backlog, highest-traffic first:** `users_and_groups` (11), `identity_service` (5), `broker-hub` (9), then remaining `services/*` and `img/reporting` cloud shots (~120). Reuse the established claude-in-chrome → gif_creator export → ImageMagick decorate pipeline, with the capture window sized so exports come out ≥ 2,560px native.
3. **Enforcement:** `scripts/check-image-quality.py` in the spirit of the a11y checks — for images **added or modified in the diff** only (never the legacy backlog): flag content PNG/JPG under the width minimums, over 1 MB, or JPEG containing probable UI (warn-only at first, like axe).
4. **Optional serving upgrades** (evaluate, don't assume): a build-time srcset ladder (e.g. `@docusaurus/plugin-ideal-image` or a rehype plugin) plus letting `ImageZoom` request the largest rendition; WebP/AVIF transcoding. This is Mintlify's *bandwidth* trick — worth it only if page-weight metrics degrade after recapture. Note repo-size effect of 2× assets (~+40–80 MB across the cloud set) and consider Git LFS if `static/` growth becomes a problem.
5. **Process:** fold rule 1–3 into the release checklist alongside `report.mjs --area` once the automation pilot lands.
