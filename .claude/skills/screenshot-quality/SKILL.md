---
name: screenshot-quality
description: Resolution and format rules for docs screenshots. Use when capturing, adding, replacing, optimizing, or reviewing screenshots/images for docs pages (static/img, static/services, page-local img/), when recapturing low-res images, or when asked why a zoomed image looks blurry. Ensures images stay sharp in the ImageZoom lightbox on Retina displays.
---

# Screenshot quality

Every markdown image on this site is click-to-zoom (`src/components/ImageZoom/`), and the lightbox **never upscales past native resolution** — so the native pixel count decides how far an image zooms and how sharp it looks on 2×-DPR (Retina) displays. Full rationale and measured baselines: [`project-guides/image-quality.md`](../../../project-guides/image-quality.md); author-facing summary in CONTRIBUTING.md § Screenshot quality.

## The rules (new or replaced screenshots)

1. **Capture at 2× device scale** — browser window 1440×900 logical px, `deviceScaleFactor: 2` (a Retina Mac does this automatically; set it explicitly in Playwright/DevTools). 100% zoom, light theme, EN locale, demo-tenant data, no browser chrome.
2. **Full-window shots: native width ≥ 2,560 px** (target 2,880). Never downscale the export.
3. **Crops/dialogs: crop from the 2× capture, never resize.** Anything spanning the ~750px content column must be **≥ 1,500 px** native; smaller fragments ≥ 2× their rendered width.
4. **Never upscale** an undersized image to pass — recapture it.
5. **PNG** for anything with UI text; JPEG only for photos; GIF ≥ 1,600 px at 1× and < 2 MB.
6. Apply the house decoration (ImageMagick rounded corners + drop shadow, alpha PNG) **after cropping, at full resolution**, then lossless-optimize with `oxipng`. Target ≤ ~500 KB; investigate > 1 MB.

## Verify before committing

```bash
identify -format '%f  %wx%h  %[size]\n' path/to/*.png
```

Full-window → width ≥ 2,560. Column-width crop → ≥ 1,500. If a capture fails, recapture — do not resample.

## Capturing app screenshots (how the OpenLM cloud-app shots are made)

The product-UI screenshots (e.g. `cloud-us.openlm.com`) are captured by driving a real logged-in Chrome through the Claude Code **claude-in-chrome** extension, then a macOS `screencapture` at 2×. Reusable scripts + full setup are in [`scripts/`](./scripts/) ([`scripts/README.md`](./scripts/README.md)). The non-obvious parts, learned the hard way:

- **Use `screencapture` at 2×, not the extension's own capture.** The extension's gif export is 1× and 256-color (soft, banded); the model-facing screenshot is downscaled. `screencapture -l <windowID>` of the Chrome window gives a true 2×, full-color PNG (~2,880 px wide at a 1440-pt window).
- **Do NOT run any `computer` mouse/screenshot action right before capturing.** Claude's active-tab **orange glow border + phantom cursor** are composited on the physical screen and appear *only after* a `computer` action, so they land in the screenshot. Drive the page purely via `navigate` + injected page JS + shell; open menus/expanders with page **JS `.click()`**; and verify a shot by opening the saved PNG, **not** a live screenshot.
- **Strip injected browser-extension overlays first** (they're on-screen, so `screencapture` grabs them): the Arcade "This domain has edits" pill (`#arcade-page-editor-overlay`, host in a shadow root — remove on a short `setInterval`) and Grammarly. Turn **Stage Manager off** (it shrinks the unfocused window and breaks window capture).
- **Anonymize demo-tenant PII in the DOM** (usernames, hostnames, license servers, project names) via injected JS before the shot — see `scripts/prep-page.js`.
- **Anti-aliased rounded corners** come from a **4×-supersampled** alpha mask (LANCZOS-downscaled); the ImageMagick `-compose DstIn` / `CopyOpacity` corner recipes render a **black card** in IM7. `scripts/decorate.py` does crop-chrome + corners + shadow in one step.

Not using the agent? Any Playwright/DevTools run at `deviceScaleFactor: 2` also satisfies rule 1 — you don't need these scripts, just the rules above.

## Exemptions

- Inline icons ≤ 96 px in both dimensions (the lightbox never zooms them).
- `static/img/legacy/**` (Version 25, maintenance) — do not re-shoot; the rule applies only if a legacy screenshot is being replaced anyway.
- Diagrams: prefer `DrawioArchitectureEmbed` (vector); static diagram exports follow rule 3.

## When editing a page with under-spec images

Don't silently keep sub-1,500px screenshots on pages you're already reworking — recapture them at 2× as part of the change. The recapture backlog and enforcement plan (a future `scripts/check-image-quality.py`) live in `project-guides/image-quality.md` § Implementation plan.
