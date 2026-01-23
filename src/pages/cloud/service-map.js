import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import clsx from 'clsx';

import {ServiceSolarMap} from '@site/src/components/ServiceSolarMap';
import {
  OPENLM_PLATFORM_EDGES,
  OPENLM_PLATFORM_NODES,
} from '@site/src/data/openlmPlatformGraph';

import styles from './service-map.module.css';

function useSelectedServiceFromLocation(search) {
  return useMemo(() => {
    const params = new URLSearchParams(search ?? '');
    return params.get('service') || params.get('current');
  }, [search]);
}

function groupLabel(group) {
  switch (group) {
    case 'infra':
      return 'Infra';
    case 'db':
      return 'Databases';
    case 'core':
      return 'Core';
    case 'collection':
      return 'Data collection';
    case 'automation':
      return 'Automation';
    case 'reporting':
      return 'Reporting';
    case 'integration':
      return 'Integrations';
    case 'external':
      return 'External';
    default:
      return 'Other';
  }
}

function edgeKindLabel(kind) {
  switch (kind) {
    case 'dependsOn':
      return 'Depends on';
    case 'consumesFrom':
      return 'Consumes from';
    case 'producesTo':
      return 'Produces to';
    case 'storesIn':
      return 'Stores in';
    case 'integratesWith':
      return 'Integrates with';
    default:
      return 'Related';
  }
}

export default function ServiceMapPage() {
  const history = useHistory();
  const location = useLocation();

  const selectedFromUrl = useSelectedServiceFromLocation(location.search);
  const [selectedId, setSelectedId] = useState(() => selectedFromUrl ?? 'identity');

  useEffect(() => {
    if (selectedFromUrl && selectedFromUrl !== selectedId) {
      setSelectedId(selectedFromUrl);
    }
  }, [selectedFromUrl, selectedId]);

  const nodesById = useMemo(
    () => new Map(OPENLM_PLATFORM_NODES.map((node) => [node.id, node])),
    [],
  );

  const selectedNode = selectedId ? nodesById.get(selectedId) : null;

  const edgeGroups = useMemo(() => {
    if (!selectedId) return [];

    const edges = OPENLM_PLATFORM_EDGES.filter(
      (edge) => edge.from === selectedId || edge.to === selectedId,
    );

    const byKind = new Map();
    for (const edge of edges) {
      const list = byKind.get(edge.kind) ?? [];
      list.push(edge);
      byKind.set(edge.kind, list);
    }

    return Array.from(byKind.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([kind, edgesForKind]) => ({
        kind,
        label: edgeKindLabel(kind),
        edges: edgesForKind,
      }));
  }, [selectedId]);

  const onSelectedIdChange = useCallback(
    (nextId) => {
      setSelectedId(nextId);
      const params = new URLSearchParams(location.search ?? '');
      if (nextId) params.set('service', nextId);
      else params.delete('service');
      history.replace({
        ...location,
        search: params.toString() ? `?${params.toString()}` : '',
      });
    },
    [history, location],
  );

  const selectableNodeGroups = useMemo(() => {
    const groupOrder = [
      'core',
      'collection',
      'automation',
      'reporting',
      'integration',
      'infra',
      'db',
      'external',
    ];
    const byGroup = new Map();
    for (const node of OPENLM_PLATFORM_NODES) {
      const list = byGroup.get(node.group) ?? [];
      list.push(node);
      byGroup.set(node.group, list);
    }

    return groupOrder
      .filter((g) => byGroup.has(g))
      .map((group) => ({
        group,
        label: groupLabel(group),
        nodes: (byGroup.get(group) ?? []).slice().sort((a, b) =>
          a.label.localeCompare(b.label),
        ),
      }));
  }, []);

  return (
    <Layout
      title={translate({message: 'Service map'})}
      description={translate({
        message:
          'Explore OpenLM Platform services and their relationships and dependencies.',
      })}
    >
      <main className={styles.main}>
        <div className={clsx('container container--fluid', styles.container)}>
          <div className={styles.header}>
            <h1 className={styles.h1}>
              {translate({message: 'OpenLM service map'})}
            </h1>
            <p className={styles.lede}>
              {translate({
                message:
                  'Select a service to see its direct dependencies and connections. Click the selected node again to open its docs.',
              })}
            </p>
          </div>

          <div className={styles.grid}>
            <section className={styles.mapPane}>
              <ServiceSolarMap
                selectedId={selectedId}
                onSelectedIdChange={onSelectedIdChange}
                height={720}
                title={translate({message: 'Interactive map'})}
              />
            </section>

            <aside className={styles.detailsPane} aria-label="Selected service details">
              <div className={styles.card}>
                <div className={styles.cardTitle}>
                  {translate({message: 'Selected'})}
                </div>

                <div className={styles.selectorRow}>
                  <label className={styles.label} htmlFor="service-map-select">
                    {translate({message: 'Service'})}
                  </label>
                  <select
                    id="service-map-select"
                    className={styles.select}
                    value={selectedId ?? ''}
                    onChange={(e) => onSelectedIdChange(e.target.value)}
                  >
                    {selectableNodeGroups.map((group) => (
                      <optgroup key={group.group} label={group.label}>
                        {group.nodes.map((node) => (
                          <option key={node.id} value={node.id}>
                            {node.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {selectedNode ? (
                  <>
                    <div className={styles.kv}>
                      <div className={styles.k}>
                        {translate({message: 'Category'})}
                      </div>
                      <div className={styles.v}>
                        {groupLabel(selectedNode.group)}
                      </div>
                    </div>

                    <div className={styles.actionsRow}>
                      {selectedNode.href ? (
                        <Link className={styles.primaryButton} to={selectedNode.href}>
                          {translate({message: 'Open docs'})}
                        </Link>
                      ) : (
                        <span className={styles.muted}>
                          {translate({message: 'No docs link for this node.'})}
                        </span>
                      )}
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.cardTitle}>
                      {translate({message: 'Direct relationships'})}
                    </div>

                    {edgeGroups.length === 0 ? (
                      <div className={styles.muted}>
                        {translate({message: 'No relationships defined yet.'})}
                      </div>
                    ) : (
                      <div className={styles.edgeGroups}>
                        {edgeGroups.map((group) => (
                          <div key={group.kind} className={styles.edgeGroup}>
                            <div className={styles.edgeGroupTitle}>
                              {group.label}
                            </div>
                            <ul className={styles.edgeList}>
                              {group.edges.map((edge) => {
                                const otherId =
                                  edge.from === selectedId ? edge.to : edge.from;
                                const other = nodesById.get(otherId);
                                if (!other) return null;
                                return (
                                  <li key={`${edge.from}:${edge.kind}:${edge.to}`}>
                                    {other.href ? (
                                      <Link to={other.href}>{other.label}</Link>
                                    ) : (
                                      <span>{other.label}</span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.muted}>
                    {translate({message: 'Select a service to see details.'})}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </Layout>
  );
}
