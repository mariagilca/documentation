# Design brief — Deployment choice cards (home page)

**For:** product/brand designer · **From:** design · **Surface:** `openlm.com/documentation/` home, the "One product, two ways to run it" band · **Component:** `src/components/DeploymentCards`

---

## The job

This band is a fork in the road. A first-time visitor lands here and has to answer one question before they read a single doc: **do we let OpenLM run this, or do we run it ourselves?** The cards are not marketing decoration — they are the routing decision for the entire site. Cloud goes one way, On-premise the other, and Version 25 (Legacy) is the quiet side door for existing customers.

So the bar is: a stranger should be able to *feel* which path is theirs in about a second, before they've finished reading. Right now they can't — they have to read the labels, because the two cards are the same object in two colors.

## Where these live

The home page sits on a live WebGL fluid-sim hero with an aurora gradient washing the whole page. The cards float on top as translucent glass; the section background is intentionally transparent so the aurora shows through. There's a signature already in place worth keeping: the two cards form a literal fork around a circular "or" pivot, and that pivot rhymes with the round royal-blue "go" button in the hero. Keep the fork and the pivot. They carry meaning. Everything else is open.

## The strategic shift

Today both cards are the same glass rectangle, same blur, same perimeter glow, same layout — distinguished only by hue (Cloud cyan, On-prem violet) and a "Recommended" badge. That symmetry is the core problem. It says "two products," when the truth is **one product, one question: who keeps the lights on.** Twins force the reader to do the work. The redesign should do the work for them by making the two paths feel like genuinely different *materials*, not two paint jobs.

This is also where we climb out of the generic-AI look (see "What we're not doing"). The way out is not more polish on the same glass — it's committing to a material logic that's specific to what each path actually *is*.

## Give each path a material identity

Design each card so its surface, light, and weight encode what choosing it means. Hue is the last 10% of this, not the first.

**Cloud — "we run it."** Light, elastic, hands-off. This card should feel atmospheric and weightless, like it belongs to the aurora rather than sitting on top of it. Soft layered depth, gentle drift, light from above, room to breathe. It's the recommended path, so it can be the more expansive, confident object. Sky/cyan, but the *feeling* is "lifted off your shoulders."

**On-premise — "you run it."** Owned, contained, precise. This card should feel solid and engineered — a defined object with real edges and structure, closer to a blueprint, a rack unit, or a sealed vault than to a cloud. Where Cloud is atmosphere, On-prem is architecture. Violet, but the *feeling* is "inside your walls, under your control." Crucially, do **not** just make it a violet copy of Cloud — change its material, its edge treatment, its weight, its light.

**Legacy (Version 25) — "the archive."** Keep it clearly secondary; it must not compete with the two live paths. But it shouldn't read as a dead end either — these are paying customers. Treat it as a dignified back-of-house door: quieter, flatter, amber, set apart from the fork. Think "archive shelf," not "deprecated banner."

If you get this right, someone could squint at the band with the text blurred out and still point to the cloud-managed option versus the self-hosted one. That's the test.

## Motion that means something

There's already a per-card pointer-glow ring, a hover lift, an "Arcade press" on the primary button (it depresses on click), and a sliding arrow. Good foundations — push them so the *motion itself* expresses each path's character, instead of both cards animating identically.

- **Cloud** should move like air: longer, softer ease-out, a faint ambient drift in the interior, a gentle floaty parallax/tilt that follows the cursor. When you hover, it feels like it lifts and breathes.
- **On-premise** should move like a mechanism: shorter, sharper, damped. On hover a structural element should *engage* — a blueprint grid or perimeter that snaps/draws into focus, a precise click rather than a float. Stiffer tilt, like turning a solid block.
- **The "or" pivot** can behave like a real fulcrum — subtly favoring whichever card the cursor is near. Keep it restrained; it's a wink, not a toy.

Different easing curves per path is a small, rarely-done detail that does a lot of the "sophisticated" work. Specify the curves and durations explicitly so engineering can match the feel.

## Depth with intent

Move past the single 4px hover lift. But note the trap: the page already leans hard on backdrop blur, and *more* frosted glass reads as *more* generic, not more premium. Earn depth through differentiated light and material, not additional blur.

- Cloud: atmospheric depth — a few translucent layers at different parallax depths, soft high light, the sense of something hovering.
- On-prem: architectural depth — an object with thickness and a defined face, a heavier and more grounded shadow, edges you could run a finger along.

The two cards should cast different *kinds* of shadow because they're different *kinds* of object.

## Say more, faster

Three feature bullets per card is thin for a decision this consequential. Add at-a-glance decision signals the eye can compare without reading full sentences:

