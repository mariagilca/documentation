import React from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';

import {
  INSTANCE_KEYS,
  type InstanceKey,
} from '../../utils/searchInstanceGrouping';
import {useSearchInstanceFilters} from '../../context/searchInstanceFilters';

import styles from './styles.module.css';

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

  const instanceLabels: Record<InstanceKey, string> = {
    cloud: translate({id: 'searchInstanceFilter.label.cloud', message: 'Cloud'}),
    legacy: translate({id: 'searchInstanceFilter.label.legacy', message: 'Legacy'}),
  };

  return (
    <div className={clsx(styles.container, styles[variant], className)}>
      <span className={styles.label}>
        <Translate id="searchInstanceFilter.label.filterDocs">Filter docs:</Translate>
      </span>
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
              <span>{instanceLabels[instance]}</span>
            </label>
          );
        })}
        <button
          type="button"
          onClick={selectAll}
          className={clsx(styles.optionButton, {
            [styles.optionButtonSelected]: allSelected,
          })}>
          <Translate id="searchInstanceFilter.action.all">All</Translate>
        </button>
      </div>
      <p className={styles.hint}>
        {translate(
          {
            id: 'searchInstanceFilter.hint',
            message: 'Showing {selected}/{total} instances',
          },
          {selected: selectedInstances.length, total: INSTANCE_KEYS.length},
        )}
      </p>
    </div>
  );
}
