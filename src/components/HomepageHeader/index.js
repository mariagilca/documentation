import clsx from 'clsx';
import Heading from '@theme/Heading';
import SearchBar from '@theme/SearchBar';
import styles from './index.module.css';
import {translate} from '@docusaurus/Translate';
import FluidCanvas from './FluidCanvas';

export default function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <FluidCanvas />
      <div className="container">
        <Heading as="h1" className="hero__title">
          {translate({id: 'homepageHeader.title', message: 'OpenLM Documentation'})}
        </Heading>
        <p className="hero__subtitle">
          {translate({id: 'homepageHeader.subtitle', message: 'Guides, references, and release notes for managing and monitoring your software licenses with OpenLM.'})}
        </p>
        <div className={styles['search-container']}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
