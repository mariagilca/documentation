# Hero WebGL: design ideas for controlled awe

Working notes, 2026-06-12. For implementing against `src/components/HomepageHeader/fluid.js` (1,182 lines), `FluidCanvas.js`, and `index.module.css`.

## Where the sim stands

The bones are excellent: a stable-fluids solve (advect → curl → vorticity → pressure → subtract) with HDR bloom, sunrays, and pseudo-normal shading, on WebGL1 with device tiering, an IntersectionObserver pause, and a clean reduced-motion fallback. The engineering is already award-grade.

The design, though, hides everything. `PRIME_CANVAS: false` and `AUTO_SPLAT: false` mean the resting hero is pixel-identical to the CSS gradient. A visitor who never sweeps their cursor across the hero — which includes **every touch user** — never learns the sim exists. The delight is real but unfindable.

## The thesis

What the current awwwards WebGL front page (makemepulse, OFF+BRAND, Vide Infra with June SOTDs; Lusion with an honorable mention) shares is not effect density. It's three disciplines:

1. **A choreographed first five seconds.** The site performs once, briefly, then gets out of the way.
2. **Interaction that reads intent**, not just position. The effect responds to *how* you move, not *that* you move.
3. **Invisible final-pass craft** — tone mapping, grain, color discipline. The thing nobody names but everybody feels.

Everything below is in service of those three. No new dependencies, no three.js, no second canvas. Ranked by polish-per-line.

---

## Tier 1 — invisible craft (do first)

### 1. Soft tone map in the display shader

The repo history shows a fight against whiteout: dye intensity cut to `0.08` in `generateColor()`, `BLOOM_INTENSITY` down to `0.3`, `BLOOM_THRESHOLD` lowered to compensate. Those are symptom patches. The disease is unbounded additive accumulation: dye + bloom + sunrays, then `mix-blend-mode: screen` on top.

A soft-clip tone map fixes it structurally and buys back saturation headroom — you can raise dye intensity to ~`0.14` and let the nebula get *vivid* without ever clipping to white.

**Anchor:** `DISPLAY_FRAG`, after the sunrays composite, before the alpha line:

```glsl
// Soft highlight rolloff — hue-preserving. Replaces clipping with compression.
float peak = max(c.r, max(c.g, c.b));
c *= (1.0 + peak * 0.35) / (1.0 + peak);   // gentle shoulder, tune 0.35
float a = max(c.r, max(c.g, c.b));
```

Then raise `generateColor()`'s `0.08` toward `0.12–0.15` and re-tune `BLOOM_INTENSITY` upward (`0.4–0.5`). Test by scrubbing the cursor in circles for 10 seconds — the old build whites out, the new one saturates and holds.

### 2. Dither grain

Dark mode is a near-black radial gradient — prime territory for 8-bit banding, and bloom's soft edges make it worse. One line of animated grain removes banding and adds the film-like texture every winning dark site has.

**Anchor:** `DISPLAY_FRAG`, last lines; add a `uTime` uniform (set it in `render()` from `performance.now()`):

```glsl
float n = fract(sin(dot(gl_FragCoord.xy + uTime, vec2(12.9898, 78.233))) * 43758.5453);
c += (n - 0.5) * 0.012;   // ±0.6% — invisible as noise, lethal to banding
```

Cost: zero. This is the highest polish-per-line change available.

---

## Tier 2 — presence (the first five seconds)

### 3. The overture: a deterministic entrance

Replace the unused random `primeCanvas()` with a *designed* sequence — the same one every load, which is what "controlled" means in motion design. Three acts over ~2 seconds:

- **t≈300ms** — one slow indigo bloom unfurls behind the title, slightly off-center left.
- **t≈900ms** — a smaller azure counter-bloom rises behind the search bar.
- **t≈1600ms** — a faint teal accent drifts in from the right edge, low velocity.

Then nothing. With `DENSITY_DISSIPATION: 0.55` the dye fades over ~8–10 seconds and the hero settles back to the exact resting gradient — the original "resting parity" decision survives, it just gets a prologue. This is also the *entire* experience for touch users, who currently get nothing.

**Anchor:** replace `primeCanvas()` with a choreography table consumed inside `loop()` (pause-safe, unlike `setTimeout`):

```js
const OVERTURE = [
  { at: 300,  x: 0.42, y: 0.62, dx: 60,  dy: -30, hue: 0.64, scale: 12 },
  { at: 900,  x: 0.50, y: 0.45, dx: -40, dy: 20,  hue: 0.58, scale: 8  },
  { at: 1600, x: 0.88, y: 0.55, dx: -90, dy: 0,   hue: 0.52, scale: 6  },
];
// in loop(): fire entries where (now - startTime) >= entry.at && !entry.done
```

