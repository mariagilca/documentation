import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import styles from './index.module.css';

export default function DeploymentCards() {
  const mainCards = [
    {
      id: 'cloud',
      title: translate({id: 'deploymentCards.cloud.title', message: 'OpenLM Platform Cloud'}),
      description: translate({
        id: 'deploymentCards.cloud.description',
        message: 'Fully managed control plane with zero infra overhead. Best for fast rollout and scale.',
      }),
      steps: translate({
        id: 'deploymentCards.cloud.steps',
        message: 'Register, activate services, and deploy agents to start collecting data.',
      }),
      cta: translate({id: 'deploymentCards.cloud.cta', message: 'Explore Cloud docs'}),
      href: translate({id: 'deploymentCards.cloud.href', message: '/cloud/getting-started/what-is-openlm'}),
      accent: 'var(--rmk-accent-cloud)',
      pillAccent: 'var(--rmk-accent-cloud-pill)',
      pill: translate({id: 'deploymentCards.cloud.pill', message: 'Managed'}),
      icon: require('@site/static/img/deploy.png').default,
    },
    {
      id: 'onprem',
      title: translate({id: 'deploymentCards.onprem.title', message: 'OpenLM On-Premise'}),
      description: translate({
        id: 'deploymentCards.onprem.description',
        message: 'Customer-managed cluster with complete control. Install via Helm or small-footprint VM.',
      }),
      steps: translate({
        id: 'deploymentCards.onprem.steps',
        message: 'Plan sizing, configure Helm, and validate your On-Premise cluster.',
      }),
      cta: translate({id: 'deploymentCards.onprem.cta', message: 'Open On-Premise guides'}),
      href: translate({id: 'deploymentCards.onprem.href', message: '/cloud/deployment-operations/on-premise/'}),
      accent: 'var(--rmk-accent-onprem)',
      pillAccent: 'var(--rmk-accent-onprem-pill)',
      pill: translate({id: 'deploymentCards.onprem.pill', message: 'Self-hosted'}),
      icon: require('@site/static/img/enjoy.png').default,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.headingWrap}>
        <p className={styles.kicker}>{translate({id: 'deploymentCards.kicker', message: 'Deploy with confidence'})}</p>
        <h2 className={styles.title}>{translate({id: 'deploymentCards.title', message: 'Choose your deployment model'})}</h2>
        <p className={styles.subtitle}>
          {translate({
            id: 'deploymentCards.subtitle',
            message: 'OpenLM monitors, optimizes, and manages your software licenses across vendors and teams. Pick the path that fits your infrastructure.',
          })}
        </p>
      </div>

      <div className={styles.grid}>
        {mainCards.map((card) => (
          <Link key={card.id} className={styles.card} to={card.href}>
            <div className={styles.glow} style={{background: card.accent}} />
            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <img src={card.icon} alt="" className={styles.cardIcon} />
                <span className={styles.pill} style={{color: card.pillAccent || card.accent, borderColor: card.pillAccent || card.accent}}>
                  {card.pill}
                </span>
              </div>
              <h3>{card.title}</h3>
              <p className={styles.cardDesc}>{card.description}</p>
              <div className={styles.divider} />
              <p className={styles.cardSteps}>
                <span className={styles.stepsLabel}>{translate({id: 'deploymentCards.quickStart', message: 'Quick start'})}</span>
                {card.steps}
              </p>
              <span className={styles.cta}>
                {card.cta} <span className={styles.arrow}>&rarr;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.legacyBanner}>
        <span className={styles.legacyText}>
          {translate({
            id: 'deploymentCards.legacyText',
            message: 'Looking for Version 25 documentation?',
          })}
        </span>
        <Link className={styles.legacyLink} to={translate({id: 'deploymentCards.legacy.href', message: '/legacy/intro'})}>
          {translate({id: 'deploymentCards.legacyCta', message: 'Go to Legacy docs'})}
          <span className={styles.arrow}>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
