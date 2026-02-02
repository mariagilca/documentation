import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './release-notes.module.css';
import { translate } from '@docusaurus/Translate';

const platformNotes = [
  { title: 'Agent Activity Manager', href: '/cloud/releasenotes/cloud/agent-activity-manager' },
  { title: 'Agents Hub', href: '/cloud/releasenotes/cloud/agents-hub' },
  { title: 'OpenLM Alerts', href: '/cloud/releasenotes/cloud/openlm-alerts' },
  { title: 'Audit', href: '/cloud/releasenotes/cloud/audit' },
  { title: 'Broker Hub', href: '/cloud/releasenotes/cloud/broker-hub' },
  { title: 'Cloud Broker', href: '/cloud/releasenotes/cloud/cloud-broker' },
  { title: 'Compliance', href: '/cloud/releasenotes/cloud/compliance' },
  { title: 'Database Configuration Tool', href: '/cloud/releasenotes/cloud/database-configuration-tool' },
  { title: 'Denials', href: '/cloud/releasenotes/cloud/denials' },
  { title: 'Directory Synchronization Service (DSS)', href: '/cloud/releasenotes/cloud/directory-synchronization-service' },
  { title: 'Dongle Monitoring', href: '/cloud/releasenotes/cloud/dongle-monitoring' },
  { title: 'Freshworks Alerts', href: '/cloud/releasenotes/cloud/freshworks-alerts' },
  { title: 'Homepage', href: '/cloud/releasenotes/cloud/homepage' },
  { title: 'Identity', href: '/cloud/releasenotes/cloud/identity' },
  { title: 'License Access Control', href: '/cloud/releasenotes/cloud/license-access-control' },
  { title: 'License Allocations', href: '/cloud/releasenotes/cloud/license-allocations' },
  { title: 'OpenLM License Manager', href: '/cloud/releasenotes/cloud/openlm-license-manager' },
  { title: 'License Servers', href: '/cloud/releasenotes/cloud/license-servers' },
  { title: 'Licenses', href: '/cloud/releasenotes/cloud/licenses' },
  { title: 'License File Management', href: '/cloud/releasenotes/cloud/license-file-management' },
  { title: 'Notifications', href: '/cloud/releasenotes/cloud/notifications' },
  { title: 'Personal Dashboard', href: '/cloud/releasenotes/cloud/personal-dashboard' },
  { title: 'Process Manager', href: '/cloud/releasenotes/cloud/process-manager' },
  { title: 'Process Sessions', href: '/cloud/releasenotes/cloud/process-sessions' },
  { title: 'Products', href: '/cloud/releasenotes/cloud/products' },
  { title: 'Projects', href: '/cloud/releasenotes/cloud/projects' },
  { title: 'Salesforce Alerts', href: '/cloud/releasenotes/cloud/salesforce-alerts' },
  { title: 'ServiceNow', href: '/cloud/releasenotes/cloud/servicenow' },
  { title: 'Zoho Alerts', href: '/cloud/releasenotes/cloud/zoho-alerts' },
  { title: 'Software Asset Management', href: '/cloud/releasenotes/cloud/software-asset-management' },
  { title: 'Subscription Optimizer', href: '/cloud/releasenotes/cloud/subscription-optimizer' },
  { title: 'Touch Point Events', href: '/cloud/releasenotes/cloud/touch-point-events' },
  { title: 'UI Configuration', href: '/cloud/releasenotes/cloud/ui-configuration' },
  { title: 'Usage', href: '/cloud/releasenotes/cloud/usage' },
  { title: 'Users and Groups', href: '/cloud/releasenotes/cloud/users-and-groups' },
  { title: 'Virtual License Manager (VLM)', href: '/cloud/releasenotes/cloud/virtual-license-manager' },
];

const platformComponents = [
  { title: 'Broker', href: '/cloud/releasenotes/components/broker' },
  { title: 'Workstation Agent', href: '/cloud/releasenotes/components/workstation-agent' },
  { title: 'Directory Synchronization Agent', href: '/cloud/releasenotes/components/dsa' },
];

