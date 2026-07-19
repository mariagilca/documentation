import {useEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import SearchBar from '@theme/SearchBar';
import {translate} from '@docusaurus/Translate';
import styles from './index.module.css';
import {heroAnimation} from './heroAnimation';

import purpleSwoop from '@site/static/img/homepage/hero/purple-swoop.png';
import whiteSwoop1 from '@site/static/img/homepage/hero/white-swoop-1.png';
import whiteSwoop2 from '@site/static/img/homepage/hero/white-swoop-2.png';
import blueSwoopTop from '@site/static/img/homepage/hero/blue-swoop-top.png';
import blueSwoopBottom from '@site/static/img/homepage/hero/blue-swoop-bottom.png';

/*
 * Homepage hero, structured after the swift.org landing hero (swift-org-website,
 * Apache-2.0): a left-anchored painted-swoop entrance animation with the
 * product mark docking at its convergence, centered hero copy, and a
 * quicklinks wayfinder. Content, search, and destinations are OpenLM's own.
 */

function CloudIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7 18h9a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 7.2 9.5 4 4 0 0 0 7 18Z" />
    </svg>
  );
}
function ServerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}
function NotesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M8 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6l3-3Z" />
      <path d="M9 11h6M9 15h6" />
    </svg>
  );
}

export default function HomepageHero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let cleanup;
    heroAnimation(container, {
      purpleSwoop,
      whiteSwoop1,
      whiteSwoop2,
      blueSwoopTop,
      blueSwoopBottom,
    })
      .then((fn) => {
        cleanup = fn;
        if (cancelled) cleanup?.();
      })
      .catch((err) => {
        if (!cancelled) console.error('Hero animation failed:', err);
      });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  const primaryLinks = [
    {
      Icon: CloudIcon,
      title: translate({id: 'homepageHero.platform.title', message: 'OpenLM Platform'}),
      subtitle: translate({
        id: 'homepageHero.platform.subtitle',
        message: 'Cloud and on-premise guides for the current OpenLM product.',
      }),
      to: translate({id: 'homepageHero.platform.href', message: '/cloud/getting-started/what-is-openlm'}),
    },
    {
      Icon: ServerIcon,
      title: translate({id: 'homepageHero.legacy.title', message: 'Version 25 (Legacy)'}),
      subtitle: translate({
        id: 'homepageHero.legacy.subtitle',
        message: 'Documentation for the self-hosted Version 25 components.',
      }),
      to: translate({id: 'homepageHero.legacy.href', message: '/legacy/intro'}),
    },
    {
      Icon: NotesIcon,
      title: translate({id: 'homepageHero.releases.title', message: 'Release Notes'}),
      subtitle: translate({
        id: 'homepageHero.releases.subtitle',
        message: 'What shipped in every component, release by release.',
      }),
      to: '/release-notes/',
    },
  ];

  const secondaryLinks = [
    {
      label: translate({id: 'homepageHero.secondary.supported', message: 'Supported Software'}),
      to: '/supported-software/',
    },
    {
      label: translate({id: 'homepageHero.secondary.glossary', message: 'Glossary'}),
      to: translate({id: 'homepageHero.secondary.glossary.href', message: '/cloud/glossary'}),
    },
    {
      label: translate({id: 'homepageHero.secondary.downloads', message: 'Downloads'}),
      href: 'https://www.openlm.com/downloads/',
    },
    {
      label: translate({id: 'homepageHero.secondary.support', message: 'Contact support'}),
      href: 'https://www.openlm.com/contact-us/',
    },
  ];

  return (
    <>
      <div className={styles.animationContainer} ref={containerRef} aria-hidden="true">
        <canvas data-swoop="purple-swoop" width="1248" height="1116" />
        <canvas data-swoop="white-swoop-1" width="1248" height="1116" />
        <canvas data-swoop="blue-swoop-top" width="1248" height="1116" />
        <canvas data-swoop="blue-swoop-bottom" width="1248" height="1116" />
        <canvas data-swoop="white-swoop-2" width="1248" height="1116" />
        <canvas data-swoop="logo" width="1248" height="1116" />
      </div>

      <section className={clsx(styles.hero, styles.noise)}>
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {translate({id: 'homepageHeader.title', message: 'OpenLM Documentation'})}
          </Heading>
          <div className={styles.heroSub}>
            <p>
              {translate({
                id: 'homepageHeader.subtitle',
                message:
                  'Guides, references, and release notes for managing and monitoring your software licenses with OpenLM.',
              })}
            </p>
          </div>
          <div className={styles.searchContainer}>
            <SearchBar />
          </div>
          <Link className={styles.heroCta} to={translate({id: 'deploymentCards.cloud.href', message: '/cloud/getting-started/what-is-openlm'})}>
            {translate({id: 'homepageHero.cta', message: 'Get started'})}
          </Link>
          <p className={styles.heroSubscribeLine}>
            <Link to="/subscribe/">
              {translate({id: 'homepageHeader.subscribe.cta', message: 'Subscribe to release updates'})}
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
          <Heading as="h2" className={styles.exploreHeading}>
            {translate({id: 'homepageHero.explore', message: 'Explore the documentation'})}
          </Heading>
        </div>

        <nav
          className={styles.quicklinks}
          aria-label={translate({
            id: 'homepageHero.nav.aria',
            message: 'Explore the OpenLM documentation',
          })}>
          <ul className={styles.primaryLinks}>
            {primaryLinks.map(({Icon, title, subtitle, to}) => (
              <li key={title}>
                <Link to={to}>
                  <Icon className={styles.linkIcon} />
                  <div>
                    <h3 className={styles.linkTitle}>{title}</h3>
                    <p className={styles.linkSubtitle}>{subtitle}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.secondaryLinks}>
            {secondaryLinks.map(({label, to, href}) => (
              <li key={label}>
                {to ? (
                  <Link to={to}>
                    <span className={styles.linkTitleSm}>{label}</span>
                  </Link>
                ) : (
                  <Link href={href} target="_blank" rel="noopener noreferrer">
                    <span className={styles.linkTitleSm}>{label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={clsx(styles.swoop, styles.swoop0, 'swoop-anim')} />
      </section>
    </>
  );
}
