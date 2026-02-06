import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from './changelog.module.css';

const platformGroups = [
  {
    title: 'Licenses and Features',
    items: [
      { title: 'Licenses', href: '/cloud/changelog/cloud/licenses' },
      { title: 'License Access Control', href: '/cloud/changelog/cloud/license-access-control' },
      { title: 'License Servers', href: '/cloud/changelog/cloud/license-servers' },
      { title: 'License Allocations', href: '/cloud/changelog/cloud/license-allocations' },
      { title: 'Usage', href: '/cloud/changelog/cloud/usage' },
      { title: 'Denials', href: '/cloud/changelog/cloud/denials' },
      { title: 'License File Management', href: '/cloud/changelog/cloud/license-file-management' },
      { title: 'Subscription Optimizer', href: '/cloud/changelog/cloud/subscription-optimizer' },
      { title: 'Virtual License Manager', href: '/cloud/changelog/cloud/virtual-license-manager' },
      { title: 'Compliance', href: '/cloud/changelog/cloud/compliance' },
    ],
  },
  {
    title: 'Users',
    items: [
      { title: 'Users and Groups', href: '/cloud/changelog/cloud/users-and-groups' },
      { title: 'Projects', href: '/cloud/changelog/cloud/projects' },
      { title: 'Directory Sync', href: '/cloud/changelog/cloud/directory-synchronization-service' },
    ],
  },
  {
    title: 'Brokers',
    items: [
      { title: 'Broker Hub', href: '/cloud/changelog/cloud/broker-hub' },
      { title: 'Cloud Broker', href: '/cloud/changelog/cloud/cloud-broker' },
    ],
  },
  {
    title: 'Agents',
    items: [
      { title: 'Agents Hub', href: '/cloud/changelog/cloud/agents-hub' },
      { title: 'Agent Activity Manager', href: '/cloud/changelog/cloud/agent-activity-manager' },
      { title: 'Process Sessions', href: '/cloud/changelog/cloud/process-sessions' },
      { title: 'Process Manager', href: '/cloud/changelog/cloud/process-manager' },
      { title: 'Touch Point Events', href: '/cloud/changelog/cloud/touch-point-events' },
      { title: 'Dongle Monitoring', href: '/cloud/changelog/cloud/dongle-monitoring' },
      { title: 'Personal Dashboard', href: '/cloud/changelog/cloud/personal-dashboard' },
    ],
  },
  {
    title: 'Platform Administration',
    items: [
      { title: 'Alerts', href: '/cloud/changelog/cloud/openlm-alerts' },
      { title: 'Audit', href: '/cloud/changelog/cloud/audit' },
      { title: 'Database Configuration Tool', href: '/cloud/changelog/cloud/database-configuration-tool' },
      { title: 'Homepage', href: '/cloud/changelog/cloud/homepage' },
      { title: 'Identity', href: '/cloud/changelog/cloud/identity' },
      { title: 'License Manager', href: '/cloud/changelog/cloud/openlm-license-manager' },
      { title: 'Notifications', href: '/cloud/changelog/cloud/notifications' },
      { title: 'Products', href: '/cloud/changelog/cloud/products' },
      { title: 'UI Configurations', href: '/cloud/changelog/cloud/ui-configuration' },
      { title: 'Diagnostics & Logs', href: '/cloud/changelog/cloud/diagnostics-logs' },
    ],
  },
  {
    title: 'Software Asset Management',
    items: [
      { title: 'Software Asset Management', href: '/cloud/changelog/cloud/software-asset-management' },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { title: 'Freshworks Alerts', href: '/cloud/changelog/cloud/freshworks-alerts' },
      { title: 'Zoho Alerts', href: '/cloud/changelog/cloud/zoho-alerts' },
      { title: 'ServiceNow', href: '/cloud/changelog/cloud/servicenow' },
      { title: 'Salesforce Alerts', href: '/cloud/changelog/cloud/salesforce-alerts' },
    ],
  },
];

