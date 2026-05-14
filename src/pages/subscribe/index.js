/**
 * /subscribe — landing page that hosts the SubscribeWidget.
 *
 * This is the canonical URL we link to from the docs nav, the footer,
 * release notes, or any callout that invites readers to follow topics.
 * Anywhere else in the docs that wants to embed the widget inline can
 * import it directly:
 *
 *   import SubscribeWidget from '@site/src/components/SubscribeWidget';
 *   <SubscribeWidget />
 */

import React from 'react';
import Layout from '@theme/Layout';
import {translate} from '@docusaurus/Translate';
import SubscribeWidget from '@site/src/components/SubscribeWidget';
import styles from './subscribe.module.css';

export default function SubscribePage() {
  return (
    <Layout
      title={translate({
        id: 'subscribePage.index.title',
        message: 'Get OpenLM release updates',
      })}
      description={translate({
        id: 'subscribePage.index.description',
        message:
          "Subscribe to get an email whenever OpenLM ships a release or updates a changelog.",
      })}>
      <main className={styles.center}>
        <div className={styles.card}>
          <h1 className={styles.heading}>
            {translate({
              id: 'subscribePage.index.heading',
              message: 'Get OpenLM release updates',
            })}
          </h1>
          <p className={styles.lede}>
            {translate({
              id: 'subscribePage.index.lede',
              message:
                "We'll email you when a new release ships or a changelog updates. One short note per change. One-click unsubscribe in every email.",
            })}
          </p>
          <SubscribeWidget />
        </div>
      </main>
    </Layout>
  );
}