const legacyNotes = [
  { title: 'Broker', href: '/legacy/releasenotes/broker' },
  { title: 'SLM', href: '/legacy/releasenotes/slm' },
  { title: 'Workstation Agent', href: '/legacy/releasenotes/workstation-agent' },
  { title: 'End-User Services', href: '/legacy/releasenotes/end-user-services' },
  { title: 'Applications Manager', href: '/legacy/releasenotes/applications-manager' },
  { title: 'Reporting Hub', href: '/legacy/releasenotes/reporting-hub' },
  { title: 'Reports Scheduler', href: '/legacy/releasenotes/reports-scheduler' },
  { title: 'License Parser', href: '/legacy/releasenotes/license-parser' },
  { title: 'Directory Synchronization Service', href: '/legacy/releasenotes/directory-synchronization-service' },
  { title: 'Directory Synchronization Agent', href: '/legacy/releasenotes/directory-synchronization-agent' },
  { title: 'ServiceNow Adapter', href: '/legacy/releasenotes/servicenow-adapter' },
  { title: 'Identity Service', href: '/legacy/releasenotes/identity-service' },
  { title: 'AutoCAD Plugin', href: '/legacy/releasenotes/autocad-plugin' },
  { title: 'Dongle Monitoring', href: '/legacy/releasenotes/dongle-monitoring' },
];

function filterNotes(notes, query) {
  if (!query) return notes;
  return notes.filter((note) => note.title.toLowerCase().includes(query));
}

function formatCount(filtered, total) {
  return filtered === total ? `${total}` : `${filtered} / ${total}`;
}