const platformComponents = [
  { title: 'Broker', href: '/cloud/changelog/components/broker' },
  { title: 'Workstation Agent', href: '/cloud/changelog/components/workstation-agent' },
  { title: 'Directory Synchronization Agent', href: '/cloud/changelog/components/dsa' },
];

const legacyNotes = [
  { title: 'Broker', href: '/legacy/changelog/broker' },
  { title: 'SLM', href: '/legacy/changelog/slm' },
  { title: 'Workstation Agent', href: '/legacy/changelog/workstation-agent' },
  { title: 'End-User Services', href: '/legacy/changelog/end-user-services' },
  { title: 'Applications Manager', href: '/legacy/changelog/applications-manager' },
  { title: 'Reporting Hub', href: '/legacy/changelog/reporting-hub' },
  { title: 'Reports Scheduler', href: '/legacy/changelog/reports-scheduler' },
  { title: 'License Parser', href: '/legacy/changelog/license-parser' },
  { title: 'Directory Synchronization Service', href: '/legacy/changelog/directory-synchronization-service' },
  { title: 'Directory Synchronization Agent', href: '/legacy/changelog/directory-synchronization-agent' },
  { title: 'ServiceNow Adapter', href: '/legacy/changelog/servicenow-adapter' },
  { title: 'Identity Service', href: '/legacy/changelog/identity-service' },
  { title: 'AutoCAD Plugin', href: '/legacy/changelog/autocad-plugin' },
  { title: 'Dongle Monitoring', href: '/legacy/changelog/dongle-monitoring' },
];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const platformModuleGroups = platformGroups.map((group) => ({
  ...group,
  id: slugify(group.title),
  totalCount: group.items.length,
}));

function filterNotes(notes, query) {
  if (!query) return notes;
  return notes.filter((note) => note.title.toLowerCase().includes(query));
}

function formatCount(filtered, total) {
  return filtered === total ? `${total}` : `${filtered} / ${total}`;
}

