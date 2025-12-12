import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import styles from './index.module.css';

export default function DeploymentCards() {
  const cards = [
    {
      id: 'cloud',
      title: translate({id: 'deploymentCards.cloud.title', message: 'OpenLM Platform Cloud'}),
      description: translate({
        id: 'deploymentCards.cloud.description',
        message: 'Fully managed control plane with zero infra overhead. Best for fast rollout and scale.',
      }),
      cta: translate({id: 'deploymentCards.cloud.cta', message: 'Explore Cloud docs'}),
      href: translate({id: 'deploymentCards.cloud.href', message: '/cloud/understanding-openlm/intro'}),
      accent: 'var(--rmk-accent-cloud)',
      pill: translate({id: 'deploymentCards.cloud.pill', message: 'Managed'}),
    },
    {
      id: 'onprem',
      title: translate({id: 'deploymentCards.onprem.title', message: 'OpenLM On-Premise'}),
      description: translate({
        id: 'deploymentCards.onprem.description',
        message: 'Customer-managed cluster with complete control. Install via Helm or small-footprint VM.',
      }),
      cta: translate({id: 'deploymentCards.onprem.cta', message: 'Open On-Premise guides'}),
      href: translate({id: 'deploymentCards.onprem.href', message: '/cloud/deployment-operations/on-premise/'}),
      accent: 'var(--rmk-accent-onprem)',
      pill: translate({id: 'deploymentCards.onprem.pill', message: 'Self-hosted'}),
    },
    {
      id: 'legacy',
      title: translate({id: 'deploymentCards.legacy.title', message: 'OpenLM v25 (Legacy)'}),
      description: translate({
        id: 'deploymentCards.legacy.description',
        message: 'Legacy documentation set for Version 25 with unchanged navigation.',
      }),
      cta: translate({id: 'deploymentCards.legacy.cta', message: 'Go to Legacy'}),
      href: translate({id: 'deploymentCards.legacy.href', message: '/legacy/intro'}),
      accent: 'var(--rmk-accent-legacy)',
      pill: translate({id: 'deploymentCards.legacy.pill', message: 'Legacy'}),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.headingWrap}>
        <p className={styles.kicker}>{translate({id: 'deploymentCards.kicker', message: 'Deploy with confidence'})}</p>
        <h2 className={styles.title}>{translate({id: 'deploymentCards.title', message: 'Choose your platform track'})}</h2>
        <p className={styles.subtitle}>
          {translate({
            id: 'deploymentCards.subtitle',
            message: 'Start from Cloud, run on-premise for full control, or access the legacy docs for Version 25.',
          })}
        </p>
      </div>
      <div className={styles.grid}>
        {cards.map((card) => (
          <Link key={card.id} className={styles.card} to={card.href}>
            <div className={styles.glow} style={{background: card.accent}} />
            <div className={styles.cardInner}>
              <span className={styles.pill} style={{color: card.accent, borderColor: card.accent}}>
                {card.pill}
              </span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className={styles.cta}>
                {card.cta} <span className={styles.arrow}>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
