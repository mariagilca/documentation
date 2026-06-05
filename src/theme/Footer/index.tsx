import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import {useThemeConfig} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SubscribeWidget from '@site/src/components/SubscribeWidget';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

type FooterLinkItem = {
  label?: string;
  to?: string;
  href?: string;
  html?: string;
  target?: string;
  rel?: string;
};

type FooterLinkSection = {
  title?: string;
  items: FooterLinkItem[];
};

type FooterConfig = {
  links?: FooterLinkSection[];
  copyright?: string;
};

function FooterLink({item}: {item: FooterLinkItem}) {
  if (!item || (!item.label && !item.html)) {
    return null;
  }

  if (item.html) {
    return <span className={styles.html} dangerouslySetInnerHTML={{__html: item.html}} />;
  }

  const linkProps = item.to ? {to: item.to} : {href: item.href};

  return (
    <Link className={styles.link} {...linkProps} target={item.target} rel={item.rel}>
      <span>{item.label}</span>
      <svg className={styles.linkArrow} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path
          d="M5.25 4.75h6v6m0-6L4.75 11.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

function ActionLink({
  item,
  variant = 'solid',
}: {
  item: FooterLinkItem | undefined;
  variant?: 'solid' | 'ghost';
}) {
  if (!item || !item.label || (!item.to && !item.href)) {
    return null;
  }

  const linkProps = item.to ? {to: item.to} : {href: item.href};

  return (
    <Link
      className={clsx(styles.action, variant === 'ghost' ? styles.actionGhost : styles.actionSolid)}
      {...linkProps}
      target={item.target}
      rel={item.rel}>
      <span>{item.label}</span>
      <span className={styles.actionArrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default function Footer() {
  const {footer} = useThemeConfig() as {footer?: FooterConfig};
  const {siteConfig} = useDocusaurusContext();
  // OpenLM mark (icon only, no "Docs" wordmark). Dark ink for the light-mode
  // footer; a white-ink variant for the dark-mode footer.
  const markLight = useBaseUrl('/img/logo.png');
  const markDark = useBaseUrl('/img/logo-white.png');
  // Oversized, faint OpenLM wordmark anchored to the bottom of the footer and
  // clipped by overflow:hidden (arcade.software-style). One #d9d9d9 asset for
  // both themes; only the opacity differs (set in CSS).
  const watermark = useBaseUrl('/img/openlm-logo.svg');

  if (!footer || !footer.links || footer.links.length === 0) {
    return null;
  }

  const flattenedItems =
    footer.links?.reduce<FooterLinkItem[]>((all, section) => all.concat(section.items ?? []), []) ??
    [];

  const downloadsLink = flattenedItems.find((item) => item.label === 'Downloads');
  const feedbackLink = flattenedItems.find((item) =>
    (item.label ?? '').toLowerCase().includes('feedback'),
  );

  return (
    <footer className={clsx('footer', 'footer--dark', 'theme-layout-footer', styles.footer)}>
      <div className={styles.backdrop} />
      <img
        className={styles.watermark}
        src={watermark}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className={clsx('container', styles.container)}>
        <div className={styles.header}>
          <div className={styles.branding}>
            <ThemedImage
              className={styles.brandMark}
              alt=""
              aria-hidden="true"
              sources={{light: markLight, dark: markDark}}
            />
            <div className={styles.brandText}>
              <p className={styles.brandName}>OpenLM</p>
              <p className={styles.tagline}>{siteConfig.tagline}</p>
            </div>
          </div>
          <div className={styles.actions}>
            <ActionLink item={downloadsLink} variant="solid" />
            <ActionLink item={feedbackLink} variant="ghost" />
          </div>
        </div>

        <div className={styles.linksGrid}>
          {footer.links?.map((linkGroup, index) => (
            <div key={index} className={styles.linkColumn}>
              {linkGroup.title && <h2 className={styles.columnTitle}>{linkGroup.title}</h2>}
              <ul className={styles.linkList}>
                {linkGroup.items?.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.linkItem}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.subscribeBand}>
          <p className={styles.subscribeTitle}>
            {translate({
              id: 'footer.subscribe.title',
              message: 'Release updates, in your inbox.',
            })}
          </p>
          <div className={styles.subscribeForm}>
            <SubscribeWidget inline />
          </div>
        </div>
      </div>
    </footer>
  );
}
