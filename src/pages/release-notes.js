import React, { useContext, useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import SubscribeButton from '@site/src/components/SubscribeButton';
import { ReleaseList, ReleaseEntry, ReleaseEntryOpenContext } from '@site/src/components/ReleaseTimeline';
import styles from './release-notes.module.css';
import { translate } from '@docusaurus/Translate';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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
 * Releases collapse/expand. Each <ReleaseEntry> folds its body behind a
 * clickable title; collapsed entries show only the date, badge, and title.
 * Put `defaultOpen` on the NEWEST entry only and REMOVE it from the previous
 * newest when you add a release, so exactly one release is open on load.
 * A shared "Expand all / Collapse all" toolbar (from <ReleaseList>) sits
 * above the entries.
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

function ArcadeIframe({ src, title, paddingBottom }) {
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: paddingBottom ?? arcadePaddingBottom(src),
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
 * Renders the Arcade iframe inside an embed card when `src` is set. When `src`
 * is null/undefined, renders nothing — keep the <Demo> slot in place and paste
 * the embed URL into the data object when the demo is recorded.
 *
 * The iframe mounts lazily: it waits until the surrounding release is expanded
 * (ReleaseEntryOpenContext) so a collapsed release never pays the third-party
 * embed's DOM/network cost, and the page stays light as releases accumulate.
 */
function Demo({ src, title, paddingBottom }) {
  const open = useContext(ReleaseEntryOpenContext);
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  if (!src) {
    return null;
  }
  if (!mounted) return null;
  return (
    <div className={styles.embedCard}>
      <ArcadeIframe src={src} title={title} paddingBottom={paddingBottom} />
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

// ReleaseEntry (collapsible) and ReleaseList (context + Expand/Collapse-all
// toolbar) live in src/components/ReleaseTimeline so the English page and the
// Japanese override share identical collapse behaviour. Pass `defaultOpen` to
// the newest release only; every other entry starts collapsed.

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

// --- Cho Oyu (upcoming release) --------------------------------------------
const nextReleaseDemos = {
  // Set `src` to the published Arcade embed URL when each demo goes live.
  // Until then, <Demo src={null}> renders a small "coming soon" line.
  release: {
    title: 'Cho Oyu release walkthrough',
    src: 'https://demo.arcade.software/3Zy0dx93OotREscX9mQ2?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true',
    // Aspect ratio from the published Arcade embed snippet for this recording.
    paddingBottom: 'calc(58.01713586291309% + 41px)',
  },
  mcp: {
    title: 'OpenLM MCP Connector in action',
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
  'Take the Tour guided walkthrough for first-time admins, and a Software License Monitoring (SLM) activation gate that shows a clear lock card instead of empty widgets when SLM is inactive.',
];

const lfmBullets = [
  'Automatic synchronization between LFM and SLM, keeping license server names in sync with license files (including triad members).',
  'License file history with a per-file event timeline covering drafts, deployments, deactivations, and deletions.',
  'Parsed license features shown as a structured table — feature name, vendor, version, license type, start and expiration dates, quantity, and key.',
  'Compare different versions of the same license file: side-by-side raw-text comparison and a parsed-features table comparison that highlights added, removed, and changed features.',
  'Pre-validation of license files before pushing to Broker Hub, with file-text verification and warning detection (structural, semantic, and server-availability checks).',
];

const nextLacUpdates = [
  <>
    <strong>Streamlined Add/Edit flows for allocations and schedules.</strong> Creating and editing allocations and schedules is simpler, and the data reads more clearly — fewer columns and a cleaner layout. Rules and Schedules now live within an asset's Server Allocation Details, so you work with a single license manager at a time.
  </>,
  <>
    <strong>Project-based allocations.</strong> Added support for project-based allocations for FLEXlm and RLM license managers, extending allocations beyond the existing User, Group, and Workstation entity types.
  </>,
  <>
    <strong>Agent enforcement (minimum viable product).</strong> LAC now correlates allocations against Agent Activity Manager to detect workstations consuming licenses without an active Workstation Agent. When the new global enforcement toggle is on, the next deployment skips allocations for those workstations — restoring accurate consumption data for high-value licenses and turning OpenLM from a passive observer into an active compliance control. Detection distinguishes a temporarily offline Agent from a missing one, so a brief disconnect does not punish legitimate users.
  </>,
  <>
    <strong>Bulk allocation creation.</strong> Add hundreds of entities or features to a single asset in one action. Select multiple features and multiple entities at once in the allocation wizard, and LAC creates one allocation per combination — replacing the per-allocation pattern that previously made onboarding a 200-group option file an all-day task. Powered by a new <code>AddRules</code> GraphQL mutation; the existing <code>AddRule</code> mutation is unchanged.
  </>,
  <>
    <strong>SaaS deployment.</strong> Rules can now be deployed to SaaS license servers through both scheduled and manual deployments, closing the gap between SaaS and on-premise coverage.
  </>,
  <>
    <strong>Resilient deployment with corrupted Users & Groups Service (UGS) entities.</strong> Asset and schedule deployments no longer fail when a referenced user or group has been disabled, deleted, or emptied in UGS. Affected allocations are skipped, logged with a clear warning, and surfaced in the deployment history, so administrators can clean up downstream without losing the rest of the deployment.
  </>,
];

const samDiscoveryBullets = [
  'Software Catalog Discovery page that orchestrates the discovery agents end to end.',
  'Discovered Vendors tab with a vendor grid, vendor management, and on-demand vendor discovery.',
  'Discovered Products tab with enrichment status and on-demand product discovery.',
  'Job Runs & History tab with active-job monitoring and a browsable history of every discovery run.',
];

const newIntegrationBullets = [
  <>
    <strong>Zendesk.</strong> OpenLM alerts now create Zendesk tickets automatically, with a new setup interface for
    authenticating and configuring the connection.
  </>,
  <>
    <strong>Google Chat.</strong> Receive OpenLM alerts in a Google Chat space and query OpenLM data without leaving
    the conversation, using slash commands backed by the GraphQL APIs. A consent page covers permissions, and stored
    integration data can be removed on request.
  </>,
  <>
    <strong>Monday SAM.</strong> A new monday.com app brings software asset management to monday, with a seamless
    registration flow from the monday app into the OpenLM identity-integrated interface.
  </>,
];

const biDashboardBullets = [
  <>
    <strong>Multi-License Consumption.</strong> A new report flags users simultaneously holding more than one license
    key for the same feature and product — redundant consumption you can reclaim — with KPIs for the servers,
    licenses, users, and features involved.
  </>,
  <>
    <strong>Active Analytics Overview.</strong> The Executive Summary has been renamed and rebuilt in Direct Query
    mode as a real-time hub: report summary, top-10 reports, host availability, active users, currently consumed
    licenses, and feature usage status.
  </>,
  <>
    <strong>License Utilization with QoS.</strong> Set a Quality of Service target with a slider and get a
    statistically grounded recommendation for the license count that meets it — capped at your actual observed peak,
    so it never recommends more than reality required.
  </>,
  <>
    <strong>User Aliasing.</strong> Multiple identities now roll up to a single canonical user consistently across
    every report, with child-username filters when you need to drill into the detail.
  </>,
  <>
    <strong>Software Catalogue.</strong> Discovery-powered catalog entries become the reference layer for reporting,
    tying usage to standardized products and vendors instead of raw license strings — with a Software Name filter in
    relevant reports.
  </>,
];

const nextReleaseAdditionalUpdates = [
  'A refreshed, more consistent interface across the platform.',
  'SLM screens embed filters in the grid headers — more room for data — and checkout policies can be edited in place.',
  'Broker Hub housekeeping: stale Broker entries that never report are removed automatically, uploaded Broker files are cleaned up after a configurable time limit, and Brokers that keep reporting without approval receive a suspension command.',
  'ServiceNow integration: scheduled daily sync with live status in the interface, data from 13 tables, denial records from the cloud platform, Viewer-role restrictions, and new Event Management and Alerts components.',
  'Navigation loads faster and menu search behaves better; the ServiceNow Connector joins the on-premises menu.',
  'Users & Groups: reworked Users and Add/Edit User pages, searchable email aliases, sorting by user creation date, and automatic cleanup of stale workstations.',
  'Audit events are processed only when the Audit service is active for a product, and malformed events are filtered out on cloud and on-premises deployments.',
  'Reporting: QuickSight dashboards use direct query for fresher results, Superset BI reports joined the platform navigation, reports resolve user aliases, and the Reporting Data API supports the full GraphQL where clause.',
  'Account suspension and deletion events are handled consistently across Broker Hub, License Manager, usage tracking, and OpenLM Server.',
  'More than twenty notable fixes, including faster Personal Dashboard loads, a navigation crash on click, License Access Control rule handling, missing MATLAB client versions in reports, and product activation failures on the US cloud.',
];

// --- Broad Peak ------------------------------------------------------------
const broadPeakDemo = {
  title: 'Interactive demo: License Access Control in Broad Peak',
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
  'Support for command-line arguments and window-title monitoring for processes.',
  'Disable process harvesting for specific users during specific timeframes.',
  'Improvements to the process-monitoring flow.',
  'Fixes to process-session creation.',
  'Improved End-User Services (EUS) notification UX.',
  'Added a Remove License action to the Currently Consumed Licenses window.',
  'New alert type: LFM Triads.',
  'Added an Anonymous property to domain settings in the Directory Synchronization Service (DSS) UI.',
  'Added cloud partners to the Cloud Admin UI.',
  'Automatic user-alias creation in the Users & Groups Service (UGS).',
  'Added a Clean Up manager to UGS.',
];

// --- Coming next (post-current-release teaser) -----------------------------
const upcoming = [
  'Anonymization Service.',
  'Broker stand-by mode — pause a Broker temporarily without uninstalling it, with the supporting Broker Hub command set.',
];

// =============================================================================
// Page
// =============================================================================
export default function ReleaseNotes() {
  const title = translate({ message: 'Release Notes' });
  const description = translate({
    message: 'The latest OpenLM Platform feature releases, improvements, and bug fixes.',
  });

  // Advertise the clean Markdown twin emitted by src/plugins/llm-markdown
  // (/release-notes.md) so crawlers/AI agents can discover it from the page,
  // matching the rel=alternate links on doc pages. location.pathname carries
  // the locale-prefixed baseUrl, so each locale resolves to its own .md.
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = (siteConfig.url ?? '').replace(/\/$/, '');
  const baseUrl = (siteConfig.baseUrl ?? '/').replace(/\/$/, '');
  const mdHref = `${siteUrl}${location.pathname.replace(/\/$/, '')}.md`;

  // Richer share/rich-result metadata: an OG image so a shared link doesn't fall
  // back to the generic site card, and TechArticle JSON-LD for the latest
  // shipped release so its date is machine-readable for search engines.
  const ogImage = `${siteUrl}${baseUrl}/img/release-notes/homepage-dashboard.png`;
  const releaseJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'OpenLM Platform — Cho Oyu release',
    description,
    datePublished: '2026-07-02',
    url: `${siteUrl}${location.pathname.replace(/\/$/, '')}#cho-oyu`,
    // Reference the site-wide Organization and Platform product entities declared
    // in docusaurus.config.js (headTags JSON-LD). @id references merge into one
    // page-level graph, so this article feeds the same two-product entity graph
    // as every other page and is scoped to OpenLM Platform, not legacy.
    publisher: { '@id': `${siteUrl}/#organization` },
    about: { '@id': `${siteUrl}/#platform` },
  });

  return (
    <Layout title={title} description={description}>
      <Head>
        <link rel="alternate" type="text/markdown" href={mdHref} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{releaseJsonLd}</script>
      </Head>
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>{translate({ message: 'Release notes' })}</p>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDescription}>{description}</p>
            <div className={styles.heroSubscribe}>
              <SubscribeButton />
            </div>
          </div>
        </section>

        <div className={styles.heroDivider} aria-hidden="true" />

        <ReleaseList
          expandAllLabel={translate({ message: 'Expand all' })}
          collapseAllLabel={translate({ message: 'Collapse all' })}
        >

          {/* ============================================================== */}
          {/* Cho Oyu — latest release                                       */}
          {/* ============================================================== */}
          <ReleaseEntry
            defaultOpen
            slug="cho-oyu"
            date="JULY 2, 2026"
            dateTime="2026-07-02"
            badge="Cho Oyu"
            title="OpenLM Platform — Cho Oyu release"
            intro="The Cho Oyu release makes your reporting data conversational and turns observation into enforcement. The OpenLM MCP Connector opens your reporting data to AI assistants for plain-language queries, License Access Control gains an enforcement engine, a redesigned Homepage replaces the QuickSight lobby with operational signal you can act on, Agent Activity Manager turns mass upgrades into a single action across your fleet of Workstation Agents, and License File Management brings editing, validation, and deployment of license files into one workspace — joined by the License Parser (now part of the platform), a Software Discovery suite for SAM, AI usage reporting, three new integrations, and much wider SaaS and AI monitoring."
          >
            <Demo {...nextReleaseDemos.release} />

            <Spotlight title="OpenLM MCP Connector">
              <p>
                OpenLM now speaks the Model Context Protocol (MCP), the open
                standard for connecting AI assistants to live business data.
                Point Claude, ChatGPT, Cursor, Windsurf, Gemini CLI, or any
                other MCP-aware client at your tenant, sign in once with OAuth,
                and ask questions in plain language: <em>"Which features were
                denied most often last month?"</em>,{' '}
                <em>"Show me underused AutoCAD seats by office."</em> The
                OpenLM MCP Connector translates your prompt into a GraphQL query
                against your reporting database and returns tables, summaries,
                or — on higher-tier AI plans — fully interactive dashboards.
                No new BI tool to learn, no exported CSVs, no hand-built
                filters. Your reporting data, conversational.
              </p>
              <p>
                Endpoints are provided for both regions —{' '}
                <code>https://cloud-us.openlm.com/mcp</code> for US and{' '}
                <code>https://cloud-eu.openlm.com/mcp</code> for EU. See the{' '}
                <Link to="/cloud/category/openlm-mcp-connector">
                  OpenLM MCP Connector documentation
                </Link>{' '}
                for client setup and the full tool reference.
              </p>
              <Demo {...nextReleaseDemos.mcp} />
            </Spotlight>

            <Spotlight title="License Access Control (LAC)">
              <p>
                LAC graduates from observation to enforcement. A new Agent
                enforcement engine prevents license consumption from
                workstations that are not running the Workstation Agent,
                bulk rule creation eliminates the per-rule call pattern that
                made large-option-file onboarding painful, and SaaS license
                servers join the supported deployment targets.
                Deployment itself is more resilient, and the deployment
                history is finally complete. See the{' '}
                <Link to="/cloud/changelog/cloud/license-access-control">
                  License Access Control changelog
                </Link>{' '}
                for the full per-version history.
              </p>
              <UpdateList items={nextLacUpdates} />
            </Spotlight>

            <Spotlight title="New Homepage dashboard">
              <p>
                The new Homepage is a dashboard, not a lobby. Sign in and you
                see license health, denials, and pool utilization. The
                QuickSight page is gone, replaced by native widgets.
                The page loads faster and no longer needs the cloud. Every
                widget shares one shell, so loading, empty, and error states
                look and act the same. See the{' '}
                <Link to="/cloud/changelog/cloud/homepage">
                  Homepage changelog
                </Link>{' '}
                for the full history.
              </p>
              <UpdateList items={homepageBullets} />
              <figure className={styles.releaseFigure}>
                <img
                  src="/documentation/img/release-notes/homepage-dashboard.png"
                  alt="New OpenLM Homepage dashboard with KPI cards for offline servers and denied requests, a license server health donut, denied features and features-in-use bar charts, and saturated and underutilized license pool widgets"
                  loading="lazy"
                />
                <figcaption className={styles.releaseFigcaption}>
                  The redesigned Homepage surfaces license server health,
                  denial trends, top features, and license pool utilization
                  in a single post-login view.
                </figcaption>
              </figure>
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

            <Spotlight title="Workstation Agent for macOS">
              <p>
                The OpenLM Workstation Agent now runs natively on macOS, on both
                Intel and Apple Silicon. Install it interactively with the .pkg
                or shell installer, or roll it out across a managed fleet with
                your MDM. macOS joins Windows and Linux as a first-class platform
                for license and process monitoring. See the{' '}
                <Link to="/cloud/changelog/components/workstation-agent">
                  Workstation Agent changelog
                </Link>{' '}
                for the full per-version history.
              </p>
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

            <Spotlight title="License Parser">
              <p>
                The License Parser — formerly a standalone OpenLM product —
                is now part of the OpenLM Platform. Drag a FlexLM license
                file onto it and get an instant, structured view of its
                contents: a Summary view, an Issued At view, and search
                across the parsed results. Files are parsed entirely in
                memory — nothing is written to storage — and the parser
                integrates directly with License Manager, with a clear
                message when an unsupported file type is uploaded.
              </p>
            </Spotlight>

            <Spotlight title="Software Discovery for SAM">
              <p>
                Software Asset Management gains an AI-powered discovery suite.
                The Discovery Agent pipeline first discovers software vendors
                — headquarters, aliases, corporate websites — then discovers
                and enriches individual products, extracting vendor-defined
                feature codes (SKUs) and deployment types (on-premises,
                cloud, or hybrid). Successfully enriched products are promoted
                automatically to approved catalog entries, so your catalog
                stays authoritative without manual curation.
              </p>
              <UpdateList items={samDiscoveryBullets} />
            </Spotlight>

            <Spotlight title="AI usage reporting with AI Proxy">
              <p>
                AI subscriptions are licenses too — and this release starts
                treating them that way. AI Proxy, a new platform component,
                sits in front of your LLM API traffic to Anthropic, OpenAI,
                and Google Vertex (Gemini) and captures token usage without
                reading the content of requests. Identity resolution maps that
                usage to real people rather than anonymous keys: Anthropic
                OAuth identities are resolved through the claude.ai profile
                endpoint, and Anthropic Admin API keys are recognized too.
              </p>
              <p>
                A new QuickSight dashboard turns that data into decisions
                across four pages. Executive Overview leads with total cost,
                total tokens, licensed users next to users with actual usage,
                and the top spender, plus cost by model family and token share
                by model. Model Consumption Analysis breaks down each user's
                model mix alongside a full token-and-cost ledger. User
                Consumption Analysis adds daily token-and-cost trends and each
                user's peak 5-hour token burst — the clearest signal for
                right-sizing license tiers. And an exportable Details Report
                gives a day-by-day record per user and model.
              </p>
            </Spotlight>

            <FeatureSection title="Three new integrations">
              <UpdateList items={newIntegrationBullets} />
            </FeatureSection>

            <FeatureSection title="Wider SaaS and AI monitoring">
              <p className={styles.featureSummary}>
                SaaS Agent now monitors Canva, Zoom, Claude AI allocations
                (with License Access Control support), Cursor AI, Apollo.io,
                and LinkedIn company pages, and takes over Altair and
                JetBrains Cloud monitoring from Cloud Broker. Cloud Broker
                adds GitHub Copilot usage tracking (credits and requests),
                initial Google Gemini support, and API-based monday.com
                monitoring. SaaS Agents can now update themselves remotely.
              </p>
            </FeatureSection>

            <FeatureSection title="BI dashboards">
              <UpdateList items={biDashboardBullets} />
            </FeatureSection>

            <FeatureSection title="Downloads moved to Platform Administration">
              <p className={styles.featureSummary}>
                Installers for both Platform and Legacy products now live in a
                single place — <strong>Platform Administration → Products →
                Downloads</strong>. Switch between the Platform and Legacy tabs
                to find every component alongside its version and a link to its
                documentation.
              </p>
              <figure className={styles.releaseFigure}>
                <img
                  src="/documentation/img/release-notes/downloads-products.png"
                  alt="OpenLM Products page showing the Downloads view with Platform and Legacy tabs, listing Workstation Agent, Broker, DSA, and SaaS Agent each with a Download button and a Documentation link"
                  loading="lazy"
                />
                <figcaption className={styles.releaseFigcaption}>
                  Platform Administration → Products → Downloads: every
                  installer in one place, with Platform and Legacy on
                  separate tabs.
                </figcaption>
              </figure>
            </FeatureSection>

            <FeatureSection title="A more secure way to log in">
              <p className={styles.featureSummary}>
                OpenLM web apps now use single sign-on. Log in to one app and
                you can open the others — such as Usage, Allocation, Denial, and
                Identity — without logging in again. Log out once and OpenLM ends
                your session everywhere, on every device, within seconds. Your
                login token no longer stays in your browser: your credentials
                stay on the OpenLM server, where browser extensions, malware, and
                screen or network captures can't read them. You keep your usual
                username and password — the first time you open OpenLM after the
                update, you might need to log in once.
              </p>
            </FeatureSection>

            <FeatureSection title="Additional updates">
              <UpdateList items={nextReleaseAdditionalUpdates} />
            </FeatureSection>
          </ReleaseEntry>

          {/* ============================================================== */}
          {/* Broad Peak                                                     */}
          {/* ============================================================== */}
          <ReleaseEntry
            slug="broad-peak"
            date="FEBRUARY 3, 2026"
            dateTime="2026-02-03"
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
            slug="coming-next"
            date="Coming next"
            badge="In progress"
            title="What will be released in the nearest future"
            intro="These items are actively in flight and will roll out after Broad Peak."
          >
            <UpdateList items={upcoming} />
          </ReleaseEntry>
        </ReleaseList>
      </div>
    </Layout>
  );
}
