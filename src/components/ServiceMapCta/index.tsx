import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';

import type { PlatformNode } from '@site/src/data/openlmPlatformGraph';

import styles from './styles.module.css';

type Props = {
  node: PlatformNode;
};

export function ServiceMapCta({ node }: Props) {
  return (
    <div className={styles.card} role="note" aria-label="Service map shortcut">
      <div className={styles.row}>
        <div className={styles.icon} aria-hidden="true">
          ⦿
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            {translate({ message: 'Explore dependencies in the interactive map' })}
          </div>
          <div className={styles.subtitle}>
            {translate(
              { message: 'See how {service} connects to the rest of OpenLM Platform.' },
              { service: node.label },
            )}
          </div>
        </div>
        <div className={styles.actions}>
          <Link className={clsx('button button--primary', styles.button)} to={`/cloud/service-map?service=${encodeURIComponent(node.id)}`}>
            {translate({ message: 'Open map' })}
          </Link>
        </div>
      </div>
    </div>
  );
}

