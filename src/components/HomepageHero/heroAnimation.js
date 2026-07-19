import {createTimeline} from 'animejs';

/*
 * Hero swoop entrance, ported from the swift.org homepage animation
 * (swift-org-website, Apache-2.0 — assets/javascripts/new-javascripts/hero.js
 * via its Docusaurus recreation). The five painted swoop layers are revealed by
 * animating a fat round-cap stroke's lineDashOffset along the artwork's
 * centerline path, then compositing the painting through the stroke with
 * globalCompositeOperation: 'source-in'. Geometry, path lengths, line widths
 * and timings are kept verbatim; the art itself is re-tinted to the OpenLM
 * palette (see static/img/homepage/hero/).
 *
 * Two deliberate departures from the original:
 *  - Asset URLs are injected (webpack-hashed imports, baseUrl-safe) instead of
 *    hardcoded absolute paths.
 *  - The docking logo is the OpenLM O-mark drawn as vector Path2D fills
 *    (theme-aware: outer glyph flips with light/dark, inner stays brand blue)
 *    rather than a bitmap. A MutationObserver re-tints it when the Docusaurus
 *    theme toggles after the entrance has finished.
 */

// The OpenLM "O" glyph, verbatim from static/img/openlm-logo.svg (first two
// paths of the wordmark). Glyph bounds: x 4.93–179.26, y 0–174.13.
const LOGO_OUTER =
  'M 147.542969 12.191406 C 135.789062 4.238281 121.917969 -0.0078125 107.726562 0 L 91.96875 0 L 91.96875 31.40625 L 102.816406 31.40625 C 106.140625 31.40625 109.457031 31.769531 112.703125 32.488281 C 121.96875 34.539062 130.335938 39.488281 136.601562 46.613281 C 142.863281 53.742188 146.699219 62.675781 147.542969 72.128906 C 147.542969 73.535156 147.542969 100.597656 147.542969 102.003906 C 146.976562 107.703125 145.285156 113.234375 142.566406 118.277344 C 139.5625 124.140625 135.308594 129.269531 130.105469 133.308594 C 124.898438 137.34375 118.875 140.191406 112.449219 141.640625 C 109.578125 142.296875 106.652344 142.660156 103.707031 142.726562 L 80.097656 142.726562 C 68.722656 142.492188 57.863281 137.921875 49.742188 129.949219 C 41.617188 121.976562 36.84375 111.207031 36.390625 99.832031 C 36.390625 99.128906 36.390625 98.492188 36.390625 97.789062 C 36.390625 97.085938 36.390625 96.511719 36.390625 95.875 L 36.390625 87.128906 L 4.933594 87.128906 L 4.933594 102.703125 C 4.925781 121.332031 12.195312 139.222656 25.1875 152.566406 C 38.179688 165.910156 55.871094 173.648438 74.484375 174.132812 L 109.578125 174.132812 C 123.238281 173.855469 136.53125 169.644531 147.863281 162.003906 C 156.835938 155.976562 164.324219 147.988281 169.761719 138.644531 C 175.199219 129.304688 178.445312 118.847656 179.257812 108.066406 L 179.257812 66.128906 C 178.445312 55.347656 175.199219 44.890625 169.761719 35.546875 C 164.324219 26.207031 156.835938 18.21875 147.863281 12.191406 Z';
const LOGO_INNER =
  'M 132.039062 79.214844 L 132.039062 94.980469 C 132.039062 99.199219 131.203125 103.375 129.578125 107.269531 C 127.957031 111.160156 125.578125 114.695312 122.582031 117.660156 C 119.582031 120.628906 116.027344 122.972656 112.121094 124.558594 C 108.214844 126.144531 104.03125 126.9375 99.8125 126.894531 L 83.542969 126.894531 C 75.082031 126.894531 66.96875 123.535156 60.984375 117.546875 C 55 111.5625 51.640625 103.445312 51.640625 94.980469 L 51.640625 79.214844 C 51.640625 70.75 55 62.632812 60.984375 56.644531 C 66.96875 50.660156 75.082031 47.296875 83.542969 47.296875 L 99.8125 47.296875 C 104.03125 47.257812 108.214844 48.050781 112.121094 49.636719 C 116.027344 51.222656 119.582031 53.566406 122.582031 56.53125 C 125.578125 59.5 127.957031 63.03125 129.578125 66.925781 C 131.203125 70.820312 132.039062 74.996094 132.039062 79.214844 Z';
