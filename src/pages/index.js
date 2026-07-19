import {useEffect} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import {translate} from '@docusaurus/Translate';
import HomepageHero from '@site/src/components/HomepageHero';
import HomepageDemo from '@site/src/components/HomepageDemo';
import DeploymentCards from '@site/src/components/DeploymentCards';
import HomepageSupported from '@site/src/components/HomepageSupported';
import {initScrollSwoops} from '@site/src/components/HomepageHero/scrollSwoops';
import styles from './index.module.css';

/*
 * Homepage, structured after the swift.org landing page (swift-org-website,
 * Apache-2.0): a painted-swoop hero, then "pillar" sections whose gradient
 * backgrounds flow into each other, with big painted seam swoops straddling
 * the section boundaries (revealed + parallaxed on scroll). The pillar
 * CONTENT is OpenLM's own: interactive demo, deployment choice, supported
 * software — and the navbar/footer chrome is untouched.
 */

export default function Home() {
  useEffect(() => {
    // Tell the CSS that JS has hydrated, so scroll-reveal (used inside
    // DeploymentCards) can hide-then-animate. Until this lands, every
    // .rmk-reveal block is fully visible — crawlers and no-JS users never
    // see the hidden state.
    document.documentElement.classList.add('js-ready');
    return initScrollSwoops();
  }, []);

  return (
    <Layout
      wrapperClassName="homepageLayout"
      title={translate({message: 'Home'})}
      description={translate({message: 'OpenLM Documentation - License Management and Monitoring'})}>
      <div className="homepage-main">
        <HomepageHero />

        <section className={clsx(styles.pillar, styles.pillar1)}>
          <div className={styles.pillarIntroWrap}>
            <p className={styles.pillarIntro}>
              {translate({
                id: 'homepageHero.pillarIntro',
                message:
                  'OpenLM is built to give you visibility at every layer of your license estate. Whether your licenses live on engineering license servers, on dongles, or in SaaS platforms, OpenLM shows you what you own, how it is really used, and where to optimize.',
              })}
            </p>
          </div>
          <HomepageDemo />
          <div className={clsx(styles.swoop, styles.swoop1, 'swoop-anim')} />
        </section>

        <section className={clsx(styles.pillar, styles.pillar2)}>
          <DeploymentCards />
          <div className={clsx(styles.swoop, styles.swoop2, 'swoop-anim')} />
        </section>

        <section className={clsx(styles.pillar, styles.pillar3)}>
          <HomepageSupported />
        </section>
      </div>
    </Layout>
  );
}
