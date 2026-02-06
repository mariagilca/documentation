import React from 'react';
import Layout from '@theme/Layout';
import styles from './release-notes.module.css';
import { translate } from '@docusaurus/Translate';

export function ArcadeEmbed() {
  const embedTitle = translate({ message: 'Broad Peak' });
  const linkLabel = translate({ message: 'Open demo in a new tab' });

  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          position: 'relative',
          paddingBottom: 'calc(45.27777777777778% + 41px)',
          height: '0',
          width: '100%',
        }}
      >
        <iframe
          src="https://demo.arcade.software/z4bEgB46IOOmUcn8NhTv?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
          title={embedTitle}
          frameBorder="0"
          loading="lazy"
          allowFullScreen
          allow="clipboard-write"
          aria-hidden="true"
          tabIndex={-1}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
        />
      </div>
      <figcaption style={{ marginTop: '0.75rem' }}>
        <a
          href="https://demo.arcade.software/z4bEgB46IOOmUcn8NhTv?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel}
        </a>
      </figcaption>
    </figure>
  );
}

const featureOverview = [
  {
    title: 'Advanced reporting and the SAM cost module',
    bullets: [
      <>
        Feature-wise cost tracking: You can now track costs at the individual feature level. Data is ingested via
        Purchase Orders (PO), Delivery Orders, CSV imports, or manual entry.
      </>,
      <>
        Wastage analysis: The system identifies the gap between what you bought and what you use. Calculation:{' '}
        <code>Wastage = Investment - Usage</code>. Example: If you pay for 10 hours of daily availability but only
        utilize 50 hours total in a year, the system flags the specific dollar amount lost.
      </>,
      <>
        Time-based reporting: Track costs per hour, week, quarter, or year.
      </>,
      <>
        Locational / geographical compliance: Ensure licenses are used in authorized regions.
      </>,
      <>
        License utilization: Deep dive into seat efficiency.
      </>,
      <>
        Borrowed licensing: Visibility into offline license usage.
      </>,
    ],
  },
  {
    title: 'Software catalogue and mapping',
    bullets: [
      <>
        Global vs. local catalogue: Users can provide a local catalogue, and OpenLM will map it against a global
        catalogue to ensure standardized naming conventions.
      </>,
      <>
        Parent-child mapping: Seamlessly map features such as MS Word to their parent subscriptions, such as MS Office.
      </>,
      <>
        Process-feature mapping: Align specific software features with the business processes they support.
      </>,
      <>
        Compliance tracking: Identify non-compliance risks triggered by either unauthorized features or unauthorized
        users.
      </>,
    ],
  },
  {
    title: 'Business Intelligence (BI): The insight layer',
    bullets: [
      <>
        Quick Suite insights: Proactive management with data that highlights issues before they become blockers.
      </>,
      <>
        Underuse and overuse detection: Instant identification of shelfware versus licenses causing productivity
        bottlenecks due to shortages.
      </>,
      <>
        Operational insights: Strategic data points to help IT managers make faster renewal decisions.
      </>,
    ],
  },
  {
    title: 'Artificial Intelligence (AI) and natural language',
    bullets: [
      <>
        Scenario / What-if analysis: A predictive tool that lets you model how changing license count or model impacts
        budget and denial rates.
      </>,
      <>
        NLQ (NLP-based dynamic query generation): A chatbot interface that lets you interact with data using natural
        language queries.
      </>,
    ],
    note: (
      <div className={styles.example}>
        <div className={styles.exampleRow}>
          <span className={styles.exampleLabel}>Input</span>
          <span>Show me a chart of who used the most AutoCAD licenses in the London office last month.</span>
        </div>
        <div className={styles.exampleRow}>
          <span className={styles.exampleLabel}>Output</span>
          <span>A dynamic visualization and a plain-English summary.</span>
        </div>
      </div>
    ),
  },
];

const additionalUpdates = [
  'Real-time communication for dongle monitoring in the agent.',
  'Material migration.',
  'Support for command-line arguments and window title monitoring for processes.',
  'Disable process harvesting for specific users during specific timeframes.',
  'Improvements to the process monitoring flow.',
  'Fixes to process session creation.',
  'Improvements to EUS notifications UX.',
  'Remove License from Currently Consumed Licenses window was added.',
  'Bug fixes.',
  'New alert type integrations: LFM Triads.',
  'DSS UI: add anonymous property to domain settings.',
  'Cloud partners in Cloud Admin UI.',
  'UGS: automatic user alias creation.',
  'Clean Up manager in UGS.',
];

