import React from 'react';
import {translate} from '@docusaurus/Translate';
import PLATFORM_FACTS from './data';
import styles from './index.module.css';

/**
 * Wraps a SaaS-platform link and reveals its monitoring facts (scan frequency
 * and supported License Access Control operations) in a tooltip on hover or
 * keyboard focus.
 *
 * Usage in MDX:  <PlatformFacts id="adobe-cloud">[Adobe Cloud](./adobe-cloud)</PlatformFacts>
 * The `id` must be a key of data.js. Unknown ids render children unchanged so
 * a missing entry never breaks a page.
 */
/**
 * Just the ⓘ badge + tooltip, for embedding in other components (e.g. the
 * SoftwareCard grid on /supported-software). Renders nothing for unknown ids.
 */
export function FactsBadge({ id }) {
  const facts = PLATFORM_FACTS[id];
  if (!facts) return null;
  return <FactsAnchor id={id} facts={facts} />;
}

export default function PlatformFacts({ id, children }) {
  const facts = PLATFORM_FACTS[id];
  if (!facts) return children;

  return (
    <span className={styles.wrapper}>
      {children}
      <FactsAnchor id={id} facts={facts} />
    </span>
  );
}

function FactsAnchor({ id, facts }) {
  const frequencyLabel = translate({
    id: 'platformFacts.frequency',
    message: 'Scan frequency',
    description: 'Tooltip label for how often a SaaS platform is scanned',
  });
  const lacLabel = translate({
    id: 'platformFacts.lac',
    message: 'License Access Control',
    description: 'Tooltip label for supported License Access Control operations',
  });

  const tooltipId = `platform-facts-${id}`;
  return (
    <span className={styles.anchor} tabIndex={0} aria-describedby={tooltipId}>
        <svg
          className={styles.icon}
          viewBox="0 0 16 16"
          width="14"
          height="14"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="7.25" y="6.8" width="1.5" height="4.6" rx="0.75" fill="currentColor" />
          <circle cx="8" cy="4.6" r="0.95" fill="currentColor" />
        </svg>
        <span role="tooltip" id={tooltipId} className={styles.tooltip}>
          <span className={styles.row}>
            <span className={styles.label}>{frequencyLabel}</span>
            <span className={styles.value}>{facts.frequency}</span>
          </span>
          {facts.lac && facts.lac.length > 0 && (
            <span className={styles.row}>
              <span className={styles.label}>{lacLabel}</span>
              <span className={styles.value}>{facts.lac.join(', ')}</span>
            </span>
          )}
        </span>
    </span>
  );
}
