import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './release-notes.module.css';
import { translate } from '@docusaurus/Translate';

/* =============================================================================
 * Release Notes — repeatable system
 * =============================================================================
 *
 * ⚠️ DUAL-SOURCE PAGE — read this before editing.
 *
 * This file (`src/pages/release-notes.js`) renders the English version of
 * /release-notes/. The Japanese version is NOT translated via <Translate>
 * wraps or i18n/ja/code.json; instead, it is rendered from a separate
 * full-page override at:
 *
 *     i18n/ja/docusaurus-plugin-content-pages/release-notes.js
 *
 * If you change ANY visible string, link target, image, Spotlight order,
 * or Demo here, mirror the same change in the JA override file. They are
 * intentionally kept in sync by hand because the prose is long and
 * marketing-tuned, and the Docusaurus i18n string flow would shred it.
 *
 * Quick checklist when editing:
 *   1. Make the change here.
 *   2. Open the JA override and apply the equivalent change in Japanese.
 *   3. Confirm both files parse, then `npm run build` to verify both
 *      locales render the new content.
 *
 * -----------------------------------------------------------------------
 *
 * Adding a new release is meant to be a few minutes of copy-paste-and-edit.
 * Below the helpers and data, you'll see the page render method. Add your
 * new release as a `<ReleaseEntry>` block at the TOP of the entries section.
 *
 * Skeleton:
 * ---------------------------------------------------------------------------
 *   <ReleaseEntry
 *     date="MONTH DAY, YEAR"           // or "Coming soon" / "Coming next"
 *     badge="Codename"                  // string codename, OR omit and pass `codename`
 *     title="OpenLM Platform — Codename release"   // string or React node
 *     intro="One- to two-sentence summary of the release."
 *   >
 *     <Spotlight title="Headline feature name">
 *       <p>Body copy. Plain prose, anything you want.</p>
 *       <UpdateList items={anArrayOfStrings} />        // optional bullets
 *       <Demo src="https://demo.arcade.software/<id>?embed&..." title="Demo" />
 *     </Spotlight>
 *
 *     <FeatureSection title="Section without the gradient card">
 *       <p>Body copy.</p>
 *     </FeatureSection>
 *
 *     <FeatureSection title="Additional updates">
 *       <UpdateList items={additionalUpdates} />
 *     </FeatureSection>
 *   </ReleaseEntry>
 *
 * Building blocks:
 *   <ReleaseEntry>     One release. Date + badge on the left, body on the right.
 *                      Pass variant="upcoming" for "Coming next" teasers.
 *   <Spotlight>        Highlighted section with the soft gradient card.
 *   <FeatureSection>   Plain section, no card. Use for the long tail.
 *   <UpdateList>       Styled bullet list. Pass an `items` array.
 *   <ExampleBox>       Two-row Input/Output illustration block.
 *   <Demo>             Arcade iframe. Pass `src=null` to render
 *                      "Interactive demo coming soon." instead of a 404.
 *   <MysteryCodename/> Shimmering placeholder for an unannounced codename.
 *                      Pattern: "C" + 5 masked slots. Replace with the real
 *                      codename string when ready.
 *
 * Lists you'll often want as data (bullets, additional updates, etc.) live
 * in the "Per-release content" section below. Add release-specific arrays
 * there, then reference them with <UpdateList items={yourArray} />.
 * ===========================================================================*/

// =============================================================================
// Reusable building blocks
// =============================================================================

// Arcade share/videos/* URLs are 16:9 video players; demo.arcade.software flows
// use the taller flow ratio plus a 41px chrome strip. Pick the right padding so
// the bottom of the embed (controls / subtitles) is not clipped.
function arcadePaddingBottom(src) {
  if (typeof src === 'string' && src.includes('arcade.software/share/videos/')) {
    return '56.25%';
  }
  return 'calc(45.27777777777778% + 41px)';
}

function ArcadeIframe({ src, title }) {
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: arcadePaddingBottom(src),
        height: '0',
        width: '100%',
      }}
    >
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
      />
    </div>
  );
}

/**
 * <Demo src="..." title="..." />
 * Renders the Arcade iframe inside an embed card when `src` is set.
 * When `src` is null/undefined, renders nothing — the surrounding copy and
 * bullets are enough on their own until a real demo is recorded.
 */
