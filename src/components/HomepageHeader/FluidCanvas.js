import {useEffect, useRef} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './index.module.css';

/**
 * Client-only wrapper that mounts the WebGL1 fluid sim on a <canvas> inside
 * the hero banner. Falls back to nothing (the existing CSS gradient remains
 * visible) when:
 *   - the user prefers reduced motion
 *   - WebGL1 + half-float textures are unavailable
 *   - the sim module fails to initialise for any other reason
 *
 * The sim is also paused when the hero scrolls out of view to save battery.
 */
// Light-theme overrides: bloom and sunrays were tuned for an ink-dark
// backing, so on a pale gradient they wash the dye into the page. Dial
// glow back and boost per-splat color intensity so dye reads as actual
// color instead of a luminance lift.
const LIGHT_OVERRIDES = {
  BLOOM_INTENSITY: 0.4,
  SUNRAYS_WEIGHT: 0.15,
  SPLAT_COLOR_INTENSITY: 0.18,
};

function getThemeOverrides() {
  return document.documentElement.dataset.theme === 'light' ? LIGHT_OVERRIDES : {};
}

function FluidCanvasInner() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotionQuery.matches) return undefined;

    let handle = null;
    let cancelled = false;
    let initFluidRef = null;

    function mount() {
      if (!initFluidRef || cancelled) return;
      handle = initFluidRef(canvas, getThemeOverrides());
    }

    // Dynamic import so the sim module isn't included in SSR bundles or
    // evaluated before the component actually mounts.
    import('./fluid')
      .then(({initFluid}) => {
        if (cancelled) return;
        initFluidRef = initFluid;
        mount();
      })
      .catch(() => {
        /* ignore — CSS gradient remains visible */
      });

    // React to viewport resize.
    const ro = new ResizeObserver(() => {
      if (handle && typeof handle.resize === 'function') handle.resize();
    });
    ro.observe(canvas);

    // React to reduced-motion being toggled on during a session.
    const onReduceMotionChange = (e) => {
      if (e.matches && handle) {
        handle.destroy();
        handle = null;
      }
    };
    reduceMotionQuery.addEventListener('change', onReduceMotionChange);

    // React to Docusaurus theme toggle: tear down and re-init with the
    // new theme's overrides. In-flight dye is lost, but it decays anyway.
    const themeObserver = new MutationObserver(() => {
      if (handle) {
        handle.destroy();
        handle = null;
      }
      mount();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      cancelled = true;
      ro.disconnect();
      themeObserver.disconnect();
      reduceMotionQuery.removeEventListener('change', onReduceMotionChange);
      if (handle) handle.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.fluidCanvas}
      aria-hidden="true"
    />
  );
}

export default function FluidCanvas() {
  return (
    <BrowserOnly fallback={null}>
      {() => <FluidCanvasInner />}
    </BrowserOnly>
  );
}
