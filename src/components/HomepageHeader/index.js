import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import SearchBar from '@site/src/theme/SearchBar';

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles['search-container']}>
          <SearchBar />
        </div>
        <div className={styles['button-container']}>
          <Link
            className="button button--primary button--lg"
            to="#getting-started">
            Getting Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://www.youtube.com/watch?v=JVrmfbiyZ0o">
            Watch Tutorial
          </Link>
        </div>
      </div>
    </header>
  );
}
