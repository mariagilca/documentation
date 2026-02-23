import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useHistory } from '@docusaurus/router';

import {
  OPENLM_PLATFORM_EDGES,
  OPENLM_PLATFORM_NODES,
  type PlatformEdge,
  type PlatformEdgeKind,
  type PlatformNode,
} from '@site/src/data/openlmPlatformGraph';

import styles from './styles.module.css';

type Props = {
  current?: string;
  selectedId?: string | null;
  defaultSelectedId?: string | null;
  onSelectedIdChange?: (id: string | null) => void;
  height?: number;
  title?: string;
};

type Point = { x: number; y: number; angle: number; radius: number };

const VIEWBOX_SIZE = 800;
const CENTER = VIEWBOX_SIZE / 2;
const MARGIN = 70;

const STAR_COUNT = 140;
const STARS: Array<{ x: number; y: number; r: number; o: number }> = (() => {
  const stars: Array<{ x: number; y: number; r: number; o: number }> = [];
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let i = 0; i < STAR_COUNT; i++) {
    const x = rand() * VIEWBOX_SIZE;
    const y = rand() * VIEWBOX_SIZE;
    const r = 0.8 + rand() * 1.9;
    const o = 0.18 + rand() * 0.45;
    stars.push({ x, y, r, o });
  }
  return stars;
})();

function getOrbit(node: PlatformNode): number {
  if (node.id === 'kafka') return 0;
  if (node.id === 'reporting-db') return 4;

  switch (node.group) {
    case 'core':
    case 'db':
      return 1;
    case 'collection':
      return 2;
    case 'automation':
      return 3;
    case 'reporting':
    case 'infra':
      return 4;
    case 'integration':
    case 'external':
      return 5;
  }
}

function getEdgeLabel(edge: PlatformEdge): string {
  switch (edge.kind) {
    case 'dependsOn':
      return 'depends on';
    case 'consumesFrom':
      return 'consumes from';
    case 'producesTo':
      return 'produces to';
    case 'storesIn':
      return 'stores in';
    case 'integratesWith':
      return 'integrates with';
  }
}

function getMarkerId(kind: PlatformEdgeKind): string {
  return `marker-${kind}`;
}

function getGradientId(group: PlatformNode['group']): string {
  return `grad-${group}`;
}

function getNodeRadius(nodeId: string, isSelected: boolean, isRelated: boolean): number {
  if (nodeId === 'kafka') return 18;
  if (isSelected) return 12;
  if (isRelated) return 10;
  return 7;
}

