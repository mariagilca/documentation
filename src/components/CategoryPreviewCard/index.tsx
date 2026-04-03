import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {findFirstSidebarItemLink} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarItemCategory} from '@docusaurus/plugin-content-docs';
import styles from './index.module.css';

const MAX_PREVIEW_ITEMS = 4;

const ACCENT_MAP: Record<string, string> = {
  red: 'var(--rmk-accent-legacy)',
  cloud: 'var(--rmk-accent-cloud)',
  onprem: 'var(--rmk-accent-onprem)',
};

// Deterministic gradient angle from title for subtle variation
function titleToAngle(title: string): number {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 100 + (((hash % 80) + 80) % 80); // range 100–180deg
}

function getChildLabels(item: PropSidebarItemCategory): string[] {
  return item.items.map((child) => child.label);
}

export default function CategoryPreviewCard({
  item,
}: {
  item: PropSidebarItemCategory;
}) {
  const href = findFirstSidebarItemLink(item);
  if (!href) {
    return null;
  }

  const childLabels = getChildLabels(item);
  const visibleLabels = childLabels.slice(0, MAX_PREVIEW_ITEMS);
  const remaining = childLabels.length - visibleLabels.length;

  const accentColor = item.className
    ? ACCENT_MAP[item.className]
    : undefined;

  const angle = titleToAngle(item.label);
  const bannerStyle = {
    background: `linear-gradient(${angle}deg, var(--rmk-genindex-banner-from), var(--rmk-genindex-banner-to))`,
  };

  const description =
    item.description ??
    translate(
      {
        message: '{count} items',
        id: 'genindex.itemCount',
        description: 'Fallback description for a category showing item count',
      },
      {count: item.items.length},
    );

  const ctaText = translate(
    {
      message: 'Explore {label}',
      id: 'genindex.cta.explore',
      description: 'CTA text on a category preview card',
    },
    {label: item.label},
  );

  return (
    <Link href={href} className={styles.cardLink}>
      <article
        className={styles.card}
        style={accentColor ? {borderLeftColor: accentColor} : undefined}>
        <div className={styles.banner} style={bannerStyle}>
          <span className={styles.bannerTitle}>{item.label}</span>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <h2 className={styles.title}>{item.label}</h2>
            <p className={styles.description}>{description}</p>
            <span className={styles.cta}>
              {ctaText} <span className={styles.arrow}>→</span>
            </span>
          </div>

          {childLabels.length > 0 && (
            <ul className={styles.previewList}>
              {visibleLabels.map((label) => (
                <li key={label} className={styles.previewItem}>
                  {label}
                </li>
              ))}
              {remaining > 0 && (
                <li className={styles.moreItems}>
                  {translate(
                    {
                      message: '+{count} more',
                      id: 'genindex.moreItems',
                      description:
                        'Indicator for additional items not shown in preview',
                    },
                    {count: remaining},
                  )}
                </li>
              )}
            </ul>
          )}
        </div>
      </article>
    </Link>
  );
}
