import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
// Shares the existing release-notes design tokens. Importing the same
// .module.css from multiple files returns the same hashed class map, so
// `styles.entry` here is identical to `styles.entry` in the page files.
import styles from '@site/src/pages/release-notes.module.css';

/* =============================================================================
 * ReleaseTimeline — shared collapsible release list
 * =============================================================================
 *
 * Used by BOTH the English page (`src/pages/release-notes.js`) and the
 * Japanese override (`i18n/ja/docusaurus-plugin-content-pages/release-notes.js`)
 * so collapse/expand behaviour stays in sync across locales. Visible strings
 * (the Expand/Collapse-all labels) are passed in by each page in its own
 * language — no copy lives here.
 *
 *   <ReleaseList expandAllLabel="Expand all" collapseAllLabel="Collapse all">
 *     <ReleaseEntry defaultOpen date="…" badge="…" title="…" intro="…">
 *       …spotlights / feature sections…
 *     </ReleaseEntry>
 *     <ReleaseEntry date="…" badge="…" title="…" intro="…"> … </ReleaseEntry>
 *   </ReleaseList>
 *
 * Only the newest release should get `defaultOpen`; the rest start collapsed.
 * The toolbar broadcasts an open/close command to every entry via context.
 * ===========================================================================*/

// Carries the latest { action: 'open' | 'close', seq } broadcast. `seq`
// changes on every click so repeated clicks of the same action still fire.
const ReleaseCommandContext = createContext(null);

function ChevronIcon() {
  return (
    <svg
      className={styles.entryChevronIcon}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ReleaseList({
  children,
  expandAllLabel = 'Expand all',
  collapseAllLabel = 'Collapse all',
}) {
  const [command, setCommand] = useState(null);
  const seq = useRef(0);

  const send = (action) => {
    seq.current += 1;
    setCommand({ action, seq: seq.current });
  };

  return (
    <ReleaseCommandContext.Provider value={command}>
      <div className={styles.releaseToolbar}>
        <button
          type="button"
          className={styles.releaseToolbarBtn}
          onClick={() => send('open')}
        >
          {expandAllLabel}
        </button>
        <span className={styles.releaseToolbarSep} aria-hidden="true">·</span>
        <button
          type="button"
          className={styles.releaseToolbarBtn}
          onClick={() => send('close')}
        >
          {collapseAllLabel}
        </button>
      </div>
      <section className={styles.entries}>{children}</section>
    </ReleaseCommandContext.Provider>
  );
}

/**
 * One release. Date + badge on the left rail; a clickable title header on the
 * right that folds the intro and body behind it. Collapsed state shows only
 * the date, badge, and title.
 */
export function ReleaseEntry({
  date,
  badge,
  codename,
  title,
  intro,
  variant,
  defaultOpen = false,
  children,
}) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const command = useContext(ReleaseCommandContext);
  const regionId = useId();

  // React to Expand-all / Collapse-all broadcasts from the toolbar.
  useEffect(() => {
    if (!command) return;
    setOpen(command.action === 'open');
  }, [command]);

  const isUpcoming = variant === 'upcoming';
  const articleClass = [
    styles.entry,
    isUpcoming && styles.entryUpcoming,
    open ? styles.entryOpen : styles.entryCollapsed,
  ]
    .filter(Boolean)
    .join(' ');

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
        {/* Accessible disclosure: the heading owns semantics, the button owns
            the interaction (phrasing-only content, so it stays valid HTML). */}
        <h2 className={styles.entryTitle}>
          <button
            type="button"
            className={styles.entryToggle}
            aria-expanded={open}
            aria-controls={regionId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={styles.entryToggleText}>{title}</span>
            <span className={styles.entryChevron}>
              <ChevronIcon />
            </span>
          </button>
        </h2>

        <div id={regionId} className={styles.entryCollapsible} role="region">
          <div className={styles.entryCollapsibleInner}>
            {intro && <p className={styles.entryIntro}>{intro}</p>}
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
