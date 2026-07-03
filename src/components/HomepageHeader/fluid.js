/**
 * Hero fluid simulation.
 *
 * Real-time 2D stable-fluids simulation with HDR bloom, sunrays, and shading,
 * rendered behind the hero content. Adapted from the SWR FluidHero — matches
 * the x.ai aesthetic (color splashes on an ink-dark backing, not a flash of
 * light on a bright gradient).
 *
 * Pipeline:
 *   - Navier-Stokes on WebGL 1: advect → curl → vorticity confinement →
 *     curl-noise turbulence → divergence → Jacobi pressure iterations →
 *     gradient subtract → display.
 *   - Dye advection is second-order MacCormack (forward + backward advect,
 *     limited correction) on capable tiers, so filaments keep crisp edges
 *     for seconds instead of diffusing into blobs; plain semi-Lagrangian
 *     is the low-tier fallback.
 *   - HDR bloom: prefilter bright dye → iterative mipmap blur chain →
 *     composite into the display pass with an intensity multiplier.
 *   - Sunrays: luminance mask → radial blur from screen center → multiply
 *     and add during display, producing god-ray streaks behind splats.
 *   - Shading: pseudo-normal from local dye gradients, lit from +Z, plus a
 *     material pass (drifting specular glint + fresnel rim, hue-neutral)
 *     and luma-gated IGN dither to break up banding in bloom halos.
 *
 * Motion:
 *   - Pointer strokes are sampled per event (coalesced where available) and
 *     re-emitted once per frame as overlapping sub-splats along the stroke
 *     polyline — fast swipes leave continuous ribbons whose width,
 *     brightness, and tangent-stretch follow hand speed. State is kept per
 *     pointerId, so multi-touch strokes stay independent.
 *   - Energy-gated curl-noise turbulence frays decaying trails into wisps;
 *     a post-stroke "blossom" briefly raises vorticity and lowers dye
 *     dissipation so ribbons curl into filigree and linger, then an
 *     evaporation ramp guarantees invisibility before the idle sleep.
 *   - Ambient auto-splats at random positions with random cool-tone hues
 *     and random velocities (off by default — resting state is the CSS
 *     gradient).
 *
 * Palette:
 *   - Hue restricted to cool tones (aqua → blue → indigo) so the visual
 *     reads on-brand for OpenLM.
 *
 * SSR / a11y:
 *   - This module is dynamically imported by FluidCanvas inside useEffect, so
 *     Docusaurus SSR never touches window, document, or WebGL.
 *   - The caller honors prefers-reduced-motion; the sim never mounts in that
 *     case. The CSS fallback background takes over.
 *   - Returns early if WebGL 1 or half-float textures are unavailable.
 */

/* ------------------------------------------------------------------ */
/* Tunable simulation parameters                                       */
/* ------------------------------------------------------------------ */
const DEFAULTS = {
  SIM_RESOLUTION: 128,            // fluid solve resolution
  DYE_RESOLUTION: 1024,           // dye grid — high for crisp, bloomable edges
  DENSITY_DISSIPATION: 0.55,      // moderate — clouds persist but flurries decay before they saturate
  VELOCITY_DISSIPATION: 0.6,      // stronger decay so motion slows to a drift quickly
  PRESSURE: 0.8,                  // pressure retention between frames
  PRESSURE_ITERATIONS: 20,        // Jacobi iterations
  CURL: 8,                        // low vorticity — long wispy curls, not tight vortexes
  SPLAT_RADIUS: 0.2,              // tighter, calmer splats — pinpoint clouds, not full bursts
  SPLAT_FORCE: 1400,              // gentle push so expansion is barely visible motion
  MAX_SPLATS_PER_FRAME: 8,        // stroke-ribbon sub-splat budget per frame, split across pointers
  MACCORMACK: true,               // second-order dye advection — crisp filaments instead of blur
  TURBULENCE: 15,                 // curl-noise micro-turbulence strength (0 = pass skipped)
  BLOSSOM_CURL: 12,               // extra vorticity during the post-stroke blossom envelope
  IDLE_HARD_CAP_MS: 9000,         // absolute ceiling on post-input run time (dye-energy sleep gate)
  SPECULAR: 0.5,                  // drifting glint weight in the display material pass
  RIM: 0.35,                      // fresnel rim weight in the display material pass
  DITHER: 1.0,                    // IGN dither scale (doubled in dark mode, 0 = off)
  AUTO_SPLAT_VELOCITY: 180,       // velocity range of idle auto-splats (tiny drift)
  AUTO_SPLAT_INTERVAL_MS: 4000,   // very sparse — nebulae bloom slowly, they don't pop
  PRIME_SPLAT_VELOCITY: 120,      // tiny velocity for the opening composition
  PRIME_CANVAS: false,            // seed nebulae on load? off → resting state == CSS gradient
  AUTO_SPLAT: false,              // emit ambient nebulae? off → nebulae only on cursor input
  SHADING: true,                  // normal-based shading for volumetric cloud feel
  BLOOM: true,                    // HDR bloom — the glow is the whole point
  BLOOM_ITERATIONS: 8,            // downsample steps in the bloom blur chain
  BLOOM_RESOLUTION: 256,          // bloom working resolution
  BLOOM_INTENSITY: 0.3,           // calmer — less screen-blend whiteout on sustained motion
  BLOOM_THRESHOLD: 0.3,           // lowered further — softer dye regions still glow now that BLOOM_INTENSITY is muted
  BLOOM_SOFT_KNEE: 0.7,           // smoothness of the threshold knee
  SUNRAYS: true,                  // subtle god-rays for cosmic depth
  SUNRAYS_RESOLUTION: 196,        // sunrays working resolution
  SUNRAYS_WEIGHT: 0.35,           // gentle — hint of radiance, not sharp beams
  DPR_CAP: 1.75,                  // cap devicePixelRatio for perf
  BACK_COLOR: { r: 0.0, g: 0.0, b: 0.0 }, // clear color (alpha 0 — see render()).
  TARGET_FPS: 60,                 // cap the render loop — halves cost on 120Hz panels
  IDLE_TIMEOUT_MS: 4000,          // sleep the loop this long after the last interaction
  ADAPTIVE_QUALITY: true,         // step quality down if the device can't hold the budget
};

/* ------------------------------------------------------------------ */
/* GLSL shader sources                                                 */
/* ------------------------------------------------------------------ */

/* Five-tap neighborhood vertex shader — used by most simulation passes. */
const BASE_VERT = /* glsl */ `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

/* Three-tap blur vertex shader — used by the post-process blur pass. */
const BLUR_VERT = /* glsl */ `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    float offset = 1.33333333;
    vL = vUv - texelSize * offset;
    vR = vUv + texelSize * offset;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const BLUR_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  uniform sampler2D uTexture;
  void main () {
    vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
    sum += texture2D(uTexture, vL) * 0.35294117;
    sum += texture2D(uTexture, vR) * 0.35294117;
    gl_FragColor = sum;
  }
`;

const COPY_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`;

const CLEAR_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

const COLOR_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec4 color;
  void main () {
    gl_FragColor = color;
  }
`;

const SPLAT_FRAG = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  uniform vec2 uDir;      // unit stroke tangent in aspect-corrected space
  uniform float uStretch; // 0 = isotropic (velocity pass, legacy splats)
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    // Anisotropic Gaussian: elongated along the stroke tangent, narrowed
    // across it. At uStretch 0 this reduces exactly to exp(-dot(p,p)/radius).
    float para = dot(p, uDir);
    float perp = dot(p, vec2(-uDir.y, uDir.x));
    float d = para * para / (radius * (1.0 + uStretch))
            + perp * perp * (1.0 + uStretch) / radius;
    vec3 splat = exp(-d) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const ADVECTION_FRAG = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform vec2 dyeTexelSize;
  uniform float dt;
  uniform float dissipation;

  vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
    vec2 st = uv / tsize - 0.5;
    vec2 iuv = floor(st);
    vec2 fuv = fract(st);
    vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
    vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
    vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
    vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
    return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
  }

  void main () {
    vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
    gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);
    gl_FragColor.a = 1.0;
  }
`;

/* MacCormack correction pass. Runs after a forward advect (uPhi1) and a
   backward advect of that result (uPhi2): the round-trip error, halved and
   added back, cancels most of the first-order scheme's numerical diffusion,
   so dye filaments keep crisp edges for seconds instead of blurring out. */
