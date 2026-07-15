import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { FactsBadge } from '@site/src/components/PlatformFacts';

export default function SoftwareCard({ title, learnMoreLink, icon, showFacts = false }) {
  const iconUrl = useBaseUrl(icon);
  // SaaS-platform links end in the doc slug, which keys the facts map. Only
  // opt-in sections show the badge — license-manager slugs can collide with
  // SaaS ones (Altair, Salesforce, …) and their facts differ.
  const slug = (learnMoreLink || '').split('/').filter(Boolean).pop();

  return (
    <Link
      to={learnMoreLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles['card-link']}
    >
      <div className={styles['software-card']}>
        {icon && <img src={iconUrl} alt={`${title} icon`} className={styles['card-icon']} />}
        <h3 className={styles['card-title']}>{title}</h3>
        {showFacts && <FactsBadge id={slug} />}
      </div>
    </Link>
  );
}
