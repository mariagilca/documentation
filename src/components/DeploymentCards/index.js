import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import Reveal from '@site/src/components/Reveal';
import styles from './index.module.css';
import usePointerGlow from '@site/src/hooks/usePointerGlow';

/* ── Developer-centric inline SVG glyphs (currentColor, 1em-scaled) ──
   Kept inline so they inherit text color in light/dark and add no extra
   network requests over the canvas-heavy homepage. */
function CloudClusterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7 18h9a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 7.2 9.5 4 4 0 0 0 7 18Z" />
    </svg>
  );
}
function ScaleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
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
function ServerMatrixIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}
function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3 5 6v5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function NetworkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M12 7.2v3.3M10.5 12 6.5 16M13.5 12l4 4" />
    </svg>
  );
}
function CheckBadgeIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="m5.6 8.1 1.7 1.7 3.1-3.4" />
    </svg>
  );
}

export default function DeploymentCards() {
  /* Pointer-driven perimeter glow — shared, rAF-throttled, and disabled on
     touch + under reduced motion (see usePointerGlow), so it stays cheap over
     the hero's canvas loops. */
  const onPointerMove = usePointerGlow();

  const mainCards = [
    {
      id: 'cloud',
      pill: translate({id: 'deploymentCards.cloud.pill', message: 'Cloud'}),
      title: translate({id: 'deploymentCards.cloud.title', message: 'Hosted by OpenLM'}),
      recommended: true,
      features: [
        {Icon: CloudClusterIcon, text: translate({
          id: 'deploymentCards.cloud.f1',
          message: 'We run the infrastructure — no servers to maintain.',
        })},
        {Icon: ScaleIcon, text: translate({
          id: 'deploymentCards.cloud.f2',
          message: 'Fastest path to value, scales with your estate.',
        })},
        {Icon: BoltIcon, text: translate({
          id: 'deploymentCards.cloud.f3',
          message: 'Sign up, activate services, deploy agents in minutes.',
        })},
      ],
      cta: translate({id: 'deploymentCards.cloud.cta', message: 'Get started with Cloud'}),
      href: translate({id: 'deploymentCards.cloud.href', message: '/cloud/getting-started/what-is-openlm'}),
    },
    {
      id: 'onprem',
      pill: translate({id: 'deploymentCards.onprem.pill', message: 'On-premise'}),
      title: translate({id: 'deploymentCards.onprem.title', message: 'Hosted by you'}),
      features: [
        {Icon: ShieldIcon, text: translate({
          id: 'deploymentCards.onprem.f1',
          message: 'Full data residency inside your own network.',
        })},
        {Icon: ServerMatrixIcon, text: translate({
          id: 'deploymentCards.onprem.f2',
          message: 'Install via Helm or a single-VM footprint.',
        })},
        {Icon: NetworkIcon, text: translate({
          id: 'deploymentCards.onprem.f3',
          message: 'Integration control across your environment.',
        })},
      ],
      cta: translate({id: 'deploymentCards.onprem.cta', message: 'Get started with On-premise'}),
      href: translate({id: 'deploymentCards.onprem.href', message: '/cloud/deployment-operations/on-premise/'}),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.headingWrap}>
        <p className={styles.kicker}>
          {translate({id: 'deploymentCards.kicker', message: 'OpenLM Platform'})}
        </p>
        <h2 className={styles.title}>
          {translate({id: 'deploymentCards.title', message: 'One product, two ways to run it'})}
        </h2>
        <p className={styles.subtitle}>
          {translate({
            id: 'deploymentCards.subtitle',
            message:
              'OpenLM Platform monitors, optimizes, and manages your software licenses across vendors and teams. Run it as a service we host for you, or deploy it on your own premises — same product, same capabilities, your choice of who keeps the lights on.',
          })}
        </p>
      </div>

      {/* A single glass panel split into two sides by a center divider — a
          deliberate "decision" layout. One shared perimeter glow tracks the
          cursor across the whole panel.

          The panel gets its own nested Reveal (the page-level one in
          src/pages/index.js fires as soon as the section HEADING peeks into
          view — by the time the reader reaches the panel, a cascade keyed to
          it has already finished off-screen). The entrance choreography in
          index.module.css is keyed to this inner wrapper via .cardsReveal. */}
      <Reveal className={styles.cardsReveal}>
      <div className={styles.panel} onPointerMove={onPointerMove}>
        {mainCards.map((card) => (
          <div key={card.id} className={styles.side} data-card={card.id}>
            <div className={styles.cardHeader}>
              <span className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                {card.pill}
              </span>
              {card.recommended && (
                <span className={styles.recommended}>
                  <CheckBadgeIcon width="13" height="13" />
                  {translate({id: 'deploymentCards.recommended', message: 'Recommended'})}
                </span>
              )}
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>

            <ul className={styles.featureList}>
              {card.features.map(({Icon, text}, i) => (
                <li key={i} className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <Icon width="20" height="20" />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <Link className={styles.cta} to={card.href}>
              {card.cta} <span className={styles.arrow}>&rarr;</span>
            </Link>
          </div>
        ))}
      </div>

      <div className={styles.legacyPill}>
        <span className={styles.legacyText}>
          {translate({
            id: 'deploymentCards.legacyText',
            message: 'Looking for Version 25 (Legacy) documentation?',
          })}
        </span>
        <Link className={styles.legacyLink} to={translate({id: 'deploymentCards.legacy.href', message: '/legacy/intro'})}>
          {translate({id: 'deploymentCards.legacyCta', message: 'Go to Version 25 (Legacy) docs'})}
          <span className={styles.arrow}>&rarr;</span>
        </Link>
      </div>
      </Reveal>
    </section>
  );
}
