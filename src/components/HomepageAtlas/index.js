import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import {translate} from '@docusaurus/Translate';
import usePointerGlow from '@site/src/hooks/usePointerGlow';
import supportedSoftware from '@site/src/static/supported-software.json';
import styles from './index.module.css';

/* ── Inline currentColor glyphs (thin 1.5 stroke — matches the icon system) ── */
function RocketIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
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
function ChartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 17v-5M12 17V8M16 17v-3M20 17V6" />
    </svg>
  );
}
function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function BoltIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}
function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8.5 13.4 11l2.6 1-2.6 1L12 15.5 10.6 13 8 12l2.6-1L12 8.5Z" />
    </svg>
  );
}

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true">&rarr;</span>;
}

/* ── Per-cell artifacts: each cell SHOWS what it links to, not just tells ── */
function Artifact({kind}) {
  switch (kind) {
    case 'spark':
      // Reporting — an illustrative sparkline (no claimed numbers).
      return (
        <svg className={styles.art} viewBox="0 0 140 44" fill="none" aria-hidden="true" preserveAspectRatio="none">
          <polyline
            className={styles.sparkArea}
            points="2,34 22,28 42,31 62,18 82,23 102,9 122,14 138,6 138,44 2,44"
            fill="currentColor" stroke="none" />
          <polyline
            className={styles.sparkLine}
            points="2,34 22,28 42,31 62,18 82,23 102,9 122,14 138,6"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'nodes':
      // Integrations — a small connection graph.
      return (
        <svg className={styles.art} viewBox="0 0 140 44" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1.5" opacity="0.5">
            <path d="M70 22 22 12M70 22 118 12M70 22 30 38M70 22 110 38" />
          </g>
          <g fill="var(--ifm-background-surface-color, #fff)" stroke="currentColor" strokeWidth="1.5">
            <circle cx="70" cy="22" r="6" />
            <circle cx="22" cy="12" r="4" />
            <circle cx="118" cy="12" r="4" />
            <circle cx="30" cy="38" r="4" />
            <circle cx="110" cy="38" r="4" />
          </g>
        </svg>
      );
    case 'code':
      // Automations — a one-line command vignette.
      return (
        <div className={styles.codeArt} aria-hidden="true">
          <span className={styles.codePrompt}>{'>_'}</span>
          <span className={styles.codeText}>openlm optimize --reclaim-idle</span>
        </div>
      );
    case 'tags':
      // Release notes — recent version chips.
      return (
        <div className={styles.tagArt} aria-hidden="true">
          <span className={styles.verTag}>v26.5</span>
          <span className={styles.verTag}>v26.4</span>
          <span className={clsx(styles.verTag, styles.verTagMuted)}>v26.3</span>
        </div>
      );
    default:
      return null;
  }
}

function totalIntegrations() {
  const saas = supportedSoftware.saasPlatforms?.length || 0;
  const lm = supportedSoftware.licenseManagers?.length || 0;
  return `${Math.floor((saas + lm) / 10) * 10}+`;
}

export default function HomepageAtlas() {
  const onPointerMove = usePointerGlow();

  const lead = {
    Icon: RocketIcon,
    accent: '#0ea5e9',
    accentSoft: 'rgba(14, 165, 233, 0.16)',
    title: translate({id: 'atlas.start.title', message: 'Get started'}),
    body: translate({
      id: 'atlas.start.body',
      message: 'Create your account, deploy agents, and see your first license data flowing — in minutes.',
    }),
    href: '/cloud/getting-started/what-is-openlm/',
    cta: translate({id: 'atlas.start.cta', message: 'Start the setup'}),
    steps: [
      translate({id: 'atlas.start.step1', message: 'Create your account'}),
      translate({id: 'atlas.start.step2', message: 'Deploy the agents'}),
      translate({id: 'atlas.start.step3', message: 'See live license data'}),
    ],
  };

  const cards = [
    {
      Icon: ChartIcon, span: 'tall', art: 'spark',
      accent: '#10b981', accentSoft: 'rgba(16, 185, 129, 0.15)',
      title: translate({id: 'atlas.reporting.title', message: 'Reporting & analytics'}),
      body: translate({id: 'atlas.reporting.body', message: 'Usage, denials, and optimization at a glance.'}),
      href: '/cloud/reporting/ui-reports/usage/',
    },
    {
      Icon: LinkIcon, span: 'tall', art: 'nodes',
      accent: '#3b82f6', accentSoft: 'rgba(59, 130, 246, 0.15)',
      title: translate({id: 'atlas.integrations.title', message: 'Integrations'}),
      body: translate({id: 'atlas.integrations.body', message: 'Identity, ITSM, BI, and every license manager.'}),
      href: '/cloud/integrations/servicenow-sam-pro/',
    },
    {
      Icon: ServerIcon, span: 'third',
      accent: '#7c3aed', accentSoft: 'rgba(124, 58, 237, 0.15)',
      title: translate({id: 'atlas.deploy.title', message: 'Deployment & operations'}),
      body: translate({id: 'atlas.deploy.body', message: 'Hosted by us or on your own premises.'}),
      href: '/cloud/deployment-operations/system-requirements/',
    },
    {
      Icon: BoltIcon, span: 'third', art: 'code',
      accent: '#f59e0b', accentSoft: 'rgba(245, 158, 11, 0.16)',
      title: translate({id: 'atlas.automations.title', message: 'Automations'}),
      body: translate({id: 'atlas.automations.body', message: 'Reclaim idle seats automatically.'}),
      href: '/cloud/automations/subscription-optimizer/',
    },
    {
      Icon: SparkIcon, span: 'third', art: 'tags',
      accent: '#d946ef', accentSoft: 'rgba(217, 70, 239, 0.15)',
      title: translate({id: 'atlas.releases.title', message: 'Release notes'}),
      body: translate({id: 'atlas.releases.body', message: "What's new, shipped continuously."}),
      href: '/release-notes/',
    },
  ];

  const metrics = [
    {value: totalIntegrations(), label: translate({id: 'atlas.metric.integrations', message: 'integrations'})},
    {value: '2', label: translate({id: 'atlas.metric.deploy', message: 'ways to run it'})},
    {
      value: translate({id: 'atlas.metric.releases.value', message: 'Continuous'}),
      label: translate({id: 'atlas.metric.releases.label', message: 'releases'}),
    },
  ];

  return (
    <section className={styles.section} aria-labelledby="atlas-heading">
      <div className={clsx('container', styles.inner)}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>
            {translate({id: 'atlas.eyebrow', message: 'Documentation'})}
          </span>
          <Heading as="h2" id="atlas-heading" className={styles.heading}>
            {translate({id: 'atlas.heading', message: 'Find your way in'})}
          </Heading>
          <p className={styles.lede}>
            {translate({
              id: 'atlas.lede',
              message:
                'Everything you need to deploy, operate, and get value from OpenLM — jump straight to the area you need.',
            })}
          </p>
        </div>

        <div className={styles.grid}>
          {/* Faint blueprint dot-grid behind the bento. */}
          <div className={styles.gridGrain} aria-hidden="true" />

          {/* Lead hero cell */}
          <Link
            to={lead.href}
            className={clsx(styles.card, styles.lead)}
            style={{'--accent': lead.accent, '--accent-soft': lead.accentSoft}}
            onPointerMove={onPointerMove}>
            <span className={styles.icon}>
              <lead.Icon width="26" height="26" />
            </span>
            <Heading as="h3" className={styles.leadTitle}>{lead.title}</Heading>
            <p className={styles.leadBody}>{lead.body}</p>
            <ol className={styles.stepper} aria-hidden="true">
              {lead.steps.map((s, i) => (
                <li key={i} className={styles.step}>
                  <span className={styles.stepDot}>{i + 1}</span>
                  <span className={styles.stepLabel}>{s}</span>
                </li>
              ))}
            </ol>
            <span className={styles.leadCta}>{lead.cta} <Arrow /></span>
          </Link>

          {cards.map((card) => (
            <Link
              key={card.href}
              to={card.href}
              className={clsx(styles.card, styles[card.span])}
              style={{'--accent': card.accent, '--accent-soft': card.accentSoft}}
              onPointerMove={onPointerMove}>
              <span className={styles.icon}>
                <card.Icon width="22" height="22" />
              </span>
              <Heading as="h3" className={styles.cardTitle}>
                <span>{card.title}</span>
                <Arrow />
              </Heading>
              <p className={styles.cardBody}>{card.body}</p>
              {card.art && (
                <div className={styles.artWrap}>
                  <Artifact kind={card.art} />
                </div>
              )}
            </Link>
          ))}

          {/* Metrics strip — small dashboard-grade credibility cells. */}
          <div className={styles.metrics} aria-hidden="true">
            {metrics.map((m, i) => (
              <div key={i} className={styles.metric}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