export function ServiceSolarMap({
  current,
  selectedId: selectedIdProp,
  defaultSelectedId,
  onSelectedIdChange,
  height = 480,
  title = 'Service map',
}: Props) {
  const history = useHistory();
  const controlledSelectedId = selectedIdProp !== undefined ? selectedIdProp : typeof current === 'string' ? current : undefined;
  const isControlled = controlledSelectedId !== undefined;
  const isSelectionLocked = isControlled && typeof onSelectedIdChange !== 'function';

  const [uncontrolledSelectedId, setUncontrolledSelectedId] = useState<string | null>(defaultSelectedId ?? null);
  const selectedId = (isControlled ? controlledSelectedId : uncontrolledSelectedId) ?? null;

  const setSelectedId = (id: string | null) => {
    if (typeof onSelectedIdChange === 'function') {
      onSelectedIdChange(id);
      return;
    }
    setUncontrolledSelectedId(id);
  };

  const nodesById = useMemo(() => new Map(OPENLM_PLATFORM_NODES.map((node) => [node.id, node])), []);

  const { positionsById, maxOrbit } = useMemo(() => {
    const orbitBuckets = new Map<number, PlatformNode[]>();
    for (const node of OPENLM_PLATFORM_NODES) {
      const orbit = getOrbit(node);
      orbitBuckets.set(orbit, [...(orbitBuckets.get(orbit) ?? []), node]);
    }

    const orbitNumbers = [...orbitBuckets.keys()].sort((a, b) => a - b);
    const computedMaxOrbit = orbitNumbers.length ? orbitNumbers[orbitNumbers.length - 1] : 0;
    const orbitStep = computedMaxOrbit ? (CENTER - MARGIN) / computedMaxOrbit : 0;

    const byId: Record<string, Point> = {};

    for (const orbit of orbitNumbers) {
      const nodes = (orbitBuckets.get(orbit) ?? []).slice().sort((a, b) => a.label.localeCompare(b.label));
      if (orbit === 0) {
        for (const node of nodes) {
          byId[node.id] = { x: CENTER, y: CENTER, angle: -Math.PI / 2, radius: 0 };
        }
        continue;
      }

      const radius = orbit * orbitStep;
      const startAngle = -Math.PI / 2;
      const step = (Math.PI * 2) / Math.max(nodes.length, 1);

      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        const angle = startAngle + index * step;
        const x = CENTER + radius * Math.cos(angle);
        const y = CENTER + radius * Math.sin(angle);
        byId[node.id] = { x, y, angle, radius };
      }
    }

    return { positionsById: byId, maxOrbit: computedMaxOrbit };
  }, []);

  const { relatedNodeIds, directEdges } = useMemo(() => {
    if (!selectedId) return { relatedNodeIds: new Set<string>(), directEdges: [] as PlatformEdge[] };

    const edges = OPENLM_PLATFORM_EDGES.filter((edge) => edge.from === selectedId || edge.to === selectedId);
    const related = new Set<string>([selectedId]);
    for (const edge of edges) {
      related.add(edge.from);
      related.add(edge.to);
    }
    return { relatedNodeIds: related, directEdges: edges };
  }, [selectedId]);

  function onNodeActivate(node: PlatformNode) {
    if (isSelectionLocked) {
      if (node.href) history.push(node.href);
      return;
    }

    if (selectedId !== node.id) {
      setSelectedId(node.id);
      return;
    }

    if (node.href) history.push(node.href);
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.title}>{title}</div>
        <div className={styles.hint}>
          {selectedId ? (
            isSelectionLocked ? (
              <span>
                Click a node to open its docs. Showing direct relationships for <strong>{nodesById.get(selectedId)?.label ?? selectedId}</strong>.
              </span>
            ) : (
              <span>
                Click the selected node again to open docs. Showing direct relationships for <strong>{nodesById.get(selectedId)?.label ?? selectedId}</strong>.
              </span>
            )
          ) : (
            <span>Click a node to highlight its direct dependencies.</span>
          )}
        </div>
      </div>

      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        width="100%"
        height={height}
        role="img"
        aria-label="OpenLM platform service relationship map"
      >
        <defs>
          <filter id="nodeShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.28)" />
          </filter>
          <filter id="nodeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="rgba(88,155,255,0.35)" />
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="rgba(88,155,255,0.18)" />
          </filter>
          <filter id="sunGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(255, 203, 102, 0.45)" />
            <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="rgba(255, 203, 102, 0.22)" />
          </filter>
          <filter id="edgeGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="rgba(255,255,255,0.18)" />
          </filter>

          <radialGradient id="grad-sun" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" stopOpacity="1" />
            <stop offset="55%" stopColor="var(--ifm-color-warning)" stopOpacity="0.98" />
            <stop offset="100%" stopColor="var(--ifm-color-warning-dark)" stopOpacity="0.9" />
          </radialGradient>

          {(['infra', 'db', 'core', 'collection', 'automation', 'reporting', 'integration', 'external'] as PlatformNode['group'][]).map(
            (group) => (
              <radialGradient key={group} id={getGradientId(group)} cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor={`var(--openlm-node-${group}-hi)`} stopOpacity="1" />
                <stop offset="65%" stopColor={`var(--openlm-node-${group})`} stopOpacity="0.95" />
                <stop offset="100%" stopColor={`var(--openlm-node-${group}-lo)`} stopOpacity="0.9" />
              </radialGradient>
            ),
          )}

          {(['dependsOn', 'consumesFrom', 'producesTo', 'storesIn', 'integratesWith'] as PlatformEdgeKind[]).map((kind) => (
            <marker
              key={kind}
              id={getMarkerId(kind)}
              viewBox="0 0 10 10"
              refX="8.5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className={clsx(styles.arrowHead, styles[`arrowHead_${kind}`])} />
            </marker>
          ))}
        </defs>

        {STARS.map((s, idx) => (
          <circle key={idx} className={styles.star} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />
        ))}

        {Array.from({ length: maxOrbit }, (_, index) => index + 1).map((orbit) => {
          const orbitStep = maxOrbit ? (CENTER - MARGIN) / maxOrbit : 0;
          const r = orbit * orbitStep;
          return <circle key={orbit} className={styles.orbit} cx={CENTER} cy={CENTER} r={r} />;
        })}

        {selectedId &&
          directEdges.map((edge) => {
            const from = positionsById[edge.from];
            const to = positionsById[edge.to];
            if (!from || !to) return null;

            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;

            const fromRadius = getNodeRadius(edge.from, edge.from === selectedId, true);
            const toRadius = getNodeRadius(edge.to, edge.to === selectedId, true);
            const fromInset = fromRadius + 6;
            const toInset = toRadius + 6;
            const x1 = from.x + ux * fromInset;
            const y1 = from.y + uy * fromInset;
            const x2 = to.x - ux * toInset;
            const y2 = to.y - uy * toInset;

            const key = `${edge.from}:${edge.kind}:${edge.to}`;
            const label = `${nodesById.get(edge.from)?.label ?? edge.from} ${getEdgeLabel(edge)} ${nodesById.get(edge.to)?.label ?? edge.to}`;

            return (
              <path
                key={key}
                className={clsx(styles.edge, styles[`edge_${edge.kind}`])}
                d={`M ${x1} ${y1} L ${x2} ${y2}`}
                markerEnd={`url(#${getMarkerId(edge.kind)})`}
                filter="url(#edgeGlow)"
              >
                <title>{label}</title>
              </path>
            );
          })}

        {OPENLM_PLATFORM_NODES.map((node) => {
          const point = positionsById[node.id];
          if (!point) return null;

          const isSelected = selectedId === node.id;
          const isRelated = selectedId ? relatedNodeIds.has(node.id) : false;
          const isDimmed = selectedId ? !isRelated : false;

          const isSun = node.id === 'kafka';
          const radius = getNodeRadius(node.id, isSelected, isRelated);
          const haloRadius = radius + (isSun ? 7 : isSelected ? 6 : isRelated ? 5 : 4);
          const rayCount = isSun ? 18 : isSelected ? 12 : isRelated ? 10 : 8;
          const rayLength = isSun ? 14 : isSelected ? 9 : isRelated ? 7 : 5;
          const rayStart = radius + (isSun ? 3 : 2);

          const showLabel = !selectedId || isSelected || isRelated;
          const isLeft = point.x < CENTER - 10;
          const anchor = node.id === 'kafka' ? 'middle' : isLeft ? 'end' : 'start';
          const dx = node.id === 'kafka' ? 0 : isLeft ? -12 : 12;
          const dy = node.id === 'kafka' ? -22 : 4;
          const ariaLabel = node.description ? `${node.label}: ${node.description}` : node.label;

          return (
            <g
              key={node.id}
              className={clsx(
                styles.node,
                styles[`node_${node.group}`],
                isSun && styles.nodeSun,
                isSelected && styles.nodeSelected,
                isDimmed && styles.nodeDimmed,
              )}
              role="button"
              tabIndex={0}
              aria-label={ariaLabel}
              aria-pressed={isSelected}
              onClick={() => onNodeActivate(node)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onNodeActivate(node);
                }
              }}
            >
              <g className={styles.nodeRays} aria-hidden="true">
                {Array.from({ length: rayCount }, (_, idx) => {
                  const angle = (idx / rayCount) * Math.PI * 2;
                  const x1 = point.x + Math.cos(angle) * rayStart;
                  const y1 = point.y + Math.sin(angle) * rayStart;
                  const x2 = point.x + Math.cos(angle) * (rayStart + rayLength);
                  const y2 = point.y + Math.sin(angle) * (rayStart + rayLength);
                  return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
              </g>
              <circle cx={point.x} cy={point.y} r={haloRadius} className={styles.nodeHalo} />
              <circle
                cx={point.x}
                cy={point.y}
                r={radius}
                className={styles.nodeDot}
                fill={node.id === 'kafka' ? 'url(#grad-sun)' : `url(#${getGradientId(node.group)})`}
                filter={node.id === 'kafka' ? 'url(#sunGlow)' : isSelected ? 'url(#nodeGlow)' : 'url(#nodeShadow)'}
              />
              <title>{node.description ? `${node.label} — ${node.description}` : node.label}</title>
              {showLabel && (
                <text className={styles.nodeLabel} x={point.x} y={point.y} dx={dx} dy={dy} textAnchor={anchor}>
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className={styles.legend} aria-label="Legend">
        <div className={styles.legendItem}>
          <span className={clsx(styles.legendSwatch, styles.legendSwatch_core)} /> Core
        </div>
        <div className={styles.legendItem}>
          <span className={clsx(styles.legendSwatch, styles.legendSwatch_collection)} /> Data collection
        </div>
        <div className={styles.legendItem}>
          <span className={clsx(styles.legendSwatch, styles.legendSwatch_automation)} /> Automation
        </div>
        <div className={styles.legendItem}>
          <span className={clsx(styles.legendSwatch, styles.legendSwatch_reporting)} /> Reporting
        </div>
        <div className={styles.legendItem}>
          <span className={clsx(styles.legendSwatch, styles.legendSwatch_infra)} /> Infra / DB / external
        </div>
      </div>
    </div>
  );
}