function NotesList({ items, accentClass, showEmpty }) {
  if (!items.length) {
    return showEmpty ? (
      <div className={styles.emptyState}>
        {translate({ message: 'No matching changelog entries.' })}
      </div>
    ) : null;
  }

  return (
    <ul className={`${styles.noteList} ${accentClass}`}>
      {items.map((item) => (
        <li key={item.href} className={styles.noteItem}>
          <Link to={item.href} className={styles.noteRow}>
            <span className={styles.noteBullet} aria-hidden="true" />
            <span className={styles.noteLabel}>{item.title}</span>
            <span className={styles.noteArrow} aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AccordionItem({
  id,
  title,
  count,
  totalCount,
  isOpen,
  onToggle,
  children,
  nested = false,
}) {
  return (
    <div className={`${styles.accordionItem} ${nested ? styles.accordionItemNested : ''}`}>
      <button
        type="button"
        className={`${styles.accordionButton} ${nested ? styles.accordionButtonNested : ''}`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-toggle`}
        onClick={onToggle}
      >
        <span className={styles.accordionTitle}>{title}</span>
        <span className={styles.accordionMeta}>
          <span className={styles.accordionCount}>{formatCount(count, totalCount)}</span>
          <span className={styles.accordionIcon} aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </span>
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-toggle`}
        className={`${styles.accordionPanel} ${nested ? styles.accordionPanelNested : ''}`}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}

export default function Changelog() {
  const title = translate({ message: 'Changelog' });
  const description = translate({
    message: 'Track product and component changes across OpenLM Platform and OpenLM Legacy.',
  });

  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);
  const queryValue = query.trim();
  const q = queryValue.toLowerCase();
  const isSearching = queryValue.length > 0;

  const filteredModuleGroups = useMemo(
    () =>
      platformModuleGroups.map((group) => ({
        ...group,
        items: filterNotes(group.items, q),
      })),
    [q]
  );

  const filteredComponents = useMemo(() => filterNotes(platformComponents, q), [q]);
  const filteredLegacy = useMemo(() => filterNotes(legacyNotes, q), [q]);

  const moduleTotalCount = platformModuleGroups.reduce((sum, group) => sum + group.totalCount, 0);
  const moduleFilteredCount = filteredModuleGroups.reduce((sum, group) => sum + group.items.length, 0);
  const platformTotalCount = moduleTotalCount + platformComponents.length;
  const platformFilteredCount = moduleFilteredCount + filteredComponents.length;

  const [sectionVisibility, setSectionVisibility] = useState({
    platform: true,
    components: true,
    legacy: true,
  });

  const showPlatform = sectionVisibility.platform;
  const showComponents = showPlatform && sectionVisibility.components;
  const showLegacy = sectionVisibility.legacy;

  const platformVisibleCount = moduleFilteredCount + (showComponents ? filteredComponents.length : 0);
  const platformVisibleTotal = moduleTotalCount + (showComponents ? platformComponents.length : 0);

  const visiblePlatformItems = useMemo(() => {
    if (!showPlatform) return [];
    const items = [];
    if (showComponents) {
      items.push({
        id: 'platform-components',
        title: 'Components',
        items: filteredComponents,
        totalCount: platformComponents.length,
        accentClass: styles.componentAccent,
      });
    }

    filteredModuleGroups.forEach((group) => {
      items.push({
        id: `platform-${group.id}`,
        title: group.title,
        items: group.items,
        totalCount: group.totalCount,
        accentClass: styles.platformAccent,
      });
    });

    return isSearching ? items.filter((item) => item.items.length > 0) : items;
  }, [filteredComponents, filteredModuleGroups, isSearching, showComponents, showPlatform]);

  const visibleSectionIds = useMemo(() => {
    const ids = [];
    if (showPlatform && (!isSearching || platformVisibleCount > 0)) ids.push('platform');
    if (showLegacy && (!isSearching || filteredLegacy.length > 0)) ids.push('legacy');
    return ids;
  }, [showPlatform, showLegacy, isSearching, platformVisibleCount, filteredLegacy.length]);

  const totalResults = platformFilteredCount + filteredLegacy.length;
  const visibleResults =
    (visibleSectionIds.includes('platform')
      ? visiblePlatformItems.reduce((sum, item) => sum + item.items.length, 0)
      : 0) +
    (visibleSectionIds.includes('legacy') ? filteredLegacy.length : 0);

  const visibleGroupCount = visiblePlatformItems.length + (visibleSectionIds.includes('legacy') ? 1 : 0);

  const allSectionsDisabled = !sectionVisibility.platform && !sectionVisibility.legacy;
  const noResultsOverall = isSearching && totalResults === 0;
  const noResultsInSelection = isSearching && totalResults > 0 && visibleResults === 0;
  const showEmptyState = allSectionsDisabled || noResultsOverall || noResultsInSelection;

  const [openSections, setOpenSections] = useState(() => new Set(['platform']));
  const [openPlatformItems, setOpenPlatformItems] = useState(() => new Set());

  useEffect(() => {
    setOpenSections((prev) => {
      const next = new Set([...prev].filter((id) => visibleSectionIds.includes(id)));
      if (isSearching) {
        visibleSectionIds.forEach((id) => next.add(id));
        return next;
      }
      if (next.size === 0 && visibleSectionIds[0]) {
        next.add(visibleSectionIds[0]);
      }
      return next;
    });
  }, [isSearching, visibleSectionIds]);

  useEffect(() => {
    setOpenPlatformItems((prev) => {
      const visibleIds = visiblePlatformItems.map((item) => item.id);
      const next = new Set([...prev].filter((id) => visibleIds.includes(id)));
      if (isSearching) {
        visibleIds.forEach((id) => next.add(id));
        return next;
      }
      if (next.size === 0 && visibleIds[0]) {
        next.add(visibleIds[0]);
      }
      return next;
    });
  }, [isSearching, visiblePlatformItems]);

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const togglePlatformItem = (itemId) => {
    setOpenPlatformItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenSections(new Set(visibleSectionIds));
    setOpenPlatformItems(new Set(visiblePlatformItems.map((item) => item.id)));
  };

  const collapseAll = () => {
    setOpenSections(new Set());
    setOpenPlatformItems(new Set());
  };

  const platformVisible = visibleSectionIds.includes('platform');
  const allOpen =
    visibleSectionIds.length > 0 &&
    visibleSectionIds.every((id) => openSections.has(id)) &&
    (!platformVisible || visiblePlatformItems.every((item) => openPlatformItems.has(item.id)));
  const noneOpen =
    openSections.size === 0 && (!platformVisible || openPlatformItems.size === 0);

  const sectionFilters = [
    {
      key: 'platform',
      label: translate({ message: 'OpenLM Platform' }),
      count: isSearching ? platformVisibleCount : platformVisibleTotal,
      disabled: false,
    },
    {
      key: 'components',
      label: translate({ message: 'Components' }),
      count: isSearching ? filteredComponents.length : platformComponents.length,
      disabled: !sectionVisibility.platform,
    },
    {
      key: 'legacy',
      label: translate({ message: 'V25 legacy' }),
      count: isSearching ? filteredLegacy.length : legacyNotes.length,
      disabled: false,
    },
  ];

  const enableAllSections = () =>
    setSectionVisibility({
      platform: true,
      components: true,
      legacy: true,
    });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      searchInputRef.current?.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Layout title={title} description={description}>
      <main className={styles.page}>
        <div className={styles.pageInner}>
          <header className={styles.header}>
            <div className={styles.headerIntro}>
              <p className={styles.kicker}>{translate({ message: 'Changelog' })}</p>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.headerControls}>
              <div className={styles.searchRow}>
                <input
                  aria-label={translate({ message: 'Filter changelog' })}
                  aria-describedby="changelog-search-hint"
                  className={styles.searchInput}
                  placeholder={translate({ message: 'Filter notes (e.g. license, alerts)' })}
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape' && query) {
                      setQuery('');
                    }
                  }}
                />
                {query && (
                  <button
                    type="button"
                    className={styles.clearButton}
                    onClick={() => setQuery('')}
                    aria-label={translate({ message: 'Clear search' })}
                  >
                    {translate({ message: 'Clear' })}
                  </button>
                )}
              </div>
              <div className={styles.searchHint} id="changelog-search-hint">
                {translate({ message: 'Tip: Press / to focus the search field.' })}
              </div>
              {isSearching && (
                <div className={styles.filterSummary} aria-live="polite">
                  {translate({
                    message: 'Showing {count} results across {groups} categories for "{query}".',
                    values: { count: visibleResults, groups: visibleGroupCount, query: queryValue },
                  })}
                </div>
              )}
            </div>
          </header>

          <section className={styles.filterBar} aria-label={translate({ message: 'Changelog filters' })}>
            <div className={styles.filterGroup} role="group" aria-label={translate({ message: 'Show sections' })}>
              <span className={styles.filterLabel}>{translate({ message: 'Show' })}</span>
              {sectionFilters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className={styles.filterButton}
                  aria-pressed={sectionVisibility[filter.key]}
                  disabled={filter.disabled}
                  onClick={() =>
                    setSectionVisibility((prev) => ({ ...prev, [filter.key]: !prev[filter.key] }))
                  }
                >
                  <span className={styles.filterText}>{filter.label}</span>
                  <span className={styles.filterCount}>{filter.count}</span>
                </button>
              ))}
            </div>
            <div className={styles.filterActions}>
              <button
                type="button"
                className={styles.filterActionButton}
                onClick={expandAll}
                disabled={visibleSectionIds.length === 0 || allOpen}
              >
                {translate({ message: 'Expand all' })}
              </button>
              <button
                type="button"
                className={styles.filterActionButton}
                onClick={collapseAll}
                disabled={visibleSectionIds.length === 0 || noneOpen}
              >
                {translate({ message: 'Collapse all' })}
              </button>
            </div>
          </section>

          <section className={styles.spotlight} aria-label={translate({ message: 'Changelog spotlight' })}>
            <div className={styles.spotlightContent}>
              <span className={styles.spotlightKicker}>{translate({ message: 'Changelog spotlight' })}</span>
              <h2 className={styles.spotlightTitle}>
                {translate({ message: 'January 29, 2026 component updates' })}
              </h2>
              <p className={styles.spotlightText}>
                {translate({
                  message:
                    'DSA adds anonymous LDAP connections, and Workstation Agent introduces elevation control plus mass update tooling.',
                })}
              </p>
              <div className={styles.spotlightLinks}>
                <Link className={styles.spotlightLink} to="/cloud/changelog/components/dsa">
                  {translate({ message: 'Directory Synchronization Agent' })}
                </Link>
                <Link className={styles.spotlightLink} to="/cloud/changelog/components/workstation-agent">
                  {translate({ message: 'Workstation Agent' })}
                </Link>
              </div>
            </div>
          </section>

          {showEmptyState && (
            <section className={styles.globalEmpty} aria-live="polite">
              <h2 className={styles.globalEmptyTitle}>
                {allSectionsDisabled
                  ? translate({ message: 'Nothing selected to display.' })
                  : noResultsOverall
                    ? translate({ message: 'No matches found.' })
                    : translate({ message: 'No matches in selected sections.' })}
              </h2>
              <p className={styles.globalEmptyText}>
                {allSectionsDisabled
                  ? translate({ message: 'Turn on at least one section filter to browse the changelog.' })
                  : noResultsOverall
                    ? translate({ message: 'Try a different keyword or clear the search to browse all modules.' })
                    : translate({ message: 'Enable additional sections or adjust your search.' })}
              </p>
              <button
                type="button"
                className={styles.globalEmptyAction}
                onClick={allSectionsDisabled || noResultsInSelection ? enableAllSections : () => setQuery('')}
              >
                {allSectionsDisabled || noResultsInSelection
                  ? translate({ message: 'Show all sections' })
                  : translate({ message: 'Clear search' })}
              </button>
            </section>
          )}

          {!showEmptyState && (
            <section className={styles.accordionSection} aria-label={translate({ message: 'Changelog categories' })}>
              <div className={styles.accordionList}>
                {visibleSectionIds.includes('platform') && (
                  <AccordionItem
                    id="platform"
                    title={translate({ message: 'OpenLM Platform' })}
                    count={platformVisibleCount}
                    totalCount={platformVisibleTotal}
                    isOpen={openSections.has('platform')}
                    onToggle={() => toggleSection('platform')}
                  >
                    <div className={styles.platformPanel}>
                      <div className={styles.accordionList}>
                        {visiblePlatformItems.map((item) => (
                          <AccordionItem
                            key={item.id}
                            id={item.id}
                            title={translate({ message: item.title })}
                            count={item.items.length}
                            totalCount={item.totalCount}
                            isOpen={openPlatformItems.has(item.id)}
                            onToggle={() => togglePlatformItem(item.id)}
                            nested
                          >
                            <NotesList
                              items={item.items}
                              showEmpty={isSearching}
                              accentClass={item.accentClass}
                            />
                          </AccordionItem>
                        ))}
                      </div>
                    </div>
                  </AccordionItem>
                )}

                {visibleSectionIds.includes('legacy') && (
                  <AccordionItem
                    id="legacy"
                    title={translate({ message: 'V25 legacy' })}
                    count={filteredLegacy.length}
                    totalCount={legacyNotes.length}
                    isOpen={openSections.has('legacy')}
                    onToggle={() => toggleSection('legacy')}
                  >
                    <NotesList
                      items={filteredLegacy}
                      showEmpty={isSearching}
                      accentClass={styles.legacyAccent}
                    />
                  </AccordionItem>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </Layout>
  );
}
