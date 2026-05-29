import {useCallback, useEffect, useRef} from 'react';

/**
 * Shared pointer-tracked glow for the homepage's glass cards.
 *
 * Returns a single memoized `onPointerMove` handler you can spread onto any
 * number of cards — the cursor is only ever over one card at a time, so one
 * shared rAF slot is enough. On each move it writes the card-local `--mx`/`--my`
 * custom properties (in px) at most once per animation frame, which the card's
 * perimeter-ring gradient reads. Paint-only: no layout, no React state.
 *
 * No-ops on touch (`hover: none`) and when the user prefers reduced motion, and
 * re-checks both whenever the media queries change mid-session.
 */
export default function usePointerGlow() {
  const frame = useRef(0);
  const disabled = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(hover: none)');
    const sync = () => {
      disabled.current = reduce.matches || coarse.matches;
    };
    sync();
    reduce.addEventListener('change', sync);
    coarse.addEventListener('change', sync);
    return () => {
      reduce.removeEventListener('change', sync);
      coarse.removeEventListener('change', sync);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return useCallback((e) => {
    if (disabled.current || frame.current) return;
    const el = e.currentTarget;
    const {clientX, clientY} = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${clientX - rect.left}px`);
      el.style.setProperty('--my', `${clientY - rect.top}px`);
    });
  }, []);
}
