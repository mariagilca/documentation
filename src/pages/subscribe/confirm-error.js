/**
 * /subscribe/confirm-error — landing page when a confirmation link fails.
 *
 * The Cloud Function `confirmSubscription` redirects here with a `reason`
 * query parameter:
 *   - missing_token  — no token in the URL
 *   - unknown_token  — token doesn't match any pending doc
 *   - expired        — token is older than 24 hours
 *   - server         — function caught an unexpected error
 *
 * We tailor the heading per reason and otherwise show a generic recovery
 * path (re-subscribe).
 */

import React, {useEffect, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import styles from './subscribe.module.css';

const REASON_COPY = {
  missing_token: {
    heading: 'Missing confirmation token',
    body: "The link you clicked is missing its token. Try copying the full link from the email instead of typing it manually.",
  },
  unknown_token: {
    heading: "Link not recognised",
    body: "This confirmation link doesn't match any pending subscription. It may have been used already, or the subscription request expired.",
  },
  expired: {
    heading: 'Link expired',
    body: 'Confirmation links are valid for 24 hours. Subscribe again from any docs page to get a fresh link.',
  },
  server: {
    heading: 'Something went wrong',
    body: "We hit an error processing your confirmation. The subscribe team has been notified. Please try subscribing again in a few minutes.",
  },
};

const DEFAULT_COPY = {
  heading: "We couldn't confirm your subscription",
  body: "Try subscribing again from any docs page. If the problem persists, contact docs@openlm.com.",
};

export default function ConfirmError() {
  const isBrowser = useIsBrowser();
  const [copy, setCopy] = useState(DEFAULT_COPY);

  useEffect(() => {
    if (!isBrowser) return;
    const params = new URLSearchParams(window.location.search);
    const reason = params.get('reason');
    if (reason && REASON_COPY[reason]) setCopy(REASON_COPY[reason]);
  }, [isBrowser]);

  return (
    <Layout
      title={translate({
        id: 'subscribePage.confirmError.title',
        message: "We couldn't confirm your subscription",
      })}
      description={translate({
        id: 'subscribePage.confirmError.description',
        message: "Confirmation failed. Try subscribing again.",
      })}>
      <main className={styles.center}>
        <div className={styles.card}>
          <h1 className={styles.heading}>{copy.heading}</h1>
          <p className={styles.lede}>{copy.body}</p>
          <p>
            <Link to="/" className={styles.button}>
              {translate({
                id: 'subscribePage.confirmError.cta',
                message: "Back to the docs",
              })}
            </Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}
