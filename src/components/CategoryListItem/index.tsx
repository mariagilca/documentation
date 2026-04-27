import React, {useCallback, useState} from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {findFirstSidebarItemLink} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarItemCategory} from '@docusaurus/plugin-content-docs';
import styles from './index.module.css';

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

export default function CategoryListItem({
  item,
}: {
  item: PropSidebarItemCategory;
}) {
  const href = findFirstSidebarItemLink(item);
  if (!href) return null;

  const count = item.items.length;
  const countLabel =
    count === 1
      ? translate(
          {
            message: '1 article',
            id: 'genindex.itemCount.one',
            description: 'Article count label for a category with one article',
          },
        )
      : translate(
          {
            message: '{count} articles',
            id: 'genindex.itemCount.other',
            description: 'Article count label for a category with multiple articles',
          },
          {count: String(count)},
        );

  return (
    <div className={styles.row}>
      <Link href={href} className={styles.link}>
        <span className={styles.label}>{item.label}</span>
        {item.description && (
          <span className={styles.desc}>{item.description}</span>
        )}
        <span className={styles.metaGroup}>
          <span className={styles.meta}>{countLabel}</span>
        </span>
      </Link>
      <CopyLinkButton href={href} />
    </div>
  );
}
