import {animate, onScroll} from 'animejs';

/*
 * Section-seam swoop reveal + parallax, ported from the swift.org homepage
 * (swift-org-website, Apache-2.0 — assets/javascripts/new-javascripts/
 * landing.js via its Docusaurus recreation). Reveals each `.swoop-anim`
 * (adds `.visible`, which triggers the lazy background image) and applies a
 * scroll-synced background-position parallax. Returns a cleanup fn.
 */

const swoopAniVars = [
  {backgroundPosition: '67.5% 0%'},
  {backgroundPosition: '80% 0%'},
  {backgroundPosition: '60% 0%'},
];

export function initScrollSwoops() {
  const urlParams = new URLSearchParams(location.search);
  const hasDebugParam = urlParams.has('debug');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const swoops = document.querySelectorAll('.swoop-anim');
  const animations = [];
  const parallaxAnimations = [];

  swoops.forEach((el, i) => {
    animations.push(
      animate(el, {
        autoplay: onScroll({
          axis: 'y',
          debug: hasDebugParam,
          enter: 'bottom - 100%',
          container: 'body',
          target: el,
          onEnter: () => {
            el.classList.add('visible');
          },
        }),
      }),
    );

    if (!reduceMotion.matches) {
      parallaxAnimations.push(
        animate(el, {
          ...swoopAniVars[i % swoopAniVars.length],
          autoplay: onScroll({
            container: 'body',
            enter: {target: 'top-=50%', container: 'bottom-=50%'},
            leave: {target: 'bottom-=50%', container: 'top-=50%'},
            sync: 0.1,
            debug: hasDebugParam,
          }),
        }),
      );
    }
  });

  const revert = (list) => {
    list.forEach((a) => {
      try {
        a.revert?.();
      } catch {}
    });
    list.length = 0;
  };

  // Honor 'Reduce motion' being enabled mid-session: the reveal (a one-shot
  // class toggle) stays, but the scroll-synced parallax stops immediately.
  // Going the other way (reduce → no-preference) re-enables on next visit.
  const onMotionPrefChange = (e) => {
    if (e.matches) revert(parallaxAnimations);
  };
  reduceMotion.addEventListener('change', onMotionPrefChange);

  return () => {
    reduceMotion.removeEventListener('change', onMotionPrefChange);
    revert(parallaxAnimations);
    revert(animations);
  };
}
