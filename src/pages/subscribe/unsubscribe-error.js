/**
 * /subscribe/unsubscribe-error — landing page when an unsubscribe link
 * can't be processed. Usually because the token is missing, doesn't
 * match a known subscriber, or because Zoho returned an error.
 */

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import styles from './subscribe.module.css';

export default function UnsubscribeError() {
  return (
    <Layout
      title={translate({
        id: 'subscribePage.unsubscribeError.title',
        message: "We couldn't process your unsubscribe",
      })}
      description={translate({
        id: 'subscribePage.unsubscribeError.description',
        message: "The unsubscribe link couldn't be processed.",
      })}>
      <main className={styles.center}>
        <div className={styles.card}>
          <div
            className={styles.statusIcon}
            style={{'--status-accent': '#f59e0b', '--status-soft': 'rgba(245, 158, 11, 0.16)'}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
              <path d="M12 9.5v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h1 className={styles.heading}>
            {translate({
              id: 'subscribePage.unsubscribeError.heading',
              message: "We couldn't unsubscribe you",
            })}
          </h1>
          <p className={styles.lede}>
            {translate({
              id: 'subscribePage.unsubscribeError.body',
              message:
                "We couldn't process the unsubscribe link. If you've already unsubscribed, you can ignore this — you're off the list. Otherwise, contact docs@openlm.com and we'll remove you manually.",
            })}
          </p>
          <p>
            <Link to="/" className={styles.button}>
              {translate({
                id: 'subscribePage.unsubscribeError.cta',
                message: "Back to the docs",
              })}
            </Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
