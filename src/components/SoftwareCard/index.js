import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function SoftwareCard({ title, learnMoreLink, icon }) {
  const iconUrl = useBaseUrl(icon);

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
      </div>
    </Link>
  );
}