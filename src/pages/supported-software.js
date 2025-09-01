import React, { useState, useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import SoftwareCard from '@site/src/components/SoftwareCard';
import styles from './supported-software.module.css';
import softwareData from '../static/supported-software.json';
import {translate} from '@docusaurus/Translate';

// use arrays from the JSON file at build time
const { saasPlatforms, licenseManagers } = softwareData;

export default function SupportedSoftware() {
  const title = translate({message: "Supported Software"});
  const description =
    translate({message: "OpenLM provides comprehensive monitoring and management for a wide range of SaaS platforms and engineering license managers."});
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const filteredSaas = useMemo(
    () => (q ? saasPlatforms.filter((s) => s.title.toLowerCase().includes(q)) : saasPlatforms),
    [q, saasPlatforms],
  );
  const filteredLicenses = useMemo(
    () => (q ? licenseManagers.filter((s) => s.title.toLowerCase().includes(q)) : licenseManagers),
    [q, licenseManagers],
  );

  return (
    <Layout title={title} description={description}>
      <main className={styles.mainContainer}>
        <div className={styles['header-container']}>
          <h1 className={styles['page-title']}>{title}</h1>
          <p className={styles['page-description']}>{description}</p>
        </div>

        {/* Search / Filter input that affects both lists */}
        <div className={styles.searchWrapper}>
          <input
            aria-label={translate({message: "Filter supported software"})}
            className={styles.searchInput}
            placeholder={translate({message: "Filter software (e.g. 'autodesk', 'jira')"})}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setQuery('')}
              aria-label={translate({message: "Clear search"})}
            >
              ×
            </button>
          )}
        </div>

        <div className={styles.columnsWrapper}>
          <section className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{translate({message: "SaaS Platforms"})}</h2>
            <div className={styles.cardsContainer}>
              {filteredSaas.map((software, idx) => (
                <SoftwareCard key={idx} {...software} />
              ))}
            </div>
          </section>

          <section className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{translate({message: "Engineering License Managers"})}</h2>
            <div className={styles.cardsContainer}>
              {filteredLicenses.map((software, idx) => (
                <SoftwareCard key={idx} {...software} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}