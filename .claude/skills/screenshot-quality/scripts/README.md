# Capturing app screenshots — working scripts

Reusable helpers for producing clean **2× (Retina)** screenshots of the live OpenLM cloud
app for the docs, via the Claude Code **claude-in-chrome** extension + macOS `screencapture`.
See the "Capturing app screenshots" section of [`../SKILL.md`](../SKILL.md) for the why.

> Platform note: these are **macOS + claude-in-chrome** specific. If you capture with
> Playwright/DevTools instead, just honor the resolution/format rules in `SKILL.md`
> (`deviceScaleFactor: 2`, ≥2560 px, PNG, house decoration) — you don't need these.

## Files
- **`prep-page.js`** — inject in the target tab (via `javascript_tool`) on **every** page before capturing: waits for render, anonymizes demo-tenant PII, sets a title marker, and strips injected extension overlays (Arcade / Grammarly). Re-run it after each full-load navigation (it re-defines `window.*`).
- **`winid.py`** — lists Chrome windows + their CGWindowIDs (needs `pyobjc-framework-Quartz`).
- **`decorate.py`** — crops the browser chrome (dark-header auto-detect) and applies anti-aliased rounded corners + drop shadow (needs `Pillow`).
- **`capture.sh`** — force the marked Chrome window frontmost + full size, `screencapture -l` it at 2×, then decorate.

## One-time setup
```bash
python3 -m venv /tmp/shotvenv
/tmp/shotvenv/bin/pip install pyobjc-framework-Quartz Pillow
```
- Grant **Screen Recording** to your terminal (System Settings → Privacy & Security).
- Turn **Stage Manager OFF** (it shrinks the unfocused window and breaks window capture). Restore it after.

## Per-shot flow (do NOT use the `computer` tool during this — see SKILL.md)
1. `navigate` the tab to the page.
2. Run `prep-page.js` (edit its anonymization pairs for your data). Open any menu/expander with a page **JS `.click()`**.
3. Capture + decorate:
   ```bash
   OUTDIR=/abs/path/docs/static/img/<area> MARKER=ZZCAP PY=/tmp/shotvenv/bin/python \
     ./capture.sh <image-name>
   ```
4. Verify by opening the saved PNG (not a live screenshot): `identify -format '%f %wx%h %[size]\n' <out>` → width ≥ 2560.