function Demo({ src, title }) {
  if (!src) return null;
  return (
    <div className={styles.embedCard}>
      <ArcadeIframe src={src} title={title} />
    </div>
  );
}

function UpdateList({ items }) {
  return (
    <ul className={styles.updateList}>
      {items.map((item, index) => (
        <li key={typeof item === 'string' ? item : `bullet-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

function ExampleBox({ input, output }) {
  return (
    <div className={styles.example}>
      <div className={styles.exampleRow}>
        <span className={styles.exampleLabel}>Input</span>
        <span>{input}</span>
      </div>
      <div className={styles.exampleRow}>
        <span className={styles.exampleLabel}>Output</span>
        <span>{output}</span>
      </div>
    </div>
  );
}

function Spotlight({ title, children }) {
  return (
    <section className={styles.spotlight}>
      <div className={styles.spotlightLabel}>Spotlight</div>
      <h3 className={styles.spotlightTitle}>{title}</h3>
      <div className={styles.spotlightBody}>{children}</div>
    </section>
  );
}

function FeatureSection({ title, children }) {
  return (
    <section className={styles.featureSection}>
      <h3 className={styles.featureTitle}>{title}</h3>
      {children}
    </section>
  );
}

/**
 * Renders one release. Layout: date + badge on the left, body on the right.
 * variant="upcoming" applies a softer, in-progress treatment for teaser entries.
 */
function ReleaseEntry({ date, badge, codename, title, intro, variant, children }) {
  const isUpcoming = variant === 'upcoming';
  const articleClass = isUpcoming ? `${styles.entry} ${styles.entryUpcoming}` : styles.entry;

  let badgeNode = null;
  if (badge) {
    badgeNode = (
      <span className={isUpcoming ? styles.entryBadgeUpcoming : styles.entryBadge}>
        {badge}
      </span>
    );
  } else if (codename) {
    badgeNode = <span className={styles.entryBadgeMystery}>{codename}</span>;
  }

  return (
    <article className={articleClass}>
      <div className={styles.entryMeta}>
        <span className={styles.entryDate}>{date}</span>
        {badgeNode}
      </div>
      <div className={styles.entryBody}>
        {(title || intro) && (
          <header className={styles.entryHeader}>
            {title && <h2 className={styles.entryTitle}>{title}</h2>}
            {intro && <p className={styles.entryIntro}>{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </article>
  );
}

/**
 * Mystery codename: fixed first letter "C" + five shimmering masked slots.
 * Drop this in anywhere a codename string would normally go. When the real
 * codename is announced, replace `<MysteryCodename />` with the literal name.
 */
function MysteryCodename() {
  return (
    <span className={styles.codename} aria-label="Codename pending">
      <span className={styles.codenameKnown}>C</span>
      <span className={styles.codenameMask} aria-hidden="true">
        <span className={styles.codenameSlot} />
        <span className={styles.codenameSlot} />
        <span className={styles.codenameSlot} />
        <span className={styles.codenameSlot} />
        <span className={styles.codenameSlot} />
      </span>
    </span>
  );
}

// Kept as a named export for backwards compatibility with any existing imports.
export function ArcadeEmbed() {
  return (
    <ArcadeIframe
      src="https://demo.arcade.software/z4bEgB46IOOmUcn8NhTv?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
      title={translate({ message: 'Broad Peak' })}
    />
  );
}

// =============================================================================
// Per-release content (data arrays)
// =============================================================================
// Convention: keep prose in JSX (so you can use <code>, <em>, <Link>, etc.),
// keep flat lists of bullet text in arrays here so the JSX stays readable.

// --- Next release (codename pending) ---------------------------------------
const nextReleaseDemos = {
  // Set `src` to the published Arcade embed URL when each demo goes live.
  // Until then, <Demo src={null}> renders a small "coming soon" line.
  mcp: {
    title: 'MCP Reporting Server in action',
    src: null, // TODO: paste published Arcade embed URL here.
  },
  aam: {
    title: 'Mass upgrade Workstation Agents from Agent Activity Manager',
    // Previous Arcade is out of date and needs to be re-recorded. Paste the
    // refreshed embed URL here when it's ready.
    // Old URL: 'https://app.arcade.software/share/videos/z38jA547Bu4Emf8a3Nls'
    src: null,
  },
  lfm: {
    title: 'License File Management walkthrough',
    // Previous Arcade is out of date and needs to be re-recorded. Paste the
    // refreshed embed URL here when it's ready.
    // Old URL: 'https://demo.arcade.software/iqtUV8W31e21ClXO4r3e?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true'
    src: null,
  },
};

const homepageBullets = [
  'KPI summary cards for license servers offline and denied requests, each with a one-click deep link into the underlying view.',
  'License Servers Status donut breaking your fleet down into Healthy, Pending, and Error states, so a single outage no longer hides behind an aggregate.',
  'Top 5 Denied Features and Top 5 Features in Use, side by side — see where demand is hitting the ceiling and where engineering teams are spending the budget.',
  'Top 5 Saturated and Top 5 Underutilized License Pools, side by side — surface reclaim opportunities without writing a custom report.',
  'Usage trend and Upcoming expirations & renewals widgets, plus a severity-aware alert bar that surfaces critical signal at the top of the page.',
  'Take the Tour guided walkthrough for first-time admins, and an SLM activation gate that shows a clear lock card instead of empty widgets when SLM is inactive.',
];

const lfmBullets = [
  'Automatic synchronization between LFM and SLM, keeping license server names in sync with license files (including triad members).',
  'License file history with a per-file event timeline covering drafts, deployments, deactivations, and deletions.',
  'Parsed license features shown as a structured table — feature name, vendor, version, license type, start and expiration dates, quantity, and key.',
  'Compare different versions of the same license file: side-by-side raw-text comparison and a parsed-features table comparison that highlights added, removed, and changed features.',
  'Pre-validation of license files before pushing to Broker Hub, with file-text verification and warning detection (structural, semantic, and server-availability checks).',
];

// --- Broad Peak ------------------------------------------------------------
const broadPeakDemo = {
  title: 'Broad Peak',
  src: 'https://demo.arcade.software/z4bEgB46IOOmUcn8NhTv?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true',
};

const lacUpdates = [
  'Integrated with SLM to improve responsiveness when license servers are deleted or disabled. Policies, Rules, and Assets that require a license server now show error icons with explanatory tooltips.',
  'Integrated with UGS to improve responsiveness when Users & Groups are deleted or disabled. Rules that depend on those entities now show error icons with explanatory tooltips.',
  'Fixed incorrect deployment behavior that caused queue records to disappear without an error or history record.',
];

const samBullets = [
  <>
    Feature-wise cost tracking: You can now track costs at the individual feature level. Data is ingested via
    Purchase Orders (PO), Delivery Orders, CSV imports, or manual entry.
  </>,
  <>
    Wastage analysis: The system identifies the gap between what you bought and what you use. Calculation:{' '}
    <code>Wastage = Investment - Usage</code>. Example: If you pay for 10 hours of daily availability but only
    utilize 50 hours total in a year, the system flags the specific dollar amount lost.
  </>,
  <>Time-based reporting: Track costs per hour, week, quarter, or year.</>,
  <>Locational / geographical compliance: Ensure licenses are used in authorized regions.</>,
  <>License utilization: Deep dive into seat efficiency.</>,
  <>Borrowed licensing: Visibility into offline license usage.</>,
];

const catalogueBullets = [
  <>
    Global vs. local catalogue: Users can provide a local catalogue, and OpenLM will map it against a global
    catalogue to ensure standardized naming conventions.
  </>,
  <>Parent-child mapping: Seamlessly map features such as MS Word to their parent subscriptions, such as MS Office.</>,
  <>Process-feature mapping: Align specific software features with the business processes they support.</>,
  <>
    Compliance tracking: Identify non-compliance risks triggered by either unauthorized features or unauthorized
    users.
  </>,
];

const biBullets = [
  <>Quick Suite insights: Proactive management with data that highlights issues before they become blockers.</>,
  <>
    Underuse and overuse detection: Instant identification of shelfware versus licenses causing productivity
    bottlenecks due to shortages.
  </>,
  <>Operational insights: Strategic data points to help IT managers make faster renewal decisions.</>,
];

const aiBullets = [
  <>
    Scenario / What-if analysis: A predictive tool that lets you model how changing license count or model impacts
    budget and denial rates.
  </>,
  <>
    NLQ (NLP-based dynamic query generation): A chatbot interface that lets you interact with data using natural
    language queries.
  </>,
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

// --- Coming next (post-current-release teaser) -----------------------------
const upcoming = [
  'Anonymization Service.',
];

// =============================================================================
// Page
// =============================================================================
export default function ReleaseNotes() {
  const title = translate({ message: 'Release Notes' });
  const description = translate({
    message: 'The latest OpenLM Platform feature releases, improvements, and bug fixes.',
  });

  return (
    <Layout title={title} description={description}>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>{translate({ message: 'Release notes' })}</p>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDescription}>{description}</p>
          </div>
        </section>

        <div className={styles.heroDivider} aria-hidden="true" />

        <section className={styles.entries}>

          {/* ============================================================== */}
          {/* Next release — codename pending                                */}
          {/* ============================================================== */}
          <ReleaseEntry
            date="Coming soon"
            codename={<MysteryCodename />}
            title={<>OpenLM Platform — codename <MysteryCodename /></>}
            intro="The next OpenLM Platform release reshapes the post-login experience. A redesigned Homepage replaces the QuickSight lobby with operational signal you can act on, Agent Activity Manager turns mass upgrades into a single action across your fleet of Workstation Agents, License File Management brings editing, validation, and deployment of license files into one workspace, and the MCP Reporting Server opens your reporting data to AI assistants for plain-language queries."
          >
            <Spotlight title="New Homepage dashboard">
              <p>
                The post-login screen is no longer a lobby of nav tiles — it
                is a real operational dashboard. The QuickSight-backed
                Homepage has been replaced with a native Angular widget grid
                that surfaces license health, denial volume, and pool
                utilization the moment you sign in. First paint is faster,
                the cloud-only dependency is gone, and every widget plugs
                into a shared shell so loading, empty, and error states
                behave the same way across the board. See the{' '}
                <Link to="/cloud/changelog/cloud/homepage">
                  Homepage changelog
                </Link>{' '}
                for the full per-version history.
              </p>
              <UpdateList items={homepageBullets} />
              <figure style={{ margin: '1.5rem 0 0' }}>
                <img
                  src="/documentation/img/release-notes/homepage-dashboard.png"
                  alt="New OpenLM Homepage dashboard with KPI cards for offline servers and denied requests, a license server health donut, denied features and features-in-use bar charts, and saturated and underutilized license pool widgets"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
                <figcaption
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '0.9rem',
                    color: 'var(--ifm-color-emphasis-700)',
                    textAlign: 'center',
                    fontStyle: 'italic',
                  }}
                >
                  The redesigned Homepage surfaces license server health,
                  denial trends, top features, and license pool utilization
                  in a single post-login view.
                </figcaption>
              </figure>
            </Spotlight>

            <Spotlight title="MCP Reporting Server">
              <p>
                OpenLM now speaks the Model Context Protocol (MCP), the open
                standard for connecting AI assistants to live business data.
                Point Claude, ChatGPT, Cursor, Windsurf, Gemini CLI, or any
                other MCP-aware client at your tenant, sign in once with OAuth,
                and ask questions in plain language: <em>"Which features were
                denied most often last month?"</em>,{' '}
                <em>"Show me underused AutoCAD seats by office."</em> The MCP
                Reporting Server translates your prompt into a GraphQL query
                against your reporting database and returns tables, summaries,
                or — on higher-tier AI plans — fully interactive dashboards.
                No new BI tool to learn, no exported CSVs, no hand-built
                filters. Your reporting data, conversational.
              </p>
              <p>
                Endpoints are provided for both regions —{' '}
                <code>https://cloud-us.openlm.com/mcp</code> for US and{' '}
                <code>https://cloud-eu.openlm.com/mcp</code> for EU. See the{' '}
                <Link to="/cloud/category/mcp-reporting-server">
                  MCP Reporting Server documentation
                </Link>{' '}
                for client setup and the full tool reference.
              </p>
              <Demo {...nextReleaseDemos.mcp} />
            </Spotlight>

            <Spotlight title="Mass upgrade Workstation Agents from Agent Activity Manager">
              <p>
                Updating Workstation Agents one machine at a time is over.
                From Agent Activity Manager, select any subset of agents
                across your fleet, pick a target Workstation Agent version,
                and trigger the upgrade in a single action. There is no
                per-machine MSI work, no need to touch endpoints individually,
                and rollout progress is visible in one place. Use it to deploy
                a hotfix to a single team, stage a phased rollout, or move an
                entire organization onto the latest agent on the same day.
              </p>
              <Demo {...nextReleaseDemos.aam} />
            </Spotlight>

            <Spotlight title="License File Management (LFM)">
              <p>
                LFM brings license-file editing, validation, and deployment
                into one place. Work safely with drafts before you push, see
                each file's parsed features as a structured table, compare
                versions at both the text and feature level, and let LFM keep
                license-file to license-server links in sync with SLM —
                triad-aware, with a full per-file event history. See the{' '}
                <Link to="/cloud/lfm">License File Management</Link>{' '}
                documentation for the full feature reference.
              </p>
              <UpdateList items={lfmBullets} />
              <Demo {...nextReleaseDemos.lfm} />
            </Spotlight>

            <FeatureSection title="Additional updates">
              <p className={styles.featureSummary}>
                More items will land in this section as the release approaches.
              </p>
            </FeatureSection>
          </ReleaseEntry>

          {/* ============================================================== */}
          {/* Broad Peak                                                     */}
          {/* ============================================================== */}
          <ReleaseEntry
            date="FEBRUARY 3, 2026"
            badge="Broad Peak"
            title="OpenLM Platform - Broad Peak release"
            intro="This update delivers deeper financial visibility, smarter software mapping, and a new intelligence layer that turns usage data into proactive decisions."
          >
            <Spotlight title="License Access Control (LAC)">
              <p>
                LAC turns license management into policy-driven enforcement: define rules for who can use which
                features and when, and LAC compiles and deploys option files to your license manager for checkout-time
                enforcement. Policies bundle rules (with optional schedules), audit logs capture granted and denied
                attempts, and integrations with UGS and the Features Service validate users, groups, and features.
              </p>
              <UpdateList items={lacUpdates} />
              <Demo {...broadPeakDemo} />
            </Spotlight>

            <FeatureSection title="Advanced reporting and the SAM cost module">
              <UpdateList items={samBullets} />
            </FeatureSection>

            <FeatureSection title="Software catalogue and mapping">
              <UpdateList items={catalogueBullets} />
            </FeatureSection>

            <FeatureSection title="Business Intelligence (BI): The insight layer">
              <UpdateList items={biBullets} />
            </FeatureSection>

            <FeatureSection title="Artificial Intelligence (AI) and natural language">
              <UpdateList items={aiBullets} />
              <ExampleBox
                input="Show me a chart of who used the most AutoCAD licenses in the London office last month."
                output="A dynamic visualization and a plain-English summary."
              />
            </FeatureSection>

            <FeatureSection title="Identity Discovery">
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
            </FeatureSection>

            <FeatureSection title="Cloud Broker: Expanded SaaS coverage">
              <p className={styles.featureSummary}>
                Cloud Broker now supports these SaaS platforms: Bentley, Figma, ZoomInfo, Priority, Monday.com,
                Syncfusion, Adobe, Zoho, Apollo.io, QuickSuite, Cadenas, Canvas, Materialise Magic, Ash Ware, GNS,
                OGI, and ETAP.
              </p>
            </FeatureSection>

            <FeatureSection title="Additional updates">
              <UpdateList items={additionalUpdates} />
            </FeatureSection>
          </ReleaseEntry>

          {/* ============================================================== */}
          {/* Coming next                                                    */}
          {/* ============================================================== */}
          <ReleaseEntry
            variant="upcoming"
            date="Coming next"
            badge="In progress"
            title="What will be released in the nearest future"
            intro="These items are actively in flight and will roll out after Broad Peak."
          >
            <UpdateList items={upcoming} />
          </ReleaseEntry>
        </section>
      </div>
    </Layout>
  );
}
