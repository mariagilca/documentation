import React, {useCallback, useState} from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {
  useDocById,
  useActivePlugin,
} from '@docusaurus/plugin-content-docs/client';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {PropSidebarItemLink} from '@docusaurus/plugin-content-docs';
import styles from './index.module.css';

function useDocPluginData(docId: string | undefined) {
  const activePlugin = useActivePlugin();
  const pluginId = activePlugin?.pluginId;

  let readingTimes: Record<string, Record<string, number>> | undefined;
  try {
    readingTimes = usePluginData('reading-time-plugin') as
      | Record<string, Record<string, number>>
      | undefined;
  } catch {
    // plugin not available
  }

  let lastUpdatedMap: Record<string, Record<string, number>> | undefined;
  try {
    lastUpdatedMap = usePluginData('last-updated-plugin') as
      | Record<string, Record<string, number>>
      | undefined;
  } catch {
    // plugin not available
  }

  if (!docId || !pluginId) return {readingTime: undefined, lastUpdated: undefined};

  const readingTime = readingTimes?.[pluginId]?.[docId];
  const lastUpdated = lastUpdatedMap?.[pluginId]?.[docId];

  return {readingTime, lastUpdated};
}

function formatRelativeDate(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  const days = Math.floor(diff / 86400);

  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

function CopyLinkButton({href}: {href: string}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const url = new URL(href, window.location.origin).toString();
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    },
    [href],
  );

  return (
    <button
      type="button"
      className={styles.copyBtn}
      onClick={handleCopy}
      aria-label={translate({
        message: 'Copy link',
        id: 'genindex.copyLink',
        description: 'Aria label for copy-link button',
      })}
      title={copied ? 'Copied!' : 'Copy link'}>
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      )}
    </button>
  );
}

export default function DocListItem({item}: {item: PropSidebarItemLink}) {
  const doc = useDocById(item.docId ?? undefined);
  const description = item.description ?? doc?.description;
  const {readingTime, lastUpdated} = useDocPluginData(item.docId);

  const readingTimeLabel = readingTime
    ? translate(
        {
          message: '{minutes} min',
          id: 'genindex.readingTimeShort',
          description: 'Short reading time label',
        },
        {minutes: readingTime},
      )
    : undefined;

  const lastUpdatedLabel = lastUpdated
    ? formatRelativeDate(lastUpdated)
    : undefined;

  return (
    <div className={styles.row}>
      <Link href={item.href} className={styles.link}>
        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <span className={styles.label}>{item.label}</span>
        {description && (
          <span className={styles.desc}>{description}</span>
        )}
        <span className={styles.metaGroup}>
          {lastUpdatedLabel && (
            <span className={styles.meta} title={lastUpdated ? new Date(lastUpdated * 1000).toLocaleDateString() : undefined}>
              {lastUpdatedLabel}
            </span>
          )}
          {readingTimeLabel && (
            <span className={styles.meta}>{readingTimeLabel}</span>
          )}
        </span>
      </Link>
      <CopyLinkButton href={item.href} />
    </div>
  );
}