const ADVECTION_MACCORMACK_FRAG = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uPhiN;    // dye at the start of the frame
  uniform sampler2D uPhi1;    // forward-advected dye
  uniform sampler2D uPhi2;    // forward-then-backward-advected dye
  uniform vec2 texelSize;     // velocity texel
  uniform vec2 dyeTexelSize;  // dye texel
  uniform float dt;
  uniform float dissipation;

  vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
    vec2 st = uv / tsize - 0.5;
    vec2 iuv = floor(st);
    vec2 fuv = fract(st);
    vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
    vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
    vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
    vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
    return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
  }

  void main () {
    vec4 phiNew = texture2D(uPhi1, vUv)
                + 0.5 * (texture2D(uPhiN, vUv) - texture2D(uPhi2, vUv));

    // Limiter: clamp to the min/max of the four uPhiN texels around the
    // BACKTRACED sample point (not vUv). This kills sparkle overshoot and
    // bounds every output to blends of locally-present dye, so the
    // correction can never invent new hues.
    vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
    vec2 st = coord / dyeTexelSize - 0.5;
    vec2 iuv = floor(st);
    vec4 a = texture2D(uPhiN, (iuv + vec2(0.5, 0.5)) * dyeTexelSize);
    vec4 b = texture2D(uPhiN, (iuv + vec2(1.5, 0.5)) * dyeTexelSize);
    vec4 c = texture2D(uPhiN, (iuv + vec2(0.5, 1.5)) * dyeTexelSize);
    vec4 d = texture2D(uPhiN, (iuv + vec2(1.5, 1.5)) * dyeTexelSize);
    phiNew = clamp(phiNew, min(min(a, b), min(c, d)), max(max(a, b), max(c, d)));

    gl_FragColor = vec4(dissipation * phiNew.rgb, 1.0);
  }
`;

const DIVERGENCE_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const CURL_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

const VORTICITY_FRAG = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    velocity = clamp(velocity, -1000.0, 1000.0);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

/* Curl-noise micro-turbulence. The curl of a scalar stream function is
   divergence-free by construction, so this injects organic multi-scale
   swirl without fighting the pressure solve. The force is gated by local
   flow speed: decaying trails fray into wisps instead of fading in place,
   while a dead field receives exactly zero force — the resting state can
   never self-start. */
const NOISE_FORCE_FRAG = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform float uTime;
  uniform float uStrength;
  uniform float uNoiseScale;
  uniform float dt;

  // Hash-based value noise — cheap, WebGL1-safe, no texture fetches.
  float hash (vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float vnoise (vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  // Three-octave stream function, drifting slowly so the swirl pattern
  // itself evolves over time.
  float psi (vec2 p) {
    return 0.5 * vnoise(p)
         + 0.25 * vnoise(p * 2.03 + 17.1)
         + 0.125 * vnoise(p * 4.01 + 47.7);
  }

  void main () {
    vec2 v = texture2D(uVelocity, vUv).xy;
    vec2 p = vUv * uNoiseScale + vec2(uTime * 0.10, -uTime * 0.07);
    float e = 0.35;
    float gx = psi(p + vec2(e, 0.0)) - psi(p - vec2(e, 0.0));
    float gy = psi(p + vec2(0.0, e)) - psi(p - vec2(0.0, e));
    vec2 swirl = vec2(gy, -gx) / (2.0 * e);
    float gate = smoothstep(0.02, 0.15, length(v));
    v += swirl * uStrength * gate * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
  }
`;

const PRESSURE_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const GRADIENT_SUBTRACT_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

/* ---- bloom pipeline ---- */

const BLOOM_PREFILTER_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec3 curve;
  uniform float threshold;
  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    float br = max(c.r, max(c.g, c.b));
    float rq = clamp(br - curve.x, 0.0, curve.y);
    rq = curve.z * rq * rq;
    c *= max(rq, br - threshold) / max(br, 0.0001);
    gl_FragColor = vec4(c, 0.0);
  }
`;

const BLOOM_BLUR_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  void main () {
    vec4 sum = vec4(0.0);
    sum += texture2D(uTexture, vL);
    sum += texture2D(uTexture, vR);
    sum += texture2D(uTexture, vT);
    sum += texture2D(uTexture, vB);
    sum *= 0.25;
    gl_FragColor = sum;
  }
`;

const BLOOM_FINAL_FRAG = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  uniform float intensity;
  void main () {
    vec4 sum = vec4(0.0);
    sum += texture2D(uTexture, vL);
    sum += texture2D(uTexture, vR);
    sum += texture2D(uTexture, vT);
    sum += texture2D(uTexture, vB);
    sum *= 0.25;
    gl_FragColor = sum * intensity;
  }
`;

/* ---- sunrays pipeline ---- */

const SUNRAYS_MASK_FRAG = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
    vec4 c = texture2D(uTexture, vUv);
    float br = max(c.r, max(c.g, c.b));
    c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
    gl_FragColor = c;
  }
`;

const SUNRAYS_FRAG = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float weight;
  #define ITERATIONS 16

  // Luminance proxy for "how much dye is here". We drive sunrays from
  // RGB magnitude rather than the dye's alpha channel — the splat and
  // advection shaders hardcode alpha to 1.0, so alpha never dissipates
  // and sunrays would bleed a grey-white glow across the whole hero
  // even at rest. RGB dissipates with the sim, so using it keeps
  // sunrays tied to visible dye.
  float luma(vec3 c) { return max(c.r, max(c.g, c.b)); }

  void main () {
    float Density = 0.3;
    float Decay = 0.95;
    float Exposure = 0.7;
    vec2 coord = vUv;
    vec2 dir = vUv - 0.5;
    dir *= 1.0 / float(ITERATIONS) * Density;
    float illuminationDecay = 1.0;
    float color = luma(texture2D(uTexture, vUv).rgb);
    for (int i = 0; i < ITERATIONS; i++) {
      coord -= dir;
      float col = luma(texture2D(uTexture, coord).rgb);
      color += col * illuminationDecay * weight;
      illuminationDecay *= Decay;
    }
    gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
  }
`;

/* ---- display with bloom + sunrays + shading ---- */

const DISPLAY_FRAG = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  uniform sampler2D uBloom;
  uniform sampler2D uSunrays;
  uniform vec2 texelSize;
  uniform float uApplyBloom;   // 1.0 = bloom on, 0.0 = skipped this tier
  uniform float uApplySunrays; // 1.0 = sunrays on, 0.0 = skipped this tier
  uniform vec3 uLightDir;      // slowly drifting key light for the material pass
  uniform float uSpecular;     // glint weight, 0 disables the material pass
  uniform float uRim;          // fresnel rim weight
  uniform float uDither;       // IGN dither scale, 0 disables
  uniform float uTime;

  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;

    // Shading: use local luminance gradient as a pseudo-normal, lit from +Z.
    // Gives the dye a volumetric, almost-liquid feel, matching the x.ai sheen.
    float dl = length(texture2D(uTexture, vL).rgb);
    float dr = length(texture2D(uTexture, vR).rgb);
    float dtop = length(texture2D(uTexture, vT).rgb);
    float db = length(texture2D(uTexture, vB).rgb);
    vec3 n = normalize(vec3(dr - dl, db - dtop, length(texelSize)));
    vec3 l = vec3(0.0, 0.0, 1.0);
    float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
    c *= diffuse;

    // Material: a drifting Blinn-Phong glint plus a fresnel rim, computed
    // from a broader-z copy of the pseudo-normal (the raw one is nearly
    // flat-or-vertical, which would make the glint binary). Scalar
    // multiplies only — hue-neutral, and zero dye stays exactly zero. The
    // combined factor is clamped as ONE term: that is the screen-blend
    // whiteout guard.
    if (uSpecular + uRim > 0.0) {
      vec3 nl = normalize(vec3(dr - dl, db - dtop, 0.3));
      vec3 h = normalize(uLightDir + vec3(0.0, 0.0, 1.0));
      float spec = pow(max(dot(nl, h), 0.0), 24.0);
      float rim = pow(clamp(1.0 - nl.z, 0.0, 1.0), 2.0);
      c *= min(1.0 + spec * uSpecular + rim * uRim, 1.8);
    }

    // Bloom: additive glow from bright dye regions. The uniform branch skips
    // the texture fetch entirely on tiers that disable bloom — it's coherent
    // (identical for every fragment), so the GPU elides the untaken path.
    if (uApplyBloom > 0.5) {
      c += texture2D(uBloom, vUv).rgb;
    }

    // Sunrays: a luminance mask multiplied in, then lightly added for tint.
    // Gated as a uniform branch so disabling sunrays both skips the fetch AND
    // avoids multiplying the hero by an unwritten mask (which would black it out).
    if (uApplySunrays > 0.5) {
      float sun = texture2D(uSunrays, vUv).r;
      c *= sun;
      c += sun * 0.35;
    }

    // Animated interleaved-gradient-noise dither breaks up 8-bit banding in
    // bloom halos (visible as contour rings on the dark theme). Luma-gated:
    // zero-dye pixels receive exactly zero offset, so the resting state
    // stays pixel-identical to the CSS gradient.
    if (uDither > 0.0) {
      float ign = fract(52.9829189 * fract(dot(
        gl_FragCoord.xy + uTime * vec2(11.0, 7.0),
        vec2(0.06711056, 0.00583715))));
      c += (ign - 0.5) * (2.0 / 255.0) * uDither
         * smoothstep(0.0, 0.02, max(c.r, max(c.g, c.b)));
      c = max(c, 0.0);
    }

    // Final alpha: maximum channel. Bright pixels get presence over the bg.
    float a = max(c.r, max(c.g, c.b));
    gl_FragColor = vec4(c, a);
  }
`;

