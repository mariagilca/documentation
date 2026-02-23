import React from 'react';
import StartGuideCard from '@site/src/components/StartGuideCard';
import styles from './index.module.css';
import {translate} from '@docusaurus/Translate';

export default function StartGuideCards() {
  const cards = [
    {
      title: translate({id: 'startGuideCards.cloud.title', message: "Cloud onboarding"}),
      description: translate({
        id: 'startGuideCards.cloud.description',
        message: "Register, activate services, and deploy agents to start collecting data.",
      }),
      docsLink: translate({message: "/cloud/getting-started/available_installation_methods", id: "deploymentCard.cloudDocsLink"}),
      icon: require('@site/static/img/deploy.png').default,
      pill: translate({id: 'startGuideCards.cloud.pill', message: "Managed"}),
      accent: 'var(--rmk-accent-cloud)',
      pillAccent: 'var(--rmk-accent-cloud-pill)',
    },
    {
      title: translate({id: 'startGuideCards.onprem.title', message: "On-Premise install"}),
      description: translate({
        id: 'startGuideCards.onprem.description',
        message: "Plan sizing, configure Helm, and validate your On-Premise cluster.",
      }),
      docsLink: translate({message: "/cloud/deployment-operations/on-premise/", id: "deploymentCard.onpremDocsLink"}),
      icon: require('@site/static/img/enjoy.png').default,
      pill: translate({id: 'startGuideCards.onprem.pill', message: "Self-hosted"}),
      accent: 'var(--rmk-accent-onprem)',
      pillAccent: 'var(--rmk-accent-onprem-pill)',
    },
    {
      title: translate({id: 'startGuideCards.legacy.title', message: "OpenLM v25 (Legacy)"}) ,
      description: translate({
        id: 'startGuideCards.legacy.description',
        message: "Access the Version 25 docs and release notes.",
      }),
      docsLink: translate({message: "/legacy/intro", id: "deploymentCard.legacyDocsLink"}),
      icon: require('@site/static/img/deploy.png').default,
      pill: translate({id: 'startGuideCards.legacy.pill', message: "Legacy"}),
      accent: 'var(--rmk-accent-legacy)',
      pillAccent: 'var(--rmk-accent-legacy-pill)',
    },
  ];

  return (
    <div className={styles["cards-section"]}>
      <h2 className={styles["cards-header"]} id="getting-started">
        {translate({id: 'startGuideCards.heading', message: "Quick start guides"})}
      </h2>
      <p className={styles["cards-header-description"]}>
        {translate({
          id: 'startGuideCards.description',
          message: "Jump into the right track: cloud onboarding, On-Premise install, or legacy references.",
        })}
      </p>
      <div className={styles["cards-wrapper"]}>
        {cards.map((card) => (
          <StartGuideCard key={card.title} {...card} cta={translate({id: 'startGuideCards.cta', message: "Open guide"})} />
        ))}
      </div>
    </div>
  );
}
