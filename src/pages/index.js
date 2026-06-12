import {useCallback, useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import DeploymentCards from '@site/src/components/DeploymentCards';
import HomepageHeader from '@site/src/components/HomepageHeader';
import HomepageDemo from '@site/src/components/HomepageDemo';
import HomepageSupported from '@site/src/components/HomepageSupported';
import Reveal from '@site/src/components/Reveal';
import {translate} from '@docusaurus/Translate';
import styles from './index.module.css';

export default function Home() {
  const mainRef = useRef(null);
  const frame = useRef(0);
  const spotlightOff = useRef(false);

  useEffect(() => {
    // Tell the CSS that JS has hydrated, so scroll-reveal can hide-then-animate.
    // Until this lands, every .rmk-reveal block is fully visible — crawlers and
    // no-JS users never see the hidden state.
    document.documentElement.classList.add('js-ready');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(hover: none)');
    const sync = () => {
      spotlightOff.current = reduce.matches || coarse.matches;
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

  // Page-wide spotlight: one soft light follows the cursor across the whole
  // homepage, writing --px/--py on the shell (read by styles.spotlight). One
  // rAF slot, paint-only; suppressed on touch and under reduced motion.
  const onPointerMove = useCallback((e) => {
    if (spotlightOff.current || frame.current) return;
    const el = mainRef.current;
    if (!el) return;
    const {clientX, clientY} = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--px', `${clientX - rect.left}px`);
      el.style.setProperty('--py', `${clientY - rect.top}px`);
    });
  }, []);

  return (
    <Layout
      wrapperClassName="homepageLayout"
      title={translate({message: 'Home'})}
      description={translate({message: 'OpenLM Documentation - License Management and Monitoring'})}>
      <div className="homepage-main" ref={mainRef} onPointerMove={onPointerMove}>
        {/* Continuous aurora light field + film grain + cursor spotlight behind
            every section. Decorative only — hidden from assistive tech. */}
        <div className={styles.auroraField} aria-hidden="true">
          <div className={styles.auroraBloom} />
        </div>
        <div className={styles.grainOverlay} aria-hidden="true" />
        <div className={styles.spotlight} aria-hidden="true" />

        <HomepageHeader />
        <Reveal>
          <HomepageDemo />
        </Reveal>
        {/* Deliberate decision (June 2026): no wayfinding grid here. A bento
            section ("Documentation / Find your way in", formerly
            src/components/HomepageAtlas) was briefly mounted in this slot and
            removed on request — section entry points live in the navbar Docs
            dropdown, hero search, and DeploymentCards below. */}
        <Reveal>
          <DeploymentCards />
        </Reveal>
        <Reveal>
          <HomepageSupported />
        </Reveal>
      </div>
    </Layout>
  );
}
