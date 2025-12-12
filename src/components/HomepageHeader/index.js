import clsx from 'clsx';
import Heading from '@theme/Heading';
import SearchBar from '@theme/SearchBar';
import styles from './index.module.css';
import {translate} from '@docusaurus/Translate';
import { ArcadeEmbed } from '@site/src/components/ArcadeEmbed';

export default function HomepageHeader() {
  const demoUrl = translate({
    id: 'homepageHeader.demoUrl',
    message: 'https://demo.arcade.software/dIJf3kJCT0mFSmhg3IcM?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true',
  });
  const demoTitle = translate({
    id: 'homepageHeader.demoTitle',
    message: 'Getting started with OpenLM',
  });
  const demoAspectRatio = translate({
    id: 'homepageHeader.demoAspectRatio',
    message: '55.34591194968554%',
  });

  return (
    <>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className={styles.orbital} />
        <div className={styles.orbitalSmall} />
        <div className={styles.gridOverlay} />
      <div className="container">
          <Heading as="h1" className="hero__title">
            {translate({id: 'homepageHeader.title', message: 'OpenLM Documentation'})}
          </Heading>
          <p className="hero__subtitle">
            {translate({id: 'homepageHeader.subtitle', message: 'Stretch your licenses to their limit!'})}
          </p>
          <div className={styles['search-container']}>
            <SearchBar />
          </div>
          <div className={styles.demoBlock}>
            <ArcadeEmbed
              src={demoUrl}
              title={demoTitle}
              aspectRatio={demoAspectRatio}
            />
          </div>
        </div>
      </header>
    </>
  );
}
