import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

export default function DeploymentCard({
  title,
  description,
  features = [],
  docsLink,
  icon
}) {

  return (
    <div className={styles['deployment-card']}>
      <div className={styles['icon-container']}>
        <img src={icon} alt={`${title} icon`} className={styles['card-icon']} />
      </div>
      <div className={styles['card-body']}>
        <h2 className={styles['card-title']}>{title}</h2>
        <p className={styles['card-description']}>{description}</p>
        
        <ul className={styles['features-list']}>
          {features.map((feature, index) => (
            <li key={index} className={styles['feature-item']}>
              <svg className={styles['feature-icon']} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        <Link
          className={styles["docs-button"]}
          href={docsLink}
        >
          Explore {title} Docs
        </Link>        
      </div>
    </div>
  );
}