Derive `x, y` from the DOM at mount (title and search-bar rects → UV via `wrapper.getBoundingClientRect()`) rather than hardcoding — the hero reflows across breakpoints. Note UV y is inverted: `y = 1 - (rectCenterY - heroTop) / heroHeight`. Reduced-motion is already handled for free — the module never mounts.

Flip `PRIME_CANVAS` semantics to gate this (or add `OVERTURE: true`).

### 4. Sunrays radiate from the headline

`SUNRAYS_FRAG` hardcodes the ray origin at canvas center: `vec2 dir = vUv - 0.5;`. Move it to the title's position and the god-rays stream from behind the words — light appears to come *from the documentation itself*. For a docs site, that's not decoration, it's thesis.

**Anchor:** one uniform.

```glsl
uniform vec2 uRayOrigin;          // default (0.5, 0.5)
vec2 dir = vUv - uRayOrigin;
```

Set it from the same DOM-derived title center as idea 3. Two lines of GLSL, one `gl.uniform2f`.

---

## Tier 3 — touch (make the cursor feel read)

### 5. Ribbon interpolation for fast strokes

`loop()` fires one splat per frame at the latest pointer position. A fast swipe therefore stamps disconnected blobs with gaps — "stamps," not "ink." Sub-step along the segment between the last splatted point and the current one:

**Anchor:** the `pointer.moved` block in `loop()`:

```js
const dist = Math.hypot(pointer.x - lastSplat.x, pointer.y - lastSplat.y);
const steps = Math.min(Math.ceil(dist / 0.012), 16);
for (let i = 1; i <= steps; i++) {
  const t = i / steps;
  splat(
    lastSplat.x + (pointer.x - lastSplat.x) * t,
    lastSplat.y + (pointer.y - lastSplat.y) * t,
    (pointer.dx / steps) * CONFIG.SPLAT_FORCE,   // divide force across steps
    (pointer.dy / steps) * CONFIG.SPLAT_FORCE,   // or total energy multiplies
    pointer.color,
  );
}
```

Track `lastSplat` yourself — `pointer.prevX/prevY` update per *event*, and several events can land between frames.

### 6. Gesture speed drives color

`pointer.color` is generated once on `pointerdown` — most visitors never click the hero, so their entire trail is one hue. Instead, derive color per-frame from gesture speed within the existing brand ranges: slow drift = deep indigo (`h ≈ 0.68`), fast flick = bright azure-cyan (`h ≈ 0.54`), with a small value boost on speed.

```js
const speed = Math.min(Math.hypot(pointer.dx, pointer.dy) * 8, 1); // 0..1
const h = 0.68 - speed * 0.14;          // indigo → cyan as speed rises
const v = 0.85 + speed * 0.15;
```

**Anchor:** a `colorForSpeed()` beside `generateColor()`; call it in the splat block. This single change is what makes people say "it feels alive" — the fluid is reading *how* you move. Palette discipline holds: everything stays inside the existing cool band.

### 7. The search pulse

The search bar is the hero's real CTA. When it gains focus, emit a soft ring of dye expanding outward from the bar — the page visibly acknowledges your intent to search. This is the one *meaningful* interaction in the set: effect tied to function.

**Anchor:** extend the returned handle in `initFluid()`:

```js
pulse(cx, cy, radius = 0.06) {           // cx, cy in UV space
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const color = generateColor();
    color.r *= 6; color.g *= 6; color.b *= 6;
    splat(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius,
          Math.cos(a) * 220, Math.sin(a) * 220, color);
  }
},
```

In `FluidCanvas.js`, listen for `focusin` on the hero wrapper, check the target is the DocSearch button, convert its rect center to UV, call `handle.pulse(...)` (guard for `handle` being null — the dynamic import may not have resolved). Debounce to once per few seconds.

---

## Tier 4 — structure (bigger lifts, phase 2)

### 8. Calm zone behind the headline

Legibility currently leans on a dark-mode `text-shadow`. The elegant version: damp the velocity field inside an ellipse covering the title block, so dye naturally thins and slows as it crosses the words. Legibility becomes physics. Visitors won't know why the text always stays readable — it just does.

**Anchor:** `GRADIENT_SUBTRACT_FRAG` (runs once per frame at sim resolution — the cheap place):

