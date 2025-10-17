import React from 'react';
import clsx from 'clsx';

import {
  INSTANCE_KEYS,
  type InstanceKey,
} from '../../utils/searchInstanceGrouping';
import {useSearchInstanceFilters} from '../../context/searchInstanceFilters';

import styles from './styles.module.css';

const INSTANCE_LABELS: Record<InstanceKey, string> = {
  cloud: 'Cloud',
  onpremise: 'On-Premise',
  legacy: 'Legacy',
};

type Variant = 'compact' | 'inline';

type Props = {
  className?: string;
  variant?: Variant;
};

export default function SearchInstanceFilter({
  className,
  variant = 'compact',
}: Props) {
  const {
    selectedInstances,
    toggleInstance,
    isInstanceSelected,
    allSelected,
    selectAll,
  } = useSearchInstanceFilters();

  return (
    <div className={clsx(styles.container, styles[variant], className)}>
      <span className={styles.label}>Filter docs:</span>
      <div className={styles.options}>
        {INSTANCE_KEYS.map((instance) => {
          const checked = isInstanceSelected(instance);
          return (
            <label key={instance} className={styles.option}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleInstance(instance)}
              />
              <span>{INSTANCE_LABELS[instance]}</span>
            </label>
          );
        })}
        <button
          type="button"
          onClick={selectAll}
          className={clsx(styles.optionButton, {
            [styles.optionButtonSelected]: allSelected,
          })}>
          All
        </button>
      </div>
      <p className={styles.hint}>
        Showing {selectedInstances.length}/{INSTANCE_KEYS.length} instances
      </p>
    </div>
  );
}
