import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

export default function SoftwareCard({ title, learnMoreLink }) {
  return (
    <Link
      to={learnMoreLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles['card-link']}
    >
      <div className={styles['software-card']}>
        <h3 className={styles['card-title']}>{title}</h3>
      </div>
    </Link>
  );
}