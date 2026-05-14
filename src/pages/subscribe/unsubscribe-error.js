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
