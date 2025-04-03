import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

export default function StartGuideCard({
  title,
  description,
  docsLink,
  icon
}) {

  return (
    <Link
      className={styles["docs-button"]}
      href={docsLink}
    >

      <div className={styles['startguide-card']}>

        <div className={styles['icon-container']}>
          <img src={icon} alt={`${title} icon`} className={styles['card-icon']} />
        </div>
        <div className={styles['card-body']}>
          <h2 className={styles['card-title']}>{title}</h2>
          <p className={styles['card-description']}>{description}</p>

        </div>
      </div>
    </Link>

  );
}