function NotesGrid({ items, showEmpty, accentClass }) {
  if (!items.length) {
    return showEmpty ? (
      <div className={styles.emptyState}>
        {translate({ message: 'No matching release notes.' })}
      </div>
    ) : null;
  }

  return (
    <div className={`${styles.cardsContainer} ${accentClass}`}>
      {items.map((item) => (
        <Link key={item.href} to={item.href} className={styles.noteLink}>
          <div className={styles.noteCard}>
            <span className={styles.noteDot} aria-hidden="true" />
            <span className={styles.noteTitle}>{item.title}</span>
            <span className={styles.noteArrow} aria-hidden="true">&gt;</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function ReleaseNotes() {
  const title = translate({ message: 'Release Notes' });
  const description = translate({
    message: 'Track product and component changes across OpenLM Platform and OpenLM Legacy.',
  });
  const [query, setQuery] = useState('');
  const queryValue = query.trim();
  const q = queryValue.toLowerCase();
  const showFilterSummary = queryValue.length > 0;

  const filteredPlatform = useMemo(() => filterNotes(platformNotes, q), [q]);
  const filteredComponents = useMemo(() => filterNotes(platformComponents, q), [q]);
  const filteredLegacy = useMemo(() => filterNotes(legacyNotes, q), [q]);
  const totalResults = filteredPlatform.length + filteredComponents.length + filteredLegacy.length;

  return (
    <Layout title={title} description={description}>
      <main className={styles.page}>
        <div className={styles.pageInner}>
          <section className={styles.hero}>
            <div className={styles.heroGlow} aria-hidden="true" />
            <div className={styles.heroContent}>
              <p className={styles.kicker}>{translate({ message: 'Release notes' })}</p>
              <h1 className={styles.heroTitle}>{title}</h1>
              <p className={styles.heroDescription}>{description}</p>

              <div className={styles.heroSearch}>
                <div className={styles.searchWrapper}>
                  <input
                    aria-label={translate({ message: 'Filter release notes' })}
                    className={styles.searchInput}
                    placeholder={translate({ message: 'Filter notes (e.g. license, alerts)' })}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  {query && (
                    <button
                      type="button"
                      className={styles.clearButton}
                      onClick={() => setQuery('')}
                      aria-label={translate({ message: 'Clear search' })}
                    >
                      x
                    </button>
                  )}
                </div>
                {showFilterSummary && (
                  <div className={styles.filterSummary}>
                    {translate({
                      message: 'Showing {count} results for "{query}".',
                      values: { count: totalResults, query: queryValue },
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statCard} data-variant="platform">
                <div className={styles.statLabel}>{translate({ message: 'OpenLM Platform' })}</div>
                <div className={styles.statValue}>{platformNotes.length}</div>
                <div className={styles.statMeta}>{translate({ message: 'Modules' })}</div>
              </div>
              <div className={styles.statCard} data-variant="components">
                <div className={styles.statLabel}>{translate({ message: 'Components' })}</div>
                <div className={styles.statValue}>{platformComponents.length}</div>
                <div className={styles.statMeta}>{translate({ message: 'Installables' })}</div>
              </div>
              <div className={styles.statCard} data-variant="legacy">
                <div className={styles.statLabel}>{translate({ message: 'OpenLM Legacy' })}</div>
                <div className={styles.statValue}>{legacyNotes.length}</div>
                <div className={styles.statMeta}>{translate({ message: 'Products' })}</div>
              </div>
            </div>
          </section>

          <section className={styles.releaseBanner} aria-label={translate({ message: 'Release spotlight' })}>
            <div className={styles.bannerGlow} aria-hidden="true" />
            <div className={styles.bannerContent}>
              <span className={styles.bannerKicker}>{translate({ message: 'Release spotlight' })}</span>
              <h2 className={styles.bannerTitle}>
                {translate({ message: 'January 29, 2026 component updates' })}
              </h2>
              <p className={styles.bannerText}>
                {translate({
                  message: 'DSA adds anonymous LDAP connections, and Workstation Agent introduces elevation control plus mass update tooling.',
                })}
              </p>
              <div className={styles.bannerLinks}>
                <Link className={styles.bannerLink} to="/cloud/releasenotes/components/dsa">
                  {translate({ message: 'Directory Synchronization Agent' })}
                </Link>
                <Link className={styles.bannerLink} to="/cloud/releasenotes/components/workstation-agent">
                  {translate({ message: 'Workstation Agent' })}
                </Link>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.sectionPlatform}`}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionPill}>{translate({ message: 'OpenLM Platform' })}</span>
                <h2 className={styles.sectionTitle}>{translate({ message: 'OpenLM Platform' })}</h2>
                <p className={styles.sectionDescription}>
                  {translate({ message: 'Modules and services in the OpenLM Platform cloud experience.' })}
                </p>
              </div>
              <div className={styles.sectionMeta}>
                <span className={styles.sectionCount}>{formatCount(filteredPlatform.length, platformNotes.length)}</span>
                <span className={styles.sectionMetaLabel}>{translate({ message: 'modules' })}</span>
              </div>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.subSection}>
                <div className={styles.subHeader}>
                  <h3 className={styles.subTitle}>{translate({ message: 'Platform modules' })}</h3>
                  <span className={styles.subCount}>
                    {formatCount(filteredPlatform.length, platformNotes.length)}
                  </span>
                </div>
                <NotesGrid
                  items={filteredPlatform}
                  showEmpty={showFilterSummary}
                  accentClass={styles.platformAccent}
                />
              </div>

              <div className={styles.subSection}>
                <div className={styles.subHeader}>
                  <h3 className={styles.subTitle}>{translate({ message: 'Components' })}</h3>
                  <span className={styles.subCount}>
                    {formatCount(filteredComponents.length, platformComponents.length)}
                  </span>
                </div>
                <NotesGrid
                  items={filteredComponents}
                  showEmpty={showFilterSummary}
                  accentClass={styles.componentAccent}
                />
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.sectionLegacy}`}>
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionPill}>{translate({ message: 'OpenLM Legacy' })}</span>
                <h2 className={styles.sectionTitle}>{translate({ message: 'OpenLM Legacy' })}</h2>
                <p className={styles.sectionDescription}>
                  {translate({ message: 'Legacy products and services release notes for Version 25.' })}
                </p>
              </div>
              <div className={styles.sectionMeta}>
                <span className={styles.sectionCount}>{formatCount(filteredLegacy.length, legacyNotes.length)}</span>
                <span className={styles.sectionMetaLabel}>{translate({ message: 'products' })}</span>
              </div>
            </div>

            <div className={styles.sectionBody}>
              <div className={styles.subSection}>
                <div className={styles.subHeader}>
                  <h3 className={styles.subTitle}>{translate({ message: 'Legacy products' })}</h3>
                  <span className={styles.subCount}>
                    {formatCount(filteredLegacy.length, legacyNotes.length)}
                  </span>
                </div>
                <NotesGrid
                  items={filteredLegacy}
                  showEmpty={showFilterSummary}
                  accentClass={styles.legacyAccent}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
