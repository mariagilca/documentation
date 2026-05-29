import {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';

/**
 * Crawler-safe scroll reveal.
 *
 * Children render fully visible by default — in SSR, with JS disabled, to
 * crawlers, and under `prefers-reduced-motion`. The hidden start state only
 * exists once the homepage has added `.js-ready` to <html> after hydration
 * (see custom.css), so content is never invisible-until-JS. After that, a
 * one-shot IntersectionObserver fades + lifts each block in as it scrolls into
 * view. Use `delay` to stagger siblings.
 */
export default function Reveal({children, className, delay}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Reduced motion: skip the animation, just show it.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      {threshold: 0.1, rootMargin: '0px 0px -8% 0px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx('rmk-reveal', visible && 'rmk-reveal--is-visible', className)}
      style={delay ? {transitionDelay: `${delay}ms`} : undefined}>
      {children}
    </div>
  );
}