const upcoming = [
  'Anonymization Service.',
  'LFM file history and SLM synchronization: complete testing, implementation of feature recognition, and pre-validation of a license file before push.',
];

const lacUpdates = [
  'Integrated with SLM to improve responsiveness when license servers are deleted or disabled. Policies, Rules, and Assets that require a license server now show error icons with explanatory tooltips.',
  'Integrated with UGS to improve responsiveness when Users & Groups are deleted or disabled. Rules that depend on those entities now show error icons with explanatory tooltips.',
  'Fixed incorrect deployment behavior that caused queue records to disappear without an error or history record.',
];

function FeatureSection({ title, bullets, note }) {
  return (
    <section className={styles.featureSection}>
      <h3 className={styles.featureTitle}>{title}</h3>
      <ul className={styles.featureList}>
        {bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
      {note}
    </section>
  );
}

function UpdateList({ items }) {
  return (
    <ul className={styles.updateList}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function ReleaseNotes() {
  const title = translate({ message: 'Release Notes' });
  const description = translate({
    message:
      'The latest OpenLM Platform feature releases, improvements, and bug fixes.',
  });

  return (
    <Layout title={title} description={description}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>{translate({ message: 'Release notes' })}</p>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDescription}>{description}</p>
          </div>
        </section>

        <div className={styles.heroDivider} aria-hidden="true" />

        <section className={styles.entries}>
          <article className={styles.entry}>
            <div className={styles.entryMeta}>
              <span className={styles.entryDate}>FEBRUARY 3, 2026</span>
              <span className={styles.entryBadge}>Broad Peak</span>
            </div>
            <div className={styles.entryBody}>
              <header className={styles.entryHeader}>
                <h2 className={styles.entryTitle}>OpenLM Platform - Broad Peak release</h2>
                <p className={styles.entryIntro}>
                  This update delivers deeper financial visibility, smarter software mapping, and a new intelligence
                  layer that turns usage data into proactive decisions.
                </p>
              </header>

              <section className={styles.spotlight}>
                <div className={styles.spotlightLabel}>Spotlight</div>
                <h3 className={styles.spotlightTitle}>License Access Control (LAC)</h3>
                <p className={styles.spotlightSummary}>
                  LAC turns license management into policy-driven enforcement: define rules for who can use which
                  features and when, and LAC compiles and deploys option files to your license manager for checkout-time
                  enforcement. Policies bundle rules (with optional schedules), audit logs capture granted and denied
                  attempts, and integrations with UGS and the Features Service validate users, groups, and features.
                </p>
                <UpdateList items={lacUpdates} />
              </section>

              <div className={styles.embedCard}>
                <ArcadeEmbed />
              </div>

              <div className={styles.featureStack}>
                {featureOverview.map((feature) => (
                  <FeatureSection key={feature.title} {...feature} />
                ))}
              </div>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>Identity Discovery</h3>
                <p className={styles.featureSummary}>
                  Use the Identity Discovery service to track login activity from your identity providers (IdPs).
                  Identity Discovery collects user login events and brings them into OpenLM so you can see who logged
                  in, when they logged in, and what service they used. Identity Discovery supports multiple identity
                  accounts, including several accounts of the same type.
                </p>
                <p className={styles.featureNote}>
                  Note: Identity Discovery collects only login metadata. It does not collect passwords or
                  authentication secrets.
                </p>
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>Cloud Broker: Expanded SaaS coverage</h3>
                <p className={styles.featureSummary}>
                  Cloud Broker now supports these SaaS platforms: Bentley, Figma, ZoomInfo, Priority, Monday.com,
                  Syncfusion, Adobe, Zoho, Apollo.io, QuickSuite, Cadenas, Canvas, Materialise Magic, Ash Ware, GNS,
                  OGI, and ETAP.
                </p>
              </section>

              <section className={styles.featureSection}>
                <h3 className={styles.featureTitle}>Additional updates</h3>
                <UpdateList items={additionalUpdates} />
              </section>
            </div>
          </article>

          <article className={`${styles.entry} ${styles.entryUpcoming}`}>
            <div className={styles.entryMeta}>
              <span className={styles.entryDate}>Coming next</span>
              <span className={styles.entryBadgeUpcoming}>In progress</span>
            </div>
            <div className={styles.entryBody}>
              <header className={styles.entryHeader}>
                <h2 className={styles.entryTitle}>What will be released in the nearest future</h2>
                <p className={styles.entryIntro}>
                  These items are actively in flight and will roll out after Broad Peak.
                </p>
              </header>
              <UpdateList items={upcoming} />
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}
