import React from 'react';
import DeploymentCard from '@site/src/components/DeploymentCard';
import styles from './index.module.css';

export default function DownloadCardsLayout() {
  return (
    <div className={styles["cards-section"]}>
      <h2 className={styles["cards-header"]}>Choose Your Deployment</h2>
      <div className={styles["cards-wrapper"]}>
        <DeploymentCard
          title="Cloud Solution"
          description="Get started quickly with our fully-managed cloud solution. No installation required, scale on demand."
          features={[
            "Zero infrastructure management",
            "Automatic updates and maintenance",
            "Flexible scaling options",
            "Secure access from anywhere"
          ]}
          docsLink="/cloud/category/understanding-openlm"
          icon={require('@site/static/img/deploy.png').default}
        />

        <DeploymentCard
          title="On-premise"
          description="Deploy within your own infrastructure for maximum control and customization options."
          features={[
            "Complete control over your environment",
            "Enhanced security and compliance options",
            "Integrate with internal systems",
            "Customizable deployment architecture"
          ]}
          docsLink="/onpremise/category/getting-started"
          icon={require('@site/static/img/enjoy.png').default}
        />
      </div>
    </div>

  );
}