/* ------------------------------------------------------------------ */
/* WebGL helpers                                                       */
/* ------------------------------------------------------------------ */

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // eslint-disable-next-line no-console
    console.warn('Hero fluid shader compile failed:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vertSrc, fragSrc) {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!vert || !frag) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // eslint-disable-next-line no-console
    console.warn('Hero fluid program link failed:', gl.getProgramInfoLog(program));
    return null;
  }
  const uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i += 1) {
    const info = gl.getActiveUniform(program, i);
    uniforms[info.name] = gl.getUniformLocation(program, info.name);
  }
  return { program, uniforms };
}

function createFBO(gl, w, h, internalFormat, format, type, param) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return {
    texture,
    fbo,
    width: w,
    height: h,
    texelSizeX: 1 / w,
    texelSizeY: 1 / h,
    attach(id) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
}

function createDoubleFBO(gl, w, h, internalFormat, format, type, param) {
  let fbo1 = createFBO(gl, w, h, internalFormat, format, type, param);
  let fbo2 = createFBO(gl, w, h, internalFormat, format, type, param);
  return {
    width: w,
    height: h,
    texelSizeX: 1 / w,
    texelSizeY: 1 / h,
    get read() { return fbo1; },
    set read(v) { fbo1 = v; },
    get write() { return fbo2; },
    set write(v) { fbo2 = v; },
    swap() {
      const tmp = fbo1;
      fbo1 = fbo2;
      fbo2 = tmp;
    },
  };
}

function supportRenderTextureFormat(gl, internalFormat, format, type) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  gl.deleteTexture(texture);
  gl.deleteFramebuffer(fbo);
  return ok;
}

function getSupportedFormat(gl, internalFormat, format, type) {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) return null;
  return { internalFormat, format };
}

/* ------------------------------------------------------------------ */
/* Small math helpers (JS mirrors of the GLSL built-ins)               */
/* ------------------------------------------------------------------ */
function clamp01(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function smoothstep(edge0, edge1, x) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/* ------------------------------------------------------------------ */
/* Color helpers — HSV → RGB, restricted to cool brand tones.          */
/* ------------------------------------------------------------------ */
function hsvToRgb(h, s, v) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: return [v, t, p];
    case 1: return [q, v, p];
    case 2: return [p, v, t];
    case 3: return [p, q, v];
    case 4: return [t, p, v];
    default: return [v, p, q];
  }
}

/*
 * Nebula palette. Held entirely in the cyan→indigo royal-blue family —
 * no magenta/violet, and (since the dye floor was tightened) no teal
 * either, because screen blending amplifies off-blue hues on the dark
 * theme. Hubble-style but dialed toward the deep-space end of the shelf.
 *
 *   65% of splats: hue 0.58..0.68 (azure → indigo)            — core tone
 *   20% of splats: hue 0.68..0.74 (indigo, capped pre-violet) — drift
 *   15% of splats: hue 0.56..0.66 (cyan → azure)              — contrast accent
 *
 * Splats are kept sub-unit so bloom has headroom to push highlights over
 * 1.0 and glow; they're later multiplied by 10× before injection, giving
 * bloom plenty of bright source material.
 */
function generateColor() {
  const r = Math.random();
  let h;
  // Blue/indigo dominant with a cyan accent — no teal, no magenta.
  if (r < 0.65)      h = 0.58 + Math.random() * 0.10; // azure → indigo
  else if (r < 0.85) h = 0.68 + Math.random() * 0.06; // indigo (capped before violet)
  else               h = 0.56 + Math.random() * 0.10; // cyan → azure accent
  const s = 0.80 + Math.random() * 0.20;
  const v = 1.0;
  const [rr, gg, bb] = hsvToRgb(h, s, v);
  // Lower per-splat intensity so sustained cursor movement doesn't
  // accumulate to saturation (screen-blend whiteout).
  return { r: rr * 0.08, g: gg * 0.08, b: bb * 0.08 };
}

