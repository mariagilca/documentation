/**
 * /subscribe/unsubscribed — landing page after a successful unsubscribe.
 *
 * The Cloud Function `unsubscribe` redirects here regardless of whether
 * the user removed one topic (with `?topic=…`) or the whole subscription.
 */

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import styles from './subscribe.module.css';

export default function Unsubscribed() {
  return (
    <Layout
      title={translate({
        id: 'subscribePage.unsubscribed.title',
        message: "You're unsubscribed",
      })}
      description={translate({
        id: 'subscribePage.unsubscribed.description',
        message: "You've been removed from the OpenLM release-notes list.",
      })}>
      <main className={styles.center}>
        <div className={styles.card}>
          <h1 className={styles.heading}>
            {translate({
              id: 'subscribePage.unsubscribed.heading',
              message: "You've been unsubscribed",
            })}
          </h1>
          <p className={styles.lede}>
            {translate({
              id: 'subscribePage.unsubscribed.body',
              message:
                "Sorry to see you go. You can resubscribe from any /cloud/ docs page if you change your mind.",
            })}
          </p>
          <p>
            <Link to="/" className={styles.button}>
              {translate({
                id: 'subscribePage.unsubscribed.cta',
                message: "Back to the docs",
              })}
            </Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
