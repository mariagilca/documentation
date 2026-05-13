/**
 * /subscribe/confirmed — landing page after a successful double-opt-in.
 *
 * The Cloud Function `confirmSubscription` redirects here after writing
 * the subscriber + subscription rows in Zoho. The visitor sees this page,
 * not the function's response.
 */

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import styles from './subscribe.module.css';

export default function Confirmed() {
  return (
    <Layout
      title={translate({
        id: 'subscribePage.confirmed.title',
        message: "You're subscribed",
      })}
      description={translate({
        id: 'subscribePage.confirmed.description',
        message: "Your OpenLM release-notes subscription is confirmed.",
      })}>
      <main className={styles.center}>
        <div className={styles.card}>
          <h1 className={styles.heading}>
            {translate({
              id: 'subscribePage.confirmed.heading',
              message: "You're subscribed",
            })}
          </h1>
          <p className={styles.lede}>
            {translate({
              id: 'subscribePage.confirmed.body',
              message:
                "Thanks for confirming. We'll email you when there's a new OpenLM release. One short email per release — no marketing.",
            })}
          </p>
          <p>
            <Link to="/" className={styles.button}>
              {translate({
                id: 'subscribePage.confirmed.cta',
                message: "Back to the docs",
              })}
            </Link>
          </p>
          <p className={styles.muted}>
            {translate({
              id: 'subscribePage.confirmed.footer',
              message:
                "Want to stop? Use the unsubscribe link in any release email.",
            })}
          </p>
        </div>
      </main>
    </Layout>
  );
}
