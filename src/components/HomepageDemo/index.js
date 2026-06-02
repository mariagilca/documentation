import clsx from 'clsx';
import Heading from '@theme/Heading';
import {translate} from '@docusaurus/Translate';
import {ArcadeEmbed} from '@site/src/components/ArcadeEmbed';
import styles from './index.module.css';

export default function HomepageDemo() {
  const src = translate({
    id: 'homepageDemo.url',
    message:
      'https://demo.arcade.software/dIJf3kJCT0mFSmhg3IcM?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true',
  });
  const title = translate({
    id: 'homepageDemo.title',
    message: 'Getting started with OpenLM',
  });
  const aspectRatio = translate({
    id: 'homepageDemo.aspectRatio',
    message: '55.34591194968554%',
  });
  const eyebrow = translate({
    id: 'homepageDemo.eyebrow',
    message: 'Interactive tour',
  });
  const heading = translate({
    id: 'homepageDemo.heading',
    message: 'See OpenLM in action',
  });
  const lede = translate({
    id: 'homepageDemo.lede',
    message:
      'Step through a guided walkthrough of the product — no install, no signup. Click anywhere to advance.',
  });
  return (
    <section className={styles.demoSection} aria-label={heading}>
      <div className={clsx('container', styles.demoInner)}>
        <div className={styles.demoIntro}>
          <span className={styles.demoEyebrow}>{eyebrow}</span>
          <Heading as="h2" className={styles.demoHeading}>
            {heading}
          </Heading>
          <p className={styles.demoLede}>{lede}</p>
        </div>
        <div className={styles.demoFrame}>
          {/* bottomBarPx={0}: this demo has no Arcade bottom bar, so the default
              41px reserve only added an empty band beneath the frame. */}
          <ArcadeEmbed src={src} title={title} aspectRatio={aspectRatio} bottomBarPx={0} />
        </div>
      </div>
    </section>
  );
}
