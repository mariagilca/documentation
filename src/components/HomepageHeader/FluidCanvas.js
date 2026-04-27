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
        handle = initFluid(canvas, {});
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
