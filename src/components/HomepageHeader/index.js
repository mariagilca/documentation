import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useState } from 'react';

import Heading from '@theme/Heading';
import SearchBar from '@theme/SearchBar';
import styles from './index.module.css';
import {translate} from '@docusaurus/Translate';

import { ArcadeEmbed } from '@site/src/components/ArcadeEmbed';

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
              {translate({message: 'Getting started'})}
            </Link>
            <button
              className="button button--secondary button--lg"
              onClick={openModal}>
              {translate({message: 'Interactive demo'})}
            </button>
          </div>
        </div>
      </header>

      {/* Modal for Arcade Embed */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <ArcadeEmbed src="https://demo.arcade.software/dIJf3kJCT0mFSmhg3IcM?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true" 
    title="Getting started with OpenLM" />
          </div>
        </div>
      )}
    </>
  );
}
