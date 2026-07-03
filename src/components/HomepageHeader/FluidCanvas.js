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
// Scale sim cost to the device. Small phones get smaller grids and a tighter
// DPR cap so the hero doesn't burn battery or block first input on low-end
// hardware. Heuristic — runs once when we mount the sim.
function getDeviceTunedOptions() {
  if (typeof window === 'undefined') return {};
  const w = window.innerWidth || 0;
  if (w <= 480) {
    return {
      SIM_RESOLUTION: 64,
      DYE_RESOLUTION: 384,
      BLOOM_RESOLUTION: 128,
      SUNRAYS_RESOLUTION: 96,
      BLOOM_ITERATIONS: 5,
      DPR_CAP: 1.0,
      MAX_SPLATS_PER_FRAME: 3,
      // Sharpened advection pays least at 384px dye; skip its extra passes.
      MACCORMACK: false,
    };
  }
  if (w <= 768) {
    return {
      SIM_RESOLUTION: 96,
      DYE_RESOLUTION: 640,
      BLOOM_RESOLUTION: 192,
      SUNRAYS_RESOLUTION: 144,
      BLOOM_ITERATIONS: 6,
      DPR_CAP: 1.25,
      MAX_SPLATS_PER_FRAME: 5,
    };
  }
  return {};
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

    // Dynamic import so the sim module isn't included in SSR bundles or
    // evaluated before the component actually mounts.
    import('./fluid')
      .then(({initFluid}) => {
        if (cancelled) return;
        handle = initFluid(canvas, getDeviceTunedOptions());
      })
      .catch((err) => {
        // Surface module-load failures during dev so the silent fallback is
        // debuggable. Production users still get the CSS gradient fallback.
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('[FluidCanvas] Failed to load fluid sim module:', err);
        }
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

    return () => {
      cancelled = true;
      ro.disconnect();
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
