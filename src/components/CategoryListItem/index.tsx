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

  return (
    <div className={styles.row}>
      <Link href={href} className={styles.link}>
        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        <span className={styles.label}>{item.label}</span>
        {item.description && (
          <span className={styles.desc}>{item.description}</span>
        )}
        <span className={styles.count}>
          {translate(
            {
              message: '{count} items',
              id: 'genindex.itemCount',
              description: 'Fallback description for a category showing item count',
            },
            {count},
          )}
        </span>
      </Link>
      <CopyLinkButton href={href} />
    </div>
  );
}
