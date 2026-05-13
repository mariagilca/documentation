/**
 * /subscribe/already-confirmed — landing page when someone clicks a
 * confirm link whose token has already been used. Common cause: clicking
 * the link a second time after a successful confirm.
 */

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import styles from './subscribe.module.css';

export default function AlreadyConfirmed() {
  return (
    <Layout
      title={translate({
        id: 'subscribePage.alreadyConfirmed.title',
        message: "Already confirmed",
      })}
      description={translate({
        id: 'subscribePage.alreadyConfirmed.description',
        message: "Your subscription is already active. Nothing to do.",
      })}>
      <main className={styles.center}>
        <div className={styles.card}>
          <h1 className={styles.heading}>
            {translate({
              id: 'subscribePage.alreadyConfirmed.heading',
              message: "You're already subscribed",
            })}
          </h1>
          <p className={styles.lede}>
            {translate({
              id: 'subscribePage.alreadyConfirmed.body',
              message:
                "This confirmation link was used before. You're already on the OpenLM release-notes list — no action needed.",
            })}
          </p>
          <p>
            <Link to="/" className={styles.button}>
              {translate({
                id: 'subscribePage.alreadyConfirmed.cta',
                message: "Back to the docs",
              })}
            </Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
