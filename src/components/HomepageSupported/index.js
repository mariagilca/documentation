import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import {translate} from '@docusaurus/Translate';
import supportedSoftware from '@site/src/static/supported-software.json';
import styles from './index.module.css';

// The JSON's `learnMoreLink` field still references the legacy
// `/interfacing-lms/` path segment, but the live docs are served from
// `/connect-license-managers/` (in both English and Japanese builds). Rewrite
// on the fly so the grid deep-links to real pages in every locale without
// requiring a JSON migration.
function resolveDocLink(rawPath) {
  if (!rawPath) return '/supported-software/';
  return rawPath.replace('/interfacing-lms/', '/connect-license-managers/');
}

// Curated featured list — the most recognizable and most-asked-about license
// managers and platforms. Kept deliberately short (20) so the grid reads as
// "here's a taste" rather than a dump of everything. The full catalog lives on
// /supported-software/ and is accessible via the CTA below the grid.
const FEATURED_TITLES = [
  'Flexera Flexnet (FLEXlm)',
  'Sentinel HASP',
  'Sentinel RMS',
  'Reprise RLM',
  'LM-X',
  'DSLS',
  'Codemeter',
  'Altium License Manager',
  'MSC Licensing Helium',
  'CREO',
  'Nvidia License Manager',
  'LS-DYNA',
  'Autodesk Cloud',
  'Adobe Cloud',
  'ArcGIS',
  'Altair',
  'Bentley',
  'Chaos V-Ray',
  'JetBrains Cloud',
  'Office 365 / Azure',
];

function buildFeaturedEntries() {
  const allItems = [
    ...(supportedSoftware.saasPlatforms || []),
    ...(supportedSoftware.licenseManagers || []),
  ];
  const byTitle = new Map(allItems.map((item) => [item.title, item]));
  return FEATURED_TITLES.map((title) => byTitle.get(title)).filter(Boolean);
}

function TotalCount() {
  const saas = supportedSoftware.saasPlatforms?.length || 0;
  const lm = supportedSoftware.licenseManagers?.length || 0;
  // Round down to the nearest 10 so the count reads as a milestone, not a
  // precise-and-fragile number that needs updating each time an item lands.
  const rounded = Math.floor((saas + lm) / 10) * 10;
  return `${rounded}+`;
}

export default function HomepageSupported() {
  const entries = buildFeaturedEntries();
  const eyebrow = translate({
    id: 'homepageSupported.eyebrow',
    message: 'Works with your stack',
  });
  const heading = translate({
    id: 'homepageSupported.heading',
    message: 'Works with the license managers and platforms you already run',
  });
  const lede = translate({
    id: 'homepageSupported.lede',
    message:
      'OpenLM plugs into the license servers, dongles, and cloud platforms you already run — from FlexNet and Sentinel to Autodesk, Adobe, and Esri.',
  });
  const ctaLabel = translate(
    {
      id: 'homepageSupported.cta',
      message: 'See all {count} supported products',
    },
    {count: TotalCount()},
  );

  return (
    <section className={styles.supportedSection} aria-label={heading}>
      <div className={clsx('container', styles.supportedInner)}>
        <div className={styles.supportedIntro}>
          <span className={styles.supportedEyebrow}>{eyebrow}</span>
          <Heading as="h2" className={styles.supportedHeading}>
            {heading}
          </Heading>
          <p className={styles.supportedLede}>{lede}</p>
        </div>

        <ul className={styles.supportedGrid} role="list">
          {entries.map((item) => (
            <li key={item.title} className={styles.supportedCell}>
              <Link
                to={resolveDocLink(item.learnMoreLink)}
                className={styles.supportedTile}
                aria-label={item.title}
                title={item.title}>
                <img
                  src={useBaseUrl(item.icon)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={styles.supportedLogo}
                />
                <span className={styles.supportedLabel}>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.supportedCtaRow}>
          <Link to="/supported-software/" className={styles.supportedCta}>
            {ctaLabel} <span className={styles.ctaArrow} aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
