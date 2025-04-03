import React from 'react';
import StartGuideCard from '@site/src/components/StartGuideCard';
import styles from './index.module.css';

export default function StartGuideCards() {
  return (
    <div className={styles["cards-section"]}>
      <h2 className={styles["cards-header"]} id="getting-started">Quick Start Guides</h2>
      <p className={styles["cards-header-description"]}>
        Get up and running with OpenLM in minutes with our step-by-step guides for both deployment options
      </p>
      <div className={styles["cards-wrapper"]}>
        <StartGuideCard
          title="Getting Started"
          description="Start managing your licenses in under 10 minutes."
          docsLink="/cloud/category/understanding-openlm"
          icon={require('@site/static/img/deploy.png').default}
        />

        <StartGuideCard
          title="License Management"
          description="Learn to monitor and optimize your license usage."
          docsLink="/onpremise/category/getting-started"
          icon={require('@site/static/img/enjoy.png').default}
        />

        <StartGuideCard
          title="User Management"
          description="Configure users, groups and access privileges."
          docsLink="/onpremise/category/getting-started"
          icon={require('@site/static/img/enjoy.png').default}
        />

      </div>
    </div>
  );
}