/* ------------------------------------------------------------------ */
/* Public entry point                                                  */
/*                                                                     */
/* initFluid(canvas, overrides?) → { resize(), destroy() }             */
/*                                                                     */
/* The caller owns SSR and reduced-motion checks; this module assumes  */
/* it's running in a browser with a live canvas element.               */
/* ------------------------------------------------------------------ */
export function initFluid(canvas, overrides = {}) {
  const CONFIG = { ...DEFAULTS, ...overrides };

  // Events and the IntersectionObserver are scoped to the canvas's parent,
  // so only hovering the hero drives splats (not the whole page).
  const wrapper = canvas.parentElement || canvas;

  const glOpts = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
  };
  const gl =
    canvas.getContext('webgl', glOpts) ||
    canvas.getContext('experimental-webgl', glOpts);
  if (!gl) return noopHandle();

  const halfFloat = gl.getExtension('OES_texture_half_float');
  const supportLinear = gl.getExtension('OES_texture_half_float_linear');
  const halfFloatTexType = halfFloat ? halfFloat.HALF_FLOAT_OES : null;
  if (!halfFloatTexType) return noopHandle();

  const rgba = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  if (!rgba) return noopHandle();

  const filtering = supportLinear ? gl.LINEAR : gl.NEAREST;

  /* ------------------------------------------------------------------ */
  /* Adaptive quality + hardware capability                              */
  /* ------------------------------------------------------------------ */
  // Snapshot the device-tuned config (after FluidCanvas overrides) as the
  // ceiling. Quality tiers only ever reduce from here via Math.min, so a small
  // phone that already starts low is never pushed back up.
  const BASE = {
    SIM_RESOLUTION: CONFIG.SIM_RESOLUTION,
    DYE_RESOLUTION: CONFIG.DYE_RESOLUTION,
    PRESSURE_ITERATIONS: CONFIG.PRESSURE_ITERATIONS,
    BLOOM: CONFIG.BLOOM,
    BLOOM_ITERATIONS: CONFIG.BLOOM_ITERATIONS,
    SUNRAYS: CONFIG.SUNRAYS,
    TARGET_FPS: CONFIG.TARGET_FPS,
    MAX_SPLATS_PER_FRAME: CONFIG.MAX_SPLATS_PER_FRAME,
    MACCORMACK: CONFIG.MACCORMACK,
    TURBULENCE: CONFIG.TURBULENCE,
    SPECULAR: CONFIG.SPECULAR,
    RIM: CONFIG.RIM,
    DITHER: CONFIG.DITHER,
  };

  // Progressive degradation. Level 1 is deliberately resolution-preserving
  // (only post-FX + solver iterations drop), so the common first downgrade
  // keeps the existing dye and causes no visible pop. Resolution only falls at
  // level 2+, which is rarer and happens mid-interaction (repaints instantly).
  const TIERS = [
    null,                                                                            // 0: full ceiling
    { pressure: 16, bloomIter: 6, sunrays: false, bloom: true,  fps: 60, splats: 5 },// 1
    { pressure: 12, bloomIter: 5, sunrays: false, bloom: false, fps: 50, dye: 640,
      splats: 3, mac: false, turb: 0 },                                              // 2
    { pressure: 10, bloomIter: 5, sunrays: false, bloom: false, fps: 45, dye: 448,
      sim: 96, splats: 2, mac: false, turb: 0, material: false },                    // 3
  ];
  const MAX_QUALITY_LEVEL = TIERS.length - 1;

  let targetFrameInterval = 1000 / CONFIG.TARGET_FPS;
  let qualityLevel = 0;

  // Mutate CONFIG knobs for a tier (no framebuffer work — the caller rebuilds).
  function configureTier(level) {
    const t = TIERS[level];
    CONFIG.PRESSURE_ITERATIONS = t ? Math.min(BASE.PRESSURE_ITERATIONS, t.pressure) : BASE.PRESSURE_ITERATIONS;
    CONFIG.DYE_RESOLUTION = t ? Math.min(BASE.DYE_RESOLUTION, t.dye ?? BASE.DYE_RESOLUTION) : BASE.DYE_RESOLUTION;
    CONFIG.SIM_RESOLUTION = t ? Math.min(BASE.SIM_RESOLUTION, t.sim ?? BASE.SIM_RESOLUTION) : BASE.SIM_RESOLUTION;
    CONFIG.BLOOM = t ? (BASE.BLOOM && t.bloom) : BASE.BLOOM;
    CONFIG.BLOOM_ITERATIONS = t ? Math.min(BASE.BLOOM_ITERATIONS, t.bloomIter) : BASE.BLOOM_ITERATIONS;
    CONFIG.SUNRAYS = t ? (BASE.SUNRAYS && t.sunrays) : BASE.SUNRAYS;
    CONFIG.TARGET_FPS = t ? Math.min(BASE.TARGET_FPS, t.fps) : BASE.TARGET_FPS;
    CONFIG.MAX_SPLATS_PER_FRAME = t
      ? Math.min(BASE.MAX_SPLATS_PER_FRAME, t.splats ?? BASE.MAX_SPLATS_PER_FRAME)
      : BASE.MAX_SPLATS_PER_FRAME;
    CONFIG.MACCORMACK = t ? (BASE.MACCORMACK && (t.mac ?? true)) : BASE.MACCORMACK;
    CONFIG.TURBULENCE = t ? Math.min(BASE.TURBULENCE, t.turb ?? BASE.TURBULENCE) : BASE.TURBULENCE;
    const material = t ? (t.material ?? true) : true;
    CONFIG.SPECULAR = material ? BASE.SPECULAR : 0;
    CONFIG.RIM = material ? BASE.RIM : 0;
    CONFIG.DITHER = material ? BASE.DITHER : 0;
    targetFrameInterval = 1000 / CONFIG.TARGET_FPS;
    qualityLevel = level;
  }

  // Apply a new tier at runtime, rebuilding only what changed. A resolution
  // change needs a full sim rebuild (loses dye — only at level 2+); otherwise
  // just the post-FX framebuffers are rebuilt, preserving the dye field.
  function setQualityLevel(level) {
    const prevDye = CONFIG.DYE_RESOLUTION;
    const prevSim = CONFIG.SIM_RESOLUTION;
    configureTier(level);
    if (CONFIG.DYE_RESOLUTION !== prevDye || CONFIG.SIM_RESOLUTION !== prevSim) {
      initFramebuffers();
    } else {
      rebuildPostFramebuffers();
    }
  }

  // Best-effort hardware probe → starting tier. Conservative: only clearly-weak
  // machines start reduced; the runtime monitor catches everything else.
  function detectStartLevel() {
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = dbg
      ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '')
      : '';
    // CPU-emulated GL (no real GPU) — the sim is unusably slow; keep the CSS fallback.
    if (/swiftshader|llvmpipe|software|basic render|softpipe/i.test(renderer)) return 'bail';
    const mem = navigator.deviceMemory;          // undefined on Safari/Firefox → treat as capable
    const cores = navigator.hardwareConcurrency;
    if (mem && mem <= 2) return 2;
    if (mem && cores && mem <= 4 && cores <= 4) return 1;
    return 0;
  }

  const startLevel = detectStartLevel();
  if (startLevel === 'bail') return noopHandle();

  /* -- programs -- */
  const copyProgram = createProgram(gl, BASE_VERT, COPY_FRAG);
  const clearProgram = createProgram(gl, BASE_VERT, CLEAR_FRAG);
  const colorProgram = createProgram(gl, BASE_VERT, COLOR_FRAG);
  const splatProgram = createProgram(gl, BASE_VERT, SPLAT_FRAG);
  const advectionProgram = createProgram(gl, BASE_VERT, ADVECTION_FRAG);
  const divergenceProgram = createProgram(gl, BASE_VERT, DIVERGENCE_FRAG);
  const curlProgram = createProgram(gl, BASE_VERT, CURL_FRAG);
  const vorticityProgram = createProgram(gl, BASE_VERT, VORTICITY_FRAG);
  const pressureProgram = createProgram(gl, BASE_VERT, PRESSURE_FRAG);
  const gradientSubtractProgram = createProgram(gl, BASE_VERT, GRADIENT_SUBTRACT_FRAG);
  const maccormackProgram = createProgram(gl, BASE_VERT, ADVECTION_MACCORMACK_FRAG);
  const noiseForceProgram = createProgram(gl, BASE_VERT, NOISE_FORCE_FRAG);

  const bloomPrefilterProgram = createProgram(gl, BASE_VERT, BLOOM_PREFILTER_FRAG);
  const bloomBlurProgram = createProgram(gl, BASE_VERT, BLOOM_BLUR_FRAG);
  const bloomFinalProgram = createProgram(gl, BASE_VERT, BLOOM_FINAL_FRAG);

  const sunraysMaskProgram = createProgram(gl, BASE_VERT, SUNRAYS_MASK_FRAG);
  const sunraysProgram = createProgram(gl, BASE_VERT, SUNRAYS_FRAG);

  const blurProgram = createProgram(gl, BLUR_VERT, BLUR_FRAG);

  const displayProgram = createProgram(gl, BASE_VERT, DISPLAY_FRAG);

  if (
    !copyProgram || !clearProgram || !colorProgram || !splatProgram ||
    !advectionProgram || !divergenceProgram || !curlProgram ||
    !vorticityProgram || !pressureProgram || !gradientSubtractProgram ||
    !maccormackProgram || !noiseForceProgram ||
    !bloomPrefilterProgram || !bloomBlurProgram || !bloomFinalProgram ||
    !sunraysMaskProgram || !sunraysProgram || !blurProgram || !displayProgram
  ) {
    return noopHandle();
  }

  /* -- full-screen quad -- */
  const quadBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 1, 2, 3]),
    gl.STATIC_DRAW,
  );

  function bindQuad(program) {
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    const loc = gl.getAttribLocation(program, 'aPosition');
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(loc);
  }

  function blit(target) {
    if (target == null) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  // Analytic dye-energy tracker. splat() feeds it, step() decays it with the
  // same dissipation applied to the dye field, and shouldRun() uses it as a
  // conservative "is anything still visible?" gate so the idle clear never
  // pops. Declared above the framebuffer section because initFramebuffers()
  // (which resets it — a rebuild empties the dye field) runs during init.
  let dyeEnergy = 0;
  let lastSplatAt = -Infinity;
  const DYE_ENERGY_EPS = 0.0005;

  /* -- framebuffers -- */
  let dye;
  let dyeTemp1; // MacCormack forward-advect scratch
  let dyeTemp2; // MacCormack backward-advect scratch
  let velocity;
  let divergence;
  let curl;
  let pressure;
  let bloom;
  let bloomFramebuffers = [];
  let sunrays;
  let sunraysTemp;

  function getResolution(resolution) {
    const aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight || 1;
    const w = aspectRatio < 1 ? resolution : Math.round(resolution * aspectRatio);
    const h = aspectRatio < 1 ? Math.round(resolution / aspectRatio) : resolution;
    return { width: Math.max(2, w), height: Math.max(2, h) };
  }

  function initBloomFramebuffers() {
    const res = getResolution(CONFIG.BLOOM_RESOLUTION);
    bloom = createFBO(gl, res.width, res.height, rgba.internalFormat, rgba.format, halfFloatTexType, filtering);
    bloomFramebuffers = [];
    for (let i = 0; i < CONFIG.BLOOM_ITERATIONS; i += 1) {
      const w = res.width >> (i + 1);
      const h = res.height >> (i + 1);
      if (w < 2 || h < 2) break;
      bloomFramebuffers.push(
        createFBO(gl, w, h, rgba.internalFormat, rgba.format, halfFloatTexType, filtering),
      );
    }
  }

  function initSunraysFramebuffers() {
    const res = getResolution(CONFIG.SUNRAYS_RESOLUTION);
    sunrays = createFBO(gl, res.width, res.height, rgba.internalFormat, rgba.format, halfFloatTexType, filtering);
    sunraysTemp = createFBO(gl, res.width, res.height, rgba.internalFormat, rgba.format, halfFloatTexType, filtering);
  }

  function destroyFBO(f) {
    if (!f) return;
    if (f.texture) gl.deleteTexture(f.texture);
    if (f.fbo) gl.deleteFramebuffer(f.fbo);
  }

  function destroyDoubleFBO(d) {
    if (!d) return;
    // read/write are getters over the two internal buffers; together they
    // cover both, regardless of how many swaps have happened.
    destroyFBO(d.read);
    destroyFBO(d.write);
  }

  function deleteSimFramebuffers() {
    destroyDoubleFBO(dye);
    destroyDoubleFBO(velocity);
    destroyDoubleFBO(pressure);
    destroyFBO(divergence);
    destroyFBO(curl);
    destroyFBO(dyeTemp1);
    destroyFBO(dyeTemp2);
    dye = velocity = pressure = divergence = curl = dyeTemp1 = dyeTemp2 = null;
  }

  function deletePostFramebuffers() {
    destroyFBO(bloom);
    for (let i = 0; i < bloomFramebuffers.length; i += 1) destroyFBO(bloomFramebuffers[i]);
    bloomFramebuffers = [];
    destroyFBO(sunrays);
    destroyFBO(sunraysTemp);
    bloom = sunrays = sunraysTemp = null;
  }

  // Rebuild only the post-FX framebuffers (bloom + sunrays), preserving the dye
  // field — used for resolution-preserving tier changes so there's no pop.
  function rebuildPostFramebuffers() {
    deletePostFramebuffers();
    initBloomFramebuffers();
    initSunraysFramebuffers();
  }

  function initFramebuffers() {
    // Free any existing GPU objects first. Previously this leaked a full set of
    // textures + framebuffers on every resize.
    deleteSimFramebuffers();
    deletePostFramebuffers();
    const simRes = getResolution(CONFIG.SIM_RESOLUTION);
    const dyeRes = getResolution(CONFIG.DYE_RESOLUTION);
    dye = createDoubleFBO(gl, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, halfFloatTexType, filtering);
    // MacCormack scratch buffers. Gated on BASE (not CONFIG): tiers only AND
    // down from BASE, so if the device ceiling disables MacCormack the temps
    // can never be needed — but a runtime tier toggle of CONFIG.MACCORMACK
    // must not depend on conditional allocation, hence BASE. step() also
    // null-checks before using them.
    if (BASE.MACCORMACK) {
      dyeTemp1 = createFBO(gl, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, halfFloatTexType, filtering);
      dyeTemp2 = createFBO(gl, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, halfFloatTexType, filtering);
    }
    velocity = createDoubleFBO(gl, simRes.width, simRes.height, rgba.internalFormat, rgba.format, halfFloatTexType, filtering);
    divergence = createFBO(gl, simRes.width, simRes.height, rgba.internalFormat, rgba.format, halfFloatTexType, gl.NEAREST);
    curl = createFBO(gl, simRes.width, simRes.height, rgba.internalFormat, rgba.format, halfFloatTexType, gl.NEAREST);
    pressure = createDoubleFBO(gl, simRes.width, simRes.height, rgba.internalFormat, rgba.format, halfFloatTexType, gl.NEAREST);
    initBloomFramebuffers();
    initSunraysFramebuffers();
    // The rebuild empties every field; keep the analytic tracker in sync so
    // the sleep gate doesn't hold the loop awake rendering nothing.
    dyeEnergy = 0;
  }

  /* -- canvas sizing -- */
  let pendingResize = false;
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.DPR_CAP);
    const w = Math.max(1, Math.floor(wrapper.clientWidth * dpr));
    const h = Math.max(1, Math.floor(wrapper.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      pendingResize = true;
    }
  }
  resizeCanvas();
  configureTier(startLevel); // apply the hardware-probed starting tier before allocating
  initFramebuffers();
  pendingResize = false;

  /* -- splat -- */
  function correctRadius(radius) {
    const ar = canvas.width / canvas.height;
    if (ar > 1) return radius * ar;
    return radius;
  }

  function splat(x, y, dx, dy, color, opts) {
    const stretch = opts && opts.stretch ? opts.stretch : 0.0;
    const radiusScale = opts && opts.radiusScale ? opts.radiusScale : 1.0;
    const aspect = canvas.width / canvas.height;
    // Stroke tangent for the anisotropic dye deposit, normalized in the
    // shader's aspect-corrected space. Isotropic (any unit vector works)
    // when stretch is 0.
    let dirX = 1.0;
    let dirY = 0.0;
    if (stretch > 0 && opts) {
      const ax = (opts.dirX || 0) * aspect;
      const ay = opts.dirY || 0;
      const len = Math.hypot(ax, ay);
      if (len > 1e-6) {
        dirX = ax / len;
        dirY = ay / len;
      }
    }
    // radiusScale is squared because the uniform is the Gaussian's variance;
    // squaring makes the VISIBLE radius scale linearly with radiusScale.
    const radiusParam = correctRadius(
      (CONFIG.SPLAT_RADIUS / 100.0) * radiusScale * radiusScale,
    );

    gl.useProgram(splatProgram.program);
    bindQuad(splatProgram.program);
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, aspect);
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0);
    gl.uniform2f(splatProgram.uniforms.uDir, 1.0, 0.0);
    gl.uniform1f(splatProgram.uniforms.uStretch, 0.0); // velocity stays isotropic
    gl.uniform1f(splatProgram.uniforms.radius, radiusParam);
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    gl.uniform2f(splatProgram.uniforms.uDir, dirX, dirY);
    gl.uniform1f(splatProgram.uniforms.uStretch, stretch);
    blit(dye.write);
    dye.swap();

    dyeEnergy += color.r + color.g + color.b;
    lastSplatAt = performance.now();
  }

  /* -- pointer input --
     Per-pointer state keyed by pointerId. A Map (rather than a single shared
     struct) keeps simultaneous touches independent — a second finger no
     longer corrupts the first one's prev-position and slashes a spurious
     streak across the hero. Mouse paints on hover without a button press
     (desktop behavior unchanged); touch entries live from pointerdown to
     pointerup/cancel, so single-finger scrolling over the hero still paints
     exactly as before, and two-finger play now works. */
  const pointers = new Map();

  function toUV(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: 1.0 - (e.clientY - rect.top) / rect.height,
    };
  }

  function createPointerEntry(e) {
    const uv = toUV(e);
    const entry = {
      isMouse: e.pointerType === 'mouse' || e.pointerType === '',
      prevX: uv.x,      // last position already emitted into the field
      prevY: uv.y,      // (seeded at creation → first segment has zero length)
      samples: [],      // pending {x, y} stroke samples since the last drain
      color: generateColor(),
      needsPuff: false, // emit a stationary press puff on the next drain
      dead: false,      // drain once more, then remove
      isDown: false,    // pressed — protects held-still touches from the sweep
      lastSeenAt: performance.now(),
    };
    pointers.set(e.pointerId, entry);
    return entry;
  }

  function pushSamples(entry, e) {
    // Coalesced events recover the full input path on high-rate pointing
    // devices (feature-detected — Safari lacks getCoalescedEvents).
    let list = null;
    if (typeof e.getCoalescedEvents === 'function') list = e.getCoalescedEvents();
    if (!list || list.length === 0) list = [e];
    for (let i = 0; i < list.length; i += 1) {
      entry.samples.push(toUV(list[i]));
      if (entry.samples.length > 32) entry.samples.shift();
    }
    entry.lastSeenAt = performance.now();
  }

  const onPointerMove = (e) => {
    let entry = pointers.get(e.pointerId);
    if (!entry) {
      // Mouse paints on hover. A buttons>0 fallback also recreates entries
      // for touch/pen if a pointerdown was missed mid-gesture.
      if (e.pointerType === 'mouse' || e.pointerType === '' || e.buttons > 0) {
        entry = createPointerEntry(e);
      } else {
        return;
      }
    }
    pushSamples(entry, e);
    noteActivity();
  };
  const onPointerDown = (e) => {
    const entry = pointers.get(e.pointerId) || createPointerEntry(e);
    entry.color = generateColor();
    entry.needsPuff = true;
    entry.dead = false;
    entry.isDown = true;
    pushSamples(entry, e);
    noteActivity();
  };
  const onPointerEnter = (e) => {
    // Re-seed the mouse entry at the entry position so the first move can't
    // emit a giant cross-hero segment.
    if (e.pointerType === 'mouse' || e.pointerType === '') {
      pointers.delete(e.pointerId);
      createPointerEntry(e);
      noteActivity(); // wake the loop so the field is live as the cursor starts moving
    }
  };
  const onPointerRelease = (e) => {
    const entry = pointers.get(e.pointerId);
    if (!entry) return;
    entry.isDown = false;
    if (entry.isMouse) return; // mouse keeps hover-painting until pointerleave
    entry.dead = true;
  };
  const onPointerLeave = (e) => {
    const entry = pointers.get(e.pointerId);
    if (entry) entry.dead = true;
  };

  wrapper.addEventListener('pointermove', onPointerMove);
  wrapper.addEventListener('pointerdown', onPointerDown);
  wrapper.addEventListener('pointerenter', onPointerEnter);
  wrapper.addEventListener('pointerleave', onPointerLeave);
  wrapper.addEventListener('pointerup', onPointerRelease);
  wrapper.addEventListener('pointercancel', onPointerRelease);
  wrapper.addEventListener('lostpointercapture', onPointerRelease);

  /* -- stroke emitter --
     Drains each pointer's queued samples once per frame, laying overlapping
     sub-splats along the stroke polyline so fast swipes read as continuous
     ribbons instead of dotted puffs. The per-frame splat budget is tier-set
     and split across active pointers. Stroke speed shapes the deposit
     (hue-neutral): fast strokes stretch along the tangent, widen, and thin
     out; slow strokes stay compact and dense. */
  // Returns the number of splats actually emitted, so emitStrokes can hold
  // the frame's total to the tier budget across any number of pointers.
  function drainPointer(p, dt, budget) {
    const samples = p.samples;
    if (samples.length === 0 && !p.needsPuff) return 0;

    let total = 0;
    {
      let px = p.prevX;
      let py = p.prevY;
      for (let i = 0; i < samples.length; i += 1) {
        total += Math.hypot(samples[i].x - px, samples[i].y - py);
        px = samples[i].x;
        py = samples[i].y;
      }
    }
    const last = samples.length > 0
      ? samples[samples.length - 1]
      : { x: p.prevX, y: p.prevY };

    if (total < 1e-5) {
      let puffed = 0;
      if (p.needsPuff) {
        // Stationary press: one compact puff, no velocity kick.
        splat(last.x, last.y, 0, 0, p.color);
        p.needsPuff = false;
        puffed = 1;
      }
      p.prevX = last.x;
      p.prevY = last.y;
      samples.length = 0;
      return puffed;
    }
    p.needsPuff = false;

    const speed = Math.min(total / Math.max(dt, 1e-3), 6.0); // UV units/s
    const shape = smoothstep(0.0, 3.0, speed);
    const radiusScale = lerp(0.75, 1.7, shape);
    const intensityScale = lerp(1.2, 0.55, shape);
    const stretch = Math.min(speed * 0.5, 1.5);

    // Space sub-splats ~0.6σ apart so overlapping Gaussians fuse seamlessly.
    const sigma = Math.sqrt(
      correctRadius((CONFIG.SPLAT_RADIUS / 100.0) * radiusScale * radiusScale),
    );
    const spacing = Math.max(0.6 * sigma, 0.004);
    const count = Math.min(Math.max(1, Math.ceil(total / spacing)), budget);

    // Each site gets the same velocity magnitude the old single splat got:
    // the whole frame's path delta (clamped against stall spikes), applied
    // along the local tangent.
    const kick = Math.min(total, 0.25) * 6.0 * CONFIG.SPLAT_FORCE;

    // Dye is normalized by sub-splat count, so a fast ribbon deposits the
    // same total dye per frame as the old single splat (whiteout guard).
    const c = {
      r: (p.color.r * intensityScale) / count,
      g: (p.color.g * intensityScale) / count,
      b: (p.color.b * intensityScale) / count,
    };

    // Walk the polyline at even arc-length steps.
    const stride = total / count;
    let targetArc = stride * 0.5;
    let walked = 0;
    let px = p.prevX;
    let py = p.prevY;
    let emitted = 0;
    for (let i = 0; i < samples.length && emitted < count; i += 1) {
      const sx = samples[i].x;
      const sy = samples[i].y;
      const segLen = Math.hypot(sx - px, sy - py);
      if (segLen > 1e-6) {
        const tx = (sx - px) / segLen;
        const ty = (sy - py) / segLen;
        while (targetArc <= walked + segLen && emitted < count) {
          const f = (targetArc - walked) / segLen;
          splat(
            px + (sx - px) * f,
            py + (sy - py) * f,
            tx * kick,
            ty * kick,
            c,
            { dirX: tx, dirY: ty, stretch, radiusScale },
          );
          emitted += 1;
          targetArc += stride;
        }
        walked += segLen;
      }
      px = sx;
      py = sy;
    }
    p.prevX = last.x;
    p.prevY = last.y;
    samples.length = 0;
    return emitted;
  }

  function emitStrokes(dt) {
    if (pointers.size === 0) return;
    let active = 0;
    pointers.forEach((p) => {
      if (p.samples.length > 0 || p.needsPuff) active += 1;
    });
    const now = performance.now();
    // The tier budget is a hard per-frame total: split evenly across active
    // pointers, and stop draining once spent. Skipped pointers keep their
    // queued samples and drain next frame.
    let remaining = CONFIG.MAX_SPLATS_PER_FRAME;
    const perPointer = active > 0
      ? Math.max(1, Math.floor(CONFIG.MAX_SPLATS_PER_FRAME / active))
      : 0;
    pointers.forEach((p, id) => {
      if (active > 0 && remaining > 0 && (p.samples.length > 0 || p.needsPuff)) {
        remaining -= drainPointer(p, dt, Math.min(perPointer, remaining));
      }
      // Sweep: entries marked dead (released/left) after their final drain;
      // stale non-pressed touch entries whose pointerup was lost; and — as a
      // leak backstop — any non-mouse entry idle for a minute (a held-still
      // pressed finger is protected by the isDown check until then).
      if (
        p.dead
        || (!p.isMouse && !p.isDown && now - p.lastSeenAt > 2000)
        || (!p.isMouse && now - p.lastSeenAt > 60000)
      ) {
        pointers.delete(id);
      }
    });
  }

  /* -- auto-splats (x.ai ambient motion) -- */
  let lastAutoSplatAt = 0;

  function primeCanvas() {
    // Seed 4 nebula clouds spread across the hero with barely any velocity,
    // so the opening frame shows soft blooms instead of explosions.
    for (let i = 0; i < 4; i += 1) {
      const color = generateColor();
      color.r *= 10;
      color.g *= 10;
      color.b *= 10;
      const x = 0.15 + Math.random() * 0.7;
      const y = 0.15 + Math.random() * 0.7;
      const dx = CONFIG.PRIME_SPLAT_VELOCITY * (Math.random() - 0.5);
      const dy = CONFIG.PRIME_SPLAT_VELOCITY * (Math.random() - 0.5);
      splat(x, y, dx, dy, color);
    }
  }
  if (CONFIG.PRIME_CANVAS) primeCanvas();

  function maybeAutoSplat(now) {
    if (!CONFIG.AUTO_SPLAT) return;
    if (now - lastAutoSplatAt < CONFIG.AUTO_SPLAT_INTERVAL_MS) return;
    lastAutoSplatAt = now;
    const color = generateColor();
    color.r *= 10;
    color.g *= 10;
    color.b *= 10;
    const x = Math.random();
    const y = Math.random();
    const dx = CONFIG.AUTO_SPLAT_VELOCITY * (Math.random() - 0.5);
    const dy = CONFIG.AUTO_SPLAT_VELOCITY * (Math.random() - 0.5);
    splat(x, y, dx, dy, color);
  }

  /* -- simulation step --
     effCurl / effDissipation are the per-frame "afterlife" values derived in
     loop() (blossom + evaporation envelopes over the CONFIG baselines) —
     CONFIG itself is never mutated here, configureTier() owns it. */
  function step(dt, now, effCurl, effDissipation) {
    gl.disable(gl.BLEND);

    // Curl.
    gl.useProgram(curlProgram.program);
    bindQuad(curlProgram.program);
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl);

    // Vorticity confinement.
    gl.useProgram(vorticityProgram.program);
    bindQuad(vorticityProgram.program);
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, effCurl);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    // Curl-noise micro-turbulence (energy-gated in the shader; skipped
    // entirely on tiers that zero the strength).
    if (CONFIG.TURBULENCE > 0) {
      // Wrap hourly to keep float32 precision in the shader; the once-an-hour
      // one-frame jump in the noise drift is imperceptible.
      const shaderTime = (now % 3600000) * 0.001;
      gl.useProgram(noiseForceProgram.program);
      bindQuad(noiseForceProgram.program);
      gl.uniform2f(noiseForceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(noiseForceProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1f(noiseForceProgram.uniforms.uTime, shaderTime);
      gl.uniform1f(noiseForceProgram.uniforms.uStrength, CONFIG.TURBULENCE);
      gl.uniform1f(noiseForceProgram.uniforms.uNoiseScale, 7.0);
      gl.uniform1f(noiseForceProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();
    }

    // Divergence.
    gl.useProgram(divergenceProgram.program);
    bindQuad(divergenceProgram.program);
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    // Pressure retention.
    gl.useProgram(clearProgram.program);
    bindQuad(clearProgram.program);
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProgram.uniforms.value, CONFIG.PRESSURE);
    blit(pressure.write);
    pressure.swap();

    // Pressure solve.
    gl.useProgram(pressureProgram.program);
    bindQuad(pressureProgram.program);
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < CONFIG.PRESSURE_ITERATIONS; i += 1) {
      gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
      blit(pressure.write);
      pressure.swap();
    }

    // Gradient subtract.
    gl.useProgram(gradientSubtractProgram.program);
    bindQuad(gradientSubtractProgram.program);
    gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    // Advect velocity.
    gl.useProgram(advectionProgram.program);
    bindQuad(advectionProgram.program);
    gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    const velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(
      advectionProgram.uniforms.dissipation,
      1.0 / (1.0 + CONFIG.VELOCITY_DISSIPATION * dt),
    );
    blit(velocity.write);
    velocity.swap();

    // Advect dye — MacCormack (second-order) on capable tiers keeps filament
    // edges crisp for seconds; plain semi-Lagrangian is the low-tier
    // fallback. Both apply the effective dissipation exactly once.
    const dyeDissipation = 1.0 / (1.0 + effDissipation * dt);
    gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
    if (CONFIG.MACCORMACK && dyeTemp1 && dyeTemp2) {
      // Forward advect (no dissipation — applied once in the correction).
      gl.uniform1f(advectionProgram.uniforms.dissipation, 1.0);
      blit(dyeTemp1);
      // Backward advect the result (dt negated).
      gl.uniform1f(advectionProgram.uniforms.dt, -dt);
      gl.uniform1i(advectionProgram.uniforms.uSource, dyeTemp1.attach(1));
      blit(dyeTemp2);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      // Limited correction.
      gl.useProgram(maccormackProgram.program);
      bindQuad(maccormackProgram.program);
      gl.uniform2f(maccormackProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform2f(maccormackProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1i(maccormackProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(maccormackProgram.uniforms.uPhiN, dye.read.attach(1));
      gl.uniform1i(maccormackProgram.uniforms.uPhi1, dyeTemp1.attach(2));
      gl.uniform1i(maccormackProgram.uniforms.uPhi2, dyeTemp2.attach(3));
      gl.uniform1f(maccormackProgram.uniforms.dt, dt);
      gl.uniform1f(maccormackProgram.uniforms.dissipation, dyeDissipation);
      blit(dye.write);
    } else {
      gl.uniform1f(advectionProgram.uniforms.dissipation, dyeDissipation);
      blit(dye.write);
    }
    dye.swap();

    // Mirror the dye decay in the analytic energy tracker (idle-gate input).
    dyeEnergy *= dyeDissipation;
  }

  /* -- bloom pipeline -- */
  function applyBloom(source, destination) {
    if (bloomFramebuffers.length < 2) return;
    let last = destination;

    gl.disable(gl.BLEND);

    // Prefilter into destination.
    gl.useProgram(bloomPrefilterProgram.program);
    bindQuad(bloomPrefilterProgram.program);
    const knee = CONFIG.BLOOM_THRESHOLD * CONFIG.BLOOM_SOFT_KNEE + 0.0001;
    const curve0 = CONFIG.BLOOM_THRESHOLD - knee;
    const curve1 = knee * 2;
    const curve2 = 0.25 / knee;
    gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
    gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, CONFIG.BLOOM_THRESHOLD);
    gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
    blit(last);

    // Iterative downsample.
    gl.useProgram(bloomBlurProgram.program);
    bindQuad(bloomBlurProgram.program);
    for (let i = 0; i < bloomFramebuffers.length; i += 1) {
      const dest = bloomFramebuffers[i];
      gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
      blit(dest);
      last = dest;
    }

    // Iterative upsample — additive.
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);
    for (let i = bloomFramebuffers.length - 2; i >= 0; i -= 1) {
      const baseTex = bloomFramebuffers[i];
      gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
      blit(baseTex);
      last = baseTex;
    }

    gl.disable(gl.BLEND);

    // Final.
    gl.useProgram(bloomFinalProgram.program);
    bindQuad(bloomFinalProgram.program);
    gl.uniform2f(bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
    gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
    gl.uniform1f(bloomFinalProgram.uniforms.intensity, CONFIG.BLOOM_INTENSITY);
    blit(destination);
  }

  /* -- sunrays pipeline -- */
  function applySunrays(source, mask, destination) {
    gl.disable(gl.BLEND);
    gl.useProgram(sunraysMaskProgram.program);
    bindQuad(sunraysMaskProgram.program);
    gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
    blit(mask);

    gl.useProgram(sunraysProgram.program);
    bindQuad(sunraysProgram.program);
    gl.uniform1f(sunraysProgram.uniforms.weight, CONFIG.SUNRAYS_WEIGHT);
    gl.uniform1i(sunraysProgram.uniforms.uTexture, mask.attach(0));
    blit(destination);
  }

  function blur(target, temp, iterations) {
    gl.useProgram(blurProgram.program);
    bindQuad(blurProgram.program);
    for (let i = 0; i < iterations; i += 1) {
      gl.uniform2f(blurProgram.uniforms.texelSize, target.texelSizeX, 0.0);
      gl.uniform1i(blurProgram.uniforms.uTexture, target.attach(0));
      blit(temp);

      gl.uniform2f(blurProgram.uniforms.texelSize, 0.0, target.texelSizeY);
      gl.uniform1i(blurProgram.uniforms.uTexture, temp.attach(0));
      blit(target);
    }
  }

  /* -- render pass -- */
  // Dark mode doubles the dither amplitude — banding shows most against the
  // near-black slate. Polled cheaply every few frames in loop().
  let themeDitherScale = 1.0;

  function render(now) {
    if (CONFIG.BLOOM) applyBloom(dye.read, bloom);
    if (CONFIG.SUNRAYS) {
      applySunrays(dye.read, dye.write, sunrays);
      blur(sunrays, sunraysTemp, 1);
    }

    // Clear the default framebuffer to transparent so the CSS gradient
    // underneath shows through in negative space. The dye paints nebula
    // clouds on top of the pink base layer.
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(CONFIG.BACK_COLOR.r, CONFIG.BACK_COLOR.g, CONFIG.BACK_COLOR.b, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Premultiplied-style additive compositing with the transparent clear
    // — wherever the dye is bright, it overlays the gradient; wherever it
    // fades to zero, the gradient shows through unchanged.
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    gl.useProgram(displayProgram.program);
    bindQuad(displayProgram.program);
    gl.uniform2f(
      displayProgram.uniforms.texelSize,
      1.0 / gl.drawingBufferWidth,
      1.0 / gl.drawingBufferHeight,
    );
    gl.uniform1i(displayProgram.uniforms.uTexture, dye.read.attach(0));
    gl.uniform1i(displayProgram.uniforms.uBloom, bloom.attach(1));
    gl.uniform1i(displayProgram.uniforms.uSunrays, sunrays.attach(2));
    gl.uniform1f(displayProgram.uniforms.uApplyBloom, CONFIG.BLOOM ? 1.0 : 0.0);
    gl.uniform1f(displayProgram.uniforms.uApplySunrays, CONFIG.SUNRAYS ? 1.0 : 0.0);
    // Material pass: key light drifts on a slow Lissajous (~30s periods) so
    // the specular glint glides across billowing crests.
    const t = (now % 3600000) * 0.001;
    const lx = 0.45 * Math.sin(t * 0.21);
    const ly = 0.40 * Math.cos(t * 0.17);
    const ll = Math.sqrt(lx * lx + ly * ly + 0.62 * 0.62);
    gl.uniform3f(displayProgram.uniforms.uLightDir, lx / ll, ly / ll, 0.62 / ll);
    gl.uniform1f(displayProgram.uniforms.uSpecular, CONFIG.SPECULAR);
    gl.uniform1f(displayProgram.uniforms.uRim, CONFIG.RIM);
    gl.uniform1f(displayProgram.uniforms.uDither, CONFIG.DITHER * themeDitherScale);
    gl.uniform1f(displayProgram.uniforms.uTime, t);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

    gl.disable(gl.BLEND);
  }

  /* -- main loop -- */
  let rafId = 0;                  // 0 == no RAF in flight (single-scheduling invariant)
  let lastTime = performance.now();
  let lastFrameAt = 0;            // timestamp of the last RENDERED frame (0 = none yet)
  // At default config (no auto-splats / no prime) the resting hero is just the
  // CSS gradient, so we start asleep and wake on the first pointer interaction.
  let lastActivityAt = CONFIG.PRIME_CANVAS ? performance.now() : -Infinity;
  let intersecting = true;
  let destroyed = false;

  // Adaptive-quality frame-time monitor (downgrade-only).
  const ADAPT_WINDOW = 90;        // rendered frames per measurement window (~1.5s @60fps)
  const ADAPT_COOLDOWN_MS = 4000; // minimum gap between downgrades
  let sampleSum = 0;
  let sampleCount = 0;
  let lastDowngradeAt = 0;
  let warmupUntil = 0;            // ignore frame-time samples until this time (settling)

  function resetMonitor() {
    sampleSum = 0;
    sampleCount = 0;
    warmupUntil = performance.now() + 700;
  }

  function clearCanvasToTransparent() {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  // Zero the sim fields on the way to sleep, so the next wake starts from a
  // pristine state: no stale-dye pop-in on re-hover, and the (self-feeding)
  // turbulence gate has provably nothing to act on while asleep.
  function clearSimTextures() {
    gl.disable(gl.BLEND);
    const targets = [
      dye && dye.read, dye && dye.write,
      velocity && velocity.read, velocity && velocity.write,
      pressure && pressure.read, pressure && pressure.write,
    ];
    for (let i = 0; i < targets.length; i += 1) {
      const target = targets[i];
      if (!target) continue;
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.viewport(0, 0, target.width, target.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    dyeEnergy = 0;
  }

  // Weak tiers shorten the post-input afterlife so the loop spends less
  // extra time awake after the last interaction.
  function idleHardCapMs() {
    return qualityLevel >= 2
      ? Math.min(CONFIG.IDLE_HARD_CAP_MS, 6000)
      : CONFIG.IDLE_HARD_CAP_MS;
  }

  // The sim renders only while the hero is on-screen AND recently interacted
  // with (or AUTO_SPLAT is on). Sleeping when idle is the single biggest saving
  // — the resting hero is visually just the CSS gradient. Past the activity
  // window, the loop stays up only while the analytic dye energy says the
  // field is still visibly decaying (pop-free sleep), bounded by a hard cap.
  function shouldRun() {
    if (destroyed || !intersecting) return false;
    if (CONFIG.AUTO_SPLAT) return true;
    const idle = performance.now() - lastActivityAt;
    if (idle < CONFIG.IDLE_TIMEOUT_MS) return true;
    return dyeEnergy > DYE_ENERGY_EPS && idle < idleHardCapMs();
  }

  function ensureRunning() {
    if (rafId !== 0 || !shouldRun()) return; // one in-flight RAF; never double-schedule
    lastTime = performance.now();            // reset so resuming doesn't spike dt
    lastFrameAt = 0;
    resetMonitor();
    rafId = requestAnimationFrame(loop);
  }

  function noteActivity() {
    lastActivityAt = performance.now();
    ensureRunning();
  }

  function maybeDowngradeQuality(now) {
    if (!CONFIG.ADAPTIVE_QUALITY || qualityLevel >= MAX_QUALITY_LEVEL) return;
    if (sampleCount < ADAPT_WINDOW) return;
    const avg = sampleSum / sampleCount;
    sampleSum = 0;
    sampleCount = 0;
    // Sustained breach of 1.6× the target interval => this device can't hold the
    // current tier; step down one level (downgrade-only — avoids oscillation).
    if (avg > targetFrameInterval * 1.6 && now - lastDowngradeAt > ADAPT_COOLDOWN_MS) {
      lastDowngradeAt = now;
      setQualityLevel(qualityLevel + 1);
      warmupUntil = now + 700;
    }
  }

  let themeCheckCounter = 0;

  function loop(now) {
    rafId = 0;
    if (!shouldRun()) {
      // Going idle while on-screen: clear the canvas AND the sim fields so
      // the resting hero is exactly the CSS gradient and the next wake
      // starts pristine. (Offscreen needs no clear — not composited.)
      if (!destroyed && intersecting) {
        clearSimTextures();
        clearCanvasToTransparent();
      }
      return;
    }

    // Frame-rate cap: skip work until the target interval elapses. Stops 120Hz
    // panels from running the whole pipeline twice as often as needed.
    if (lastFrameAt !== 0 && now - lastFrameAt < targetFrameInterval - 1) {
      rafId = requestAnimationFrame(loop);
      return;
    }

    // Clamp dt to one target-frame interval: protects the solver from a huge
    // step after a stall/resume, and — unlike a hardcoded 60fps clamp — keeps
    // motion real-time at lower-fps tiers instead of dropping into slow-motion.
    // Floor at 0: a resume's RAF timestamp can precede the performance.now()
    // captured in ensureRunning, and a negative dt would run the solver
    // backwards (dissipation < 1 becomes amplification).
    const dt = Math.min(1 / CONFIG.TARGET_FPS, Math.max(0, (now - lastTime) / 1000));
    lastTime = now;

    // Adaptive sampling — interval between *rendered* frames (skips excluded).
    if (lastFrameAt !== 0 && now > warmupUntil) {
      sampleSum += now - lastFrameAt;
      sampleCount += 1;
      maybeDowngradeQuality(now);
    }
    lastFrameAt = now;

    if (pendingResize) {
      initFramebuffers();
      pendingResize = false;
      resetMonitor();
    }

    maybeAutoSplat(now);
    emitStrokes(dt);

    // Afterlife choreography: in the seconds after the last splat, vorticity
    // eases up (the ribbon curls into filigree) while dye dissipation eases
    // down (it lingers) — then both ease back, and an evaporation ramp
    // guarantees the field is invisible before the idle hard cap, so the
    // sleep clear can never pop. All derived per-frame locals; CONFIG is
    // never mutated (configureTier() owns it).
    const tSince = (now - lastSplatAt) / 1000;
    const blossomEnd = qualityLevel >= 2 ? 1.5 : 2.8;
    const env = smoothstep(0.15, 0.9, tSince)
      * (1 - smoothstep(blossomEnd - 1.0, blossomEnd, tSince));
    const hardCapS = idleHardCapMs() / 1000;
    const evap = smoothstep(hardCapS - 3.5, hardCapS - 1.0, tSince);
    const effCurl = CONFIG.CURL + CONFIG.BLOSSOM_CURL * env;
    const effDissipation = lerp(
      lerp(CONFIG.DENSITY_DISSIPATION, 0.38, env),
      1.8,
      evap,
    );

    // Cheap DOM poll so the dither amplitude tracks live theme switches.
    themeCheckCounter += 1;
    if ((themeCheckCounter & 31) === 1) {
      themeDitherScale =
        document.documentElement.getAttribute('data-theme') === 'dark' ? 2.0 : 1.0;
    }

    step(dt, now, effCurl, effDissipation);
    render(now);
    rafId = requestAnimationFrame(loop);
  }

  // Pause when the hero scrolls out of view; resume (unless idle) when it returns.
  let io = null;
  if (typeof IntersectionObserver !== 'undefined') {
    io = new IntersectionObserver((entries) => {
      for (const entry of entries) intersecting = entry.isIntersecting;
      if (intersecting) {
        // Back on-screen. The offscreen branch cancels the RAF directly
        // (bypassing loop()'s sleep-clear), so if the sleep gate expired
        // while scrolled away, the canvas still shows its last presented
        // frame and the fields still hold stale dye. Clear both before
        // waking, or the hero re-enters as a frozen 10-second-old ribbon
        // that would reanimate on the next hover.
        if (!shouldRun()) {
          clearSimTextures();
          clearCanvasToTransparent();
        }
        ensureRunning();
      } else if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }, { threshold: 0 });
    io.observe(wrapper);
  }

  ensureRunning();

  return {
    resize() {
      resizeCanvas();
    },
    destroy() {
      destroyed = true;
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      if (io) io.disconnect();
      wrapper.removeEventListener('pointermove', onPointerMove);
      wrapper.removeEventListener('pointerdown', onPointerDown);
      wrapper.removeEventListener('pointerenter', onPointerEnter);
      wrapper.removeEventListener('pointerleave', onPointerLeave);
      wrapper.removeEventListener('pointerup', onPointerRelease);
      wrapper.removeEventListener('pointercancel', onPointerRelease);
      wrapper.removeEventListener('lostpointercapture', onPointerRelease);
      pointers.clear();
      deleteSimFramebuffers();
      deletePostFramebuffers();
      const ext = gl.getExtension('WEBGL_lose_context');
      if (ext) ext.loseContext();
    },
  };
}

/* No-op handle returned when WebGL or half-float support is missing. The
   caller keeps the CSS fallback background visible. */
function noopHandle() {
  return { resize() {}, destroy() {} };
}

export default initFluid;
