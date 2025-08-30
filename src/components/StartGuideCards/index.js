import React from 'react';
import StartGuideCard from '@site/src/components/StartGuideCard';
import styles from './index.module.css';
import {translate} from '@docusaurus/Translate';

export default function StartGuideCards() {
  return (
    <div className={styles["cards-section"]}>
      <h2 className={styles["cards-header"]} id="getting-started">{translate({message: "Quick Start Guides"})}</h2>
      <p className={styles["cards-header-description"]}>
        {translate({message: "Get up and running with OpenLM in minutes with our step-by-step guides for both deployment options"})}
      </p>
      <div className={styles["cards-wrapper"]}>
        <StartGuideCard
          title={translate({message: "Getting Started"})}
          description={translate({message: "Start managing your licenses in under 10 minutes."})}
          docsLink={translate({message: "/cloud/category/understanding-openlm", id: "deploymentCard.cloudDocsLink"})}
          icon={require('@site/static/img/deploy.png').default}
        />

        <StartGuideCard
          title={translate({message: "License Management"})}
          description={translate({message: "Learn to monitor and optimize your license usage."})}
          docsLink={translate({message: "/onpremise/category/getting-started", id: "deploymentCard.onpremiseDocsLink"})}
          icon={require('@site/static/img/enjoy.png').default}
        />

        <StartGuideCard
          title={translate({message: "User Management"})}
          description={translate({message: "Configure users, groups and access privileges."})}
          docsLink={translate({message: "/onpremise/category/getting-started", id: "deploymentCard.onpremiseDocsLink"})}
          icon={require('@site/static/img/enjoy.png').default}
        />

      </div>
    </div>
  );
}