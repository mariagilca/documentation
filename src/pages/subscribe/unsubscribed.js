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
          <div
            className={styles.statusIcon}
            style={{'--status-accent': '#64748b', '--status-soft': 'rgba(100, 116, 139, 0.16)'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="m8.5 12.5 2.5 2.5 4.5-5" />
            </svg>
          </div>
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
                "Sorry to see you go. You can resubscribe anytime from the OpenLM docs if you change your mind.",
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
