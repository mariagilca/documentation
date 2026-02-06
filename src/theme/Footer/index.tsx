import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Logo from '@theme/Logo';
import {useThemeConfig} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
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
      <div className={clsx('container', styles.container)}>
        <div className={styles.header}>
          <div className={styles.branding}>
            <div className={styles.logoRow}>
              <Logo className={styles.logo} />
              <div>
                <p className={styles.brandName}>{siteConfig.title}</p>
                <p className={styles.tagline}>{siteConfig.tagline}</p>
              </div>
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

        {footer.copyright && (
          <div className={styles.meta} dangerouslySetInnerHTML={{__html: footer.copyright}} />
        )}
      </div>
    </footer>
  );
}
