import React from 'react';
import styles from './index.module.css';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';

export default function StartGuideCard({
  title,
  description,
  docsLink,
  icon,
  pill,
  accent,
  cta = translate({id: 'startGuideCard.cta', message: 'Open guide'})
}) {
  const iconAlt = translate(
    {
      id: 'startGuideCard.iconAlt',
      message: '{title} icon',
    },
    {title},
  );

  const pillStyle = accent ? {color: accent, borderColor: accent} : undefined;

  return (
    <Link
      className={styles["docs-button"]}
      to={docsLink}
    >

      <div className={styles['startguide-card']}>
        <div className={styles['glow']}></div>

        <div className={styles['icon-container']}>
          <img src={icon} alt={iconAlt} className={styles['card-icon']} />
        </div>
        <div className={styles['card-body']}>
          {pill && <span className={styles.pill} style={pillStyle}>{pill}</span>}
          <h2 className={styles['card-title']}>{title}</h2>
          <p className={styles['card-description']}>{description}</p>
          <span className={styles.cta}>{cta} <span className={styles.arrow}>→</span></span>
        </div>
      </div>
    </Link>

  );
}
