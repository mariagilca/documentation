import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import styles from './index.module.css';

export default function DeploymentCards() {
  const mainCards = [
    {
      id: 'cloud',
      pill: translate({id: 'deploymentCards.cloud.pill', message: 'Cloud'}),
      title: translate({id: 'deploymentCards.cloud.title', message: 'Hosted by OpenLM'}),
      description: translate({
        id: 'deploymentCards.cloud.description',
        message:
          'Sign in and start using OpenLM Platform — we run the infrastructure for you. Fastest path to value, no servers to maintain, scales with your estate.',
      }),
      steps: translate({
        id: 'deploymentCards.cloud.steps',
        message:
          'Sign up, activate services, and deploy agents — usage data flows in within minutes.',
      }),
      cta: translate({id: 'deploymentCards.cloud.cta', message: 'Get started with Cloud'}),
      href: translate({id: 'deploymentCards.cloud.href', message: '/cloud/getting-started/what-is-openlm'}),
      accent: 'var(--rmk-accent-cloud)',
      pillAccent: 'var(--rmk-accent-cloud-pill)',
      icon: require('@site/static/img/deploy.png').default,
    },
    {
      id: 'onprem',
      pill: translate({id: 'deploymentCards.onprem.pill', message: 'On-premise'}),
      title: translate({id: 'deploymentCards.onprem.title', message: 'Hosted by you'}),
      description: translate({
        id: 'deploymentCards.onprem.description',
        message:
          'Deploy OpenLM Platform inside your own network for full data residency and integration control. Install via Helm or a single-VM footprint.',
      }),
      steps: translate({
        id: 'deploymentCards.onprem.steps',
        message:
          'Plan sizing, install with Helm, and validate the cluster against your environment.',
      }),
      cta: translate({id: 'deploymentCards.onprem.cta', message: 'Get started with On-premise'}),
      href: translate({id: 'deploymentCards.onprem.href', message: '/cloud/deployment-operations/on-premise/'}),
      accent: 'var(--rmk-accent-onprem)',
      pillAccent: 'var(--rmk-accent-onprem-pill)',
      icon: require('@site/static/img/enjoy.png').default,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.headingWrap}>
        <p className={styles.kicker}>
          {translate({id: 'deploymentCards.kicker', message: 'OpenLM Platform'})}
        </p>
        <h2 className={styles.title}>
          {translate({id: 'deploymentCards.title', message: 'One product, two ways to run it'})}
        </h2>
        <p className={styles.subtitle}>
          {translate({
            id: 'deploymentCards.subtitle',
            message:
              'OpenLM Platform monitors, optimizes, and manages your software licenses across vendors and teams. Run it as a service we host for you, or deploy it on your own premises — same product, same capabilities, your choice of who keeps the lights on.',
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
                <span
                  className={styles.pill}
                  style={{color: card.pillAccent || card.accent, borderColor: card.pillAccent || card.accent}}>
                  {card.pill}
                </span>
              </div>
              <h3>{card.title}</h3>
              <p className={styles.cardDesc}>{card.description}</p>
              <div className={styles.divider} />
              <p className={styles.cardSteps}>
                <span className={styles.stepsLabel}>
                  {translate({id: 'deploymentCards.quickStart', message: 'Quick start'})}
                </span>
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