const LOGO_BOX = {x: 4.93, y: 0, w: 174.33, h: 174.13};
// Sampled from static/img/logo.png — the mark's exact brand blue.
const LOGO_BLUE = '#2f79eb';
// Rendered width of the mark in the 1248×1116 design space — sized to carry
// the same visual weight the original 339px-wide bird did.
const LOGO_WIDTH = 245;
// The mark flies in at half size and grows as it travels; the growth tween
// outlives the travel tween, so after the position stops the mark keeps
// swelling into its final size (inertial follow-through, no dead stop).
const LOGO_SCALE_FROM = 0.5;

function isDarkTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

export const heroAnimation = async (animContainer, images) => {
  const isReduceMotionEnabled = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const urlParams = new URLSearchParams(location.search);
  const hasDebugParam = urlParams.has('debug');

  async function loadImage(url) {
    const el = new Image();
    return new Promise((resolve, reject) => {
      el.onload = () => resolve(el);
      el.onerror = (err) => reject(err);
      el.src = url;
    });
  }

  // Skip to visible portion of animation when cropped on small screens.
  // The composition is mirrored (right-anchored), so the crop happens on the
  // container's RIGHT edge — measure the overflow there.
  const rect = animContainer.getClientRects()[0];
  const offScreenDelta =
    Math.max(0, rect.right - document.documentElement.clientWidth) / rect.width;

  const q = (sel) => animContainer.querySelector(sel);

  const heroSwoops = [
    {
      canvas: q('[data-swoop="purple-swoop"]'),
      path: 'M-34 860C-34 860 42 912 102 854C162 796 98 658 50 556C2 454 18 48 142 88C272 130 290 678 432 682C574 686 434 102 794 90C1009 83 1028 280 1028 280',
      pathLength: 2776,
      anchorPoints: [558, 480.5],
      position: [558, 640.5],
      imagePath: images.purpleSwoop,
      lineWidth: 210,
      debugColor: 'purple',
      image: null,
      state: {progress: offScreenDelta},
    },
    {
      canvas: q('[data-swoop="white-swoop-1"]'),
      path: 'M-26 910C-26 910 209 817 90 542C38 422 -87 99 102 62C294 24 226 454 397 650C540 812 530 398 567 228C600 84 764 -94 1182 320',
      pathLength: 3015.6103515625,
      anchorPoints: [600, 456],
      position: [600, 652],
      imagePath: images.whiteSwoop1,
      lineWidth: 140,
      debugColor: 'red',
      image: null,
      state: {progress: offScreenDelta},
    },
    {
      canvas: q('[data-swoop="white-swoop-2"]'),
      path: ' M-59,796.5009765625 C-59,796.5009765625 258.5199890136719,885.5130004882812 361,430.5 C461,-13.5 757,18.5 903,44.5 C1049,70.5 1123,166.5 1167,228.5',
      pathLength: 1716,
      anchorPoints: [595, 417],
      position: [594, 508.5],
      imagePath: images.whiteSwoop2,
      lineWidth: 73.6,
      debugColor: 'cyan',
      image: null,
      state: {progress: offScreenDelta},
    },
    {
      canvas: q('[data-swoop="blue-swoop-bottom"]'),
      path: 'M-74 816C-74 816 216 887 326 598C408 382 458 170 634 180C809 190 851 305 904 368C972 448 1124 476 1124 476',
      pathLength: 1651,
      anchorPoints: [610, 455.5],
      position: [610, 479.5],
      imagePath: images.blueSwoopBottom,
      lineWidth: 202.2,
      debugColor: 'yellow',
      image: null,
      state: {progress: offScreenDelta},
    },
    {
      canvas: q('[data-swoop="blue-swoop-top"]'),
      path: 'M468 168C468 168 674 46 858 78C1018 106 1116 142 1160 414',
      pathLength: 906,
      anchorPoints: [610, 455.5],
      position: [610, 479.5],
      imagePath: images.blueSwoopTop,
      lineWidth: 163.4,
      debugColor: 'green',
      image: null,
      state: {progress: offScreenDelta},
    },
  ];
  const logo = {
    canvas: q('[data-swoop="logo"]'),
    // Mirrored across the 1248-wide design space (original: 899.2 → 1084).
    // The logo canvas is exempt from the CSS scaleX(-1) flip so the glyph
    // stays upright; only its travel is mirrored.
    positionStart: [348.8, 202.5],
    positionEnd: [164, 388],
    // progress drives fade + travel; scaleT drives the (longer) growth.
    state: {progress: offScreenDelta, scaleT: offScreenDelta},
    outer: null,
    inner: null,
    ctx: null,
  };

  const initSwoops = ({
    path,
    pathLength,
    position: [posX, posY],
    lineWidth,
    debugColor,
    canvas,
    image,
  }) => {
    const ctx = canvas.getContext('2d');
    // The reference animation's transform origin is in the center of the canvas
    // We're not going to reset this as it will make pulling values directly from AE easier
    ctx.translate(posX - image.naturalWidth / 2, posY - image.naturalHeight / 2);
    // Set mask styles
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    let pathInstance = new Path2D(path);

    if (!isReduceMotionEnabled) {
      ctx.setLineDash([pathLength]);
      ctx.lineDashOffset = pathLength;

      if (hasDebugParam) {
        ctx.strokeStyle = debugColor;
        ctx.stroke(pathInstance);
      }
    } else {
      ctx.drawImage(image, 0, 0);
    }

    return {ctx, pathInstance};
  };

  // Draws the O-mark at the given animation state: `progress` positions and
  // fades it along the travel path, `scaleT` grows it (around its center)
  // from LOGO_SCALE_FROM toward full size. The ring flips with the color
  // mode (light: navy, dark: white); the blue center is the same in both.
  const drawLogo = ({progress, scaleT}) => {
    const {ctx, canvas, positionStart, positionEnd, outer, inner} = logo;
    const [startX, startY] = positionStart;
    const [endX, endY] = positionEnd;
    const growth = LOGO_SCALE_FROM + (1 - LOGO_SCALE_FROM) * scaleT;
    const scale = (LOGO_WIDTH / LOGO_BOX.w) * growth;
    const cx = startX + (endX - startX) * progress;
    const cy = startY + (endY - startY) * progress;
    const dark = isDarkTheme();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.globalAlpha = Math.min(1, progress);
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.translate(-(LOGO_BOX.x + LOGO_BOX.w / 2), -(LOGO_BOX.y + LOGO_BOX.h / 2));
    if (!dark) {
      // Grounding shadow so the docked mark reads as sitting on the pale art.
      // Canvas shadow blur/offset ignore the CTM (device-space), so these are
      // constants matching the docked look regardless of the growth scale.
      ctx.shadowColor = 'rgba(15, 23, 42, 0.22)';
      ctx.shadowBlur = 17;
      ctx.shadowOffsetY = 5.7;
    }
    ctx.fillStyle = dark ? '#f2f6ff' : '#0f172a';
    ctx.fill(outer);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = LOGO_BLUE;
    ctx.fill(inner);
    ctx.restore();
  };

  const initLogo = () => {
    logo.ctx = logo.canvas.getContext('2d');
    logo.outer = new Path2D(LOGO_OUTER);
    logo.inner = new Path2D(LOGO_INNER);

    if (isReduceMotionEnabled) {
      logo.state.progress = 1;
      logo.state.scaleT = 1;
      drawLogo(logo.state);
    }
  };

  try {
    // Load swoop images
    const swoopImages = await Promise.all(
      heroSwoops.map((swoop) => loadImage(swoop.imagePath)),
    );
    // Init canvas for each swoop layer
    heroSwoops.forEach((swoop, i) => {
      swoop.image = swoopImages[i];
      const canvasData = initSwoops(swoop);
      swoop.ctx = canvasData.ctx;
      swoop.pathInstance = canvasData.pathInstance;
    });
    // Init logo canvas
    initLogo();
  } catch (error) {
    console.error('Error loading images:', error);
    throw error;
  }

  // Keep the docked mark legible when the color mode flips after (or during)
  // the entrance — redraw it at its current state with the new theme fills.
  const themeObserver = new MutationObserver(() => drawLogo(logo.state));
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  const cleanup = () => themeObserver.disconnect();

  // Skip animation if reduced motion is enabled
  if (isReduceMotionEnabled) {
    return cleanup;
  }

  const DURATION = 1000 - 1000 * offScreenDelta;

  const tl = createTimeline({
    defaults: {duration: DURATION, ease: 'in(1.8)'},
  });

  tl.label('start', 0);

  const swoopUpdate = ({state, ctx, pathLength, pathInstance, image, canvas}) => {
    // Clear canvas before next draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Progress line dash offset
    ctx.lineDashOffset = pathLength * (1 - state.progress);
    // Draw stroke
    ctx.stroke(pathInstance);
    // Source-in will allow us to only draw as far as the stroke
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(image, 0, 0);
    // Reset to default for our next stroke paint
    ctx.globalCompositeOperation = 'source-out';
  };

  // White swoop 1
  tl.add(
    heroSwoops[1].state,
    {
      progress: 1,
      duration: 950 - 950 * offScreenDelta,
      onUpdate: () => swoopUpdate(heroSwoops[1]),
    },
    'start',
  );
  // Purple swoop
  tl.add(
    heroSwoops[0].state,
    {
      progress: 1,
      duration: 950 - 950 * offScreenDelta,
      onUpdate: () => swoopUpdate(heroSwoops[0]),
    },
    'start',
  );
  // White swoop 2
  tl.add(
    heroSwoops[2].state,
    {
      progress: 1,
      onUpdate: () => swoopUpdate(heroSwoops[2]),
    },
    'start',
  );
  // Blue swoop bottom
  tl.add(
    heroSwoops[3].state,
    {
      progress: 1,
      onUpdate: () => swoopUpdate(heroSwoops[3]),
    },
    'start',
  );
  // Blue swoop top
  tl.add(
    heroSwoops[4].state,
    {
      progress: 1,
      duration: 480 - 480 * offScreenDelta,
      delay: 520 - 520 * offScreenDelta,
      onUpdate: () => swoopUpdate(heroSwoops[4]),
    },
    'start',
  );
  // Logo travel + fade — the mark arrives and the position stops here…
  tl.add(
    logo.state,
    {
      ease: 'out(1.2)',
      duration: 200 - 200 * offScreenDelta,
      delay: 750 - 750 * offScreenDelta,
      progress: 1,
      onUpdate: () => drawLogo(logo.state),
    },
    'start',
  );
  // …while the growth keeps running well past the stop: one continuous
  // curve from half size to full size, still only ~82% grown at the moment
  // the travel ends, then decelerating into the final size — the docking
  // reads as inertia bleeding off instead of a dead stop.
  tl.add(
    logo.state,
    {
      ease: 'out(2.6)',
      duration: 620 - 620 * offScreenDelta,
      delay: 750 - 750 * offScreenDelta,
      scaleT: 1,
      onUpdate: () => drawLogo(logo.state),
    },
    'start',
  );

  return cleanup;
};
