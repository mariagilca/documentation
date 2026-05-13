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
        message: 'Stay informed about OpenLM',
      })}
      description={translate({
        id: 'subscribePage.index.description',
        message:
          "Subscribe and we'll email you when there's a new OpenLM release.",
      })}>
      <main className={styles.center}>
        <div className={styles.card}>
          <h1 className={styles.heading}>
            {translate({
              id: 'subscribePage.index.heading',
              message: 'Stay informed about OpenLM',
            })}
          </h1>
          <p className={styles.lede}>
            {translate({
              id: 'subscribePage.index.lede',
              message:
                "Enter your email and we'll let you know whenever there's a new OpenLM release. One short email per release — no marketing, no noise. Unsubscribe with one click from any email.",
            })}
          </p>
          <SubscribeWidget />
        </div>
      </main>
    </Layout>
  );
}