- A one-line **"best when…"** qualifier per path (who this is actually for).
- A few compact **signal chips** that line up across both cards for instant comparison — e.g. time-to-value (*minutes* vs *Helm / single-VM*), data residency (*OpenLM cloud* vs *your network*), who operates it.
- Consider a small **shared-responsibility cue** — a split "what we run / what you run" bar that's weighted differently on each card. For an infrastructure audience this is genuinely useful and very on-brand, not decoration.

Keep it scannable. The goal is faster self-selection, not a spec sheet. If a chip doesn't help someone choose, cut it.

## Type and voice

Body and UI stay in **Atkinson Hyperlegible** — it's a deliberate accessibility choice, not a default; don't swap it. Headings are **Montserrat** (variable, 400–800). The card titles currently play it safe at ~1.35rem/700 — there's room for more editorial confidence and hierarchy in the titles and the section head. Copy follows the Splunk style guide: active voice, present tense, second person, concise.

## What we're *not* doing

This redesign explicitly rejects the generic AI-generated-SaaS look. Several of these are *already present* in the current cards — treat the list as things to climb out of, not just avoid:

- Uniform frosted glassmorphism on every surface as the whole idea.
- The violet→cyan diagonal gradient and the neon perimeter "glow" as the main event.
- Two symmetric cards differentiated only by hue and a badge.
- Everything pill-shaped, everything the same corner radius, everything floating on the same soft drop shadow.
- Emoji or sparkle icons; gradient "mesh" blobs; abstract 3D shapes as filler.
- Decorative motion that's identical on both cards and means nothing.
- A gradient headline centered over an abstract background.

Litmus test: if a screenshot of the finished card could be dropped onto a random startup's landing page by swapping the logo, it's not done. It should look like OpenLM and nowhere else.

## Hard constraints

- **Contrast:** WCAG AA minimum, AAA where we already hit it. The team enforces contrast automatically in CI (axe-core), so low-contrast accent-on-glass text will get flagged. Precedent: the legacy amber had to be darkened to `#b45309` to pass on the glass pill — don't reintroduce thin colored text.
- **Reduced motion:** every drift, tilt, parallax, and draw-in must degrade to a still, *still-distinct* state under `prefers-reduced-motion`. The current component fully kills the glow ring (not just freezes it) on reduce — match that rigor. The two cards must stay tellable apart with zero motion.
- **Touch / coarse pointer:** all cursor-driven effects no-op cleanly; cards stay legible and tappable; 44px minimum touch targets (the CTAs already meet this).
- **Performance:** the hero is a running WebGL sim, so card interactions must stay compositor-only (transform/opacity), throttled to animation frames, with no layout thrash or heavy per-frame JS. No new large image assets — icons are inline SVG using `currentColor`; keep it that way.
- **Internationalization:** Japanese strings run noticeably longer. Cards must stay equal-height and not break when copy expands; any new chips or labels must wrap gracefully.
- **Light and dark:** every material, light, and shadow treatment needs a dark-mode counterpart. There is no "light-only" effect.
- **Keep the signatures:** the fork layout and the circular "or" pivot stay — evolve them, don't discard them.

## Brand reference (work from these, then push)

- **Type** — Montserrat (headings, 400–800 woff2) · Atkinson Hyperlegible (body/UI) · Noto Sans JP (Japanese).
- **Primary / action** — royal blue `#2563eb` light, `#3b82f6` dark; pressed/strong `#1d4ed8` / `#2563eb`. This is the hero "go" button color and the Cloud primary CTA.
- **Cloud accent** — sky `#0ea5e9`; accessible text tint `#0369a1`.
- **On-premise accent** — violet `#7c3aed`.
- **Legacy accent** — amber `#d97706`; accessible text tint `#b45309`.
- **Secondary accent** — `#6a4efd` light / `#a855f7` dark.
- **Surfaces** — translucent glass over a `#e4e9ff → #cdebff` aurora with cyan and violet orbital accents; soft, layered elevation; heading ink `#0b1220` / `#f8fafc`.

"Brand-aware but bolder" means: keep this palette and type as the floor, then take the material, motion, depth, and information further than the current cards do.

## Deliverables

1. Static comps — Cloud, On-premise, and Legacy — in **light and dark**, at **desktop and stacked/mobile** widths.
2. Full state specs per card: rest, hover, focus-visible, active/pressed.
3. A motion spec: what animates, easing curves, durations, and the reduced-motion fallback for each.
4. Token mapping: which existing `--rmk-*` tokens map where, plus any *new* tokens you're proposing (named to match the existing system).
5. A clickable prototype of the two signature interactions — Cloud "drift" and On-prem "snap" — so engineering can match the feel, not guess at it.

## Definition of done

- A first-time visitor can tell Cloud from On-premise in under a second, by feel, with the labels covered.
- The two cards read as different *materials*, not the same card in two hues.
- Every state clears WCAG AA and survives `prefers-reduced-motion` with the paths still distinct.
- Japanese, dark mode, and mobile all hold up.
- The screenshot test passes: it could only be OpenLM.
