import React from 'react';
import DeploymentCard from '@site/src/components/DeploymentCard';
import styles from './index.module.css';
import {translate} from '@docusaurus/Translate';

export default function DownloadCardsLayout() {
  return (
    <div className={styles["cards-section"]}>
      <h2 className={styles["cards-header"]}>{translate({message: "Choose your deployment"})}</h2>
      <div className={styles["cards-wrapper"]}>
        <div className={styles["card-container"]}>
          <DeploymentCard
            title={translate({message: "Cloud solution"})}
            description={translate({message: "Get started quickly with our fully-managed cloud solution. No installation required, scale on demand."})}
            features={[
              translate({message: "Zero infrastructure management"}),
              translate({message: "Automatic updates and maintenance"}),
              translate({message: "Flexible scaling options"}),
              translate({message: "Secure access from anywhere"})
            ]}
            docsLink={translate({message: "/cloud/category/understanding-openlm", id: "deploymentCard.cloudDocsLink"})}
            icon={require('@site/static/img/deploy.png').default}
          />
        </div>

        <div className={styles["card-container"]}>
          <DeploymentCard
            title={translate({message: "On-premise"})}
            description={translate({message: "Deploy within your own infrastructure for maximum control and customization options."})}
            features={[
              translate({message: "Complete control over your environment"}),
              translate({message: "Enhanced security and compliance options"}),
              translate({message: "Integrate with internal systems"}),
              translate({message: "Customizable deployment architecture"})
            ]}
            docsLink={translate({message: "/onpremise/category/getting-started", id: "deploymentCard.onpremiseDocsLink"})}
            icon={require('@site/static/img/enjoy.png').default}
          />
        </div>
      </div>
    </div>

  );
}