```glsl
uniform vec2 uCalmCenter;   // ellipse center, UV
uniform vec2 uCalmRadii;    // ellipse radii, UV
float d = length((vUv - uCalmCenter) / uCalmRadii);
float calm = 1.0 - smoothstep(0.85, 1.3, d);     // 1 inside → 0 outside
velocity *= mix(1.0, 0.90, calm);                 // ~10% drag per frame inside
```

Derive the ellipse from the title+subtitle bounding box at mount and on resize, same plumbing as ideas 3–4.

### 9. Wind: ambient drift without ambient noise

Keep `AUTO_SPLAT: false` — random dye blobs at rest would betray the resting-parity decision. Instead add a **velocity-only** ambient force: every ~6 seconds, a weak force splat (no dye) along a consistent diagonal. With no dye on canvas it does literally nothing — resting state stays pixel-identical. But dye the *user* created keeps drifting in long curls instead of dying in place, which is the difference between an aquarium and a screensaver.

**Anchor:** split `splat()` into `splatVelocity(x, y, dx, dy)` and `splatDye(x, y, color)` (it already does the two passes back-to-back; this is a 10-line refactor). Wind calls only the first. Existing callers call both.

### 10. Light-mode gets its own identity: ink, not nebula

Additive cyan on the pale lavender gradient reads faint and slightly washy — the sim is dark-mode-native. Rather than tune one compositing model for both themes, give light mode a different metaphor: **watercolor ink on paper**. Switch `mix-blend-mode` from `screen` to `multiply` in light mode, render dye inverted (white background, pigment subtracts), drop bloom intensity, raise saturation. Dark mode: a nebula in a void. Light mode: ink blooming in water. Same sim, two stories — and a `uLightMode` uniform plus one CSS rule is most of the work.

This is the largest item here and the only one I'd prototype on a branch first; the inverted-dye display math needs taste-tuning.

---

## Guardrails

### 11. Adaptive quality governor

Awe dies at 45fps. Track an EMA of raw frame time in `loop()`; if it sits above ~14ms for a couple of seconds, halve `DYE_RESOLUTION` (1024 → 512) and set `pendingResize = true` to rebuild FBOs; restore with hysteresis and a cooldown so it never oscillates. Note `initFramebuffers()` recreates the dye FBO *blank* — visible pop. Mitigate by blitting the old dye texture into the new FBO with `copyProgram` before swapping, or only degrade when total dye luminance is near zero (rest state).

### What not to do

No three.js or any dependency — the zero-dep vanilla module is a feature, not a gap. No particles layered on the fluid. No scroll-jacking or scroll-driven camera. No always-on ambient dye (resting parity is the brand). No entrance longer than ~2.5s. Don't touch `baseUrl`-adjacent anything; the canvas stays `aria-hidden` with content above it untouched.

### Verification checklist

Run through after each tier: both color modes; `npm run start -- --locale ja` (hero strings are translated — DOM-derived rects make this safe, hardcoded UVs would not be); reduced-motion on (sim must never mount, including the overture); DevTools performance trace while scrubbing the cursor (no long tasks, steady 16.6ms); the three device tiers in `FluidCanvas.js` via responsive mode at 480/768/1280; tab-away and return (rAF pause + IO behavior); `npm run build` for the usual structural sanity.

### Doc nit, while you're in there

The file-header comment says auto-splats fire "at a ~900ms cadence" and describes ambient motion as on; `DEFAULTS` says `AUTO_SPLAT: false` and `AUTO_SPLAT_INTERVAL_MS: 4000`. The header also still references the old palette ("random cool-tone hues") while `generateColor()` now enforces the no-magenta brand ramp. Worth syncing the prose with the code — it'd have saved me twenty minutes of double-checking.

## Suggested order

Ship tier 1 alone first (pure quality, zero design risk), watch it for a week. Then tier 2 — the overture is the visible bet and deserves its own review. Tiers 3–4 are independent of each other and can land in any order. Idea 6 (speed→color) is the sleeper: smallest diff in tier 3, biggest perceived-aliveness gain.

## Sources

WebGL technique grounding: [webglfundamentals.org](https://webglfundamentals.org/) — render-to-texture, GPGPU, precision, and "WebGL and Alpha" articles are the relevant ones for this pipeline. Pattern survey: [awwwards WebGL showcase](https://www.awwwards.com/websites/webgl/) (June 2026 SOTD winners: Hubtown/Unseen, Power of Storytelling/Noomo, Apechain/makemepulse, Steven.com/OFF+BRAND, AIR/Vide Infra). The sim lineage is Pavel Dobryakov's WebGL-Fluid-Simulation, whose tuning vocabulary (`CURL`, `SPLAT_RADIUS`, dissipation pairs) this file inherits.
