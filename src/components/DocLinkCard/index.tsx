import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {
  useDocById,
  useActivePlugin,
} from '@docusaurus/plugin-content-docs/client';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {PropSidebarItemLink} from '@docusaurus/plugin-content-docs';
import styles from './index.module.css';

// Deterministic gradient angle from title for subtle variation
function titleToAngle(title: string): number {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 100 + (((hash % 80) + 80) % 80); // range 100–180deg
}

function useReadingTime(docId: string | undefined): number | undefined {
  const activePlugin = useActivePlugin();
  const pluginId = activePlugin?.pluginId;
  let readingTimes: Record<string, Record<string, number>> | undefined;
  try {
    readingTimes = usePluginData('reading-time-plugin') as
      | Record<string, Record<string, number>>
      | undefined;
  } catch {
    return undefined;
  }
  if (!docId || !pluginId || !readingTimes?.[pluginId]) return undefined;
  return readingTimes[pluginId][docId];
}

export default function DocLinkCard({item}: {item: PropSidebarItemLink}) {
  const doc = useDocById(item.docId ?? undefined);
  const description = item.description ?? doc?.description;
  const readingTime = useReadingTime(item.docId);

  const angle = titleToAngle(item.label);
  const bannerStyle = {
    background: `linear-gradient(${angle}deg, var(--rmk-genindex-banner-from), var(--rmk-genindex-banner-to))`,
  };

  const readingTimeLabel = readingTime
    ? translate(
        {
          message: '{minutes} min read',
          id: 'genindex.readingTime',
          description: 'Estimated reading time for a doc page',
        },
        {minutes: readingTime},
      )
    : undefined;

  return (
    <Link href={item.href} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.banner} style={bannerStyle}>
          <span className={styles.bannerTitle}>{item.label}</span>
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{item.label}</h3>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          {readingTimeLabel && (
            <span className={styles.readingTime}>{readingTimeLabel}</span>
          )}
        </div>
      </article>
    </Link>
  );
}
