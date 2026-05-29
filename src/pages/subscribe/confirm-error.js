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

// Reason-specific copy wrapped in translate() so it works in JA as well as
// EN. The reason values come from the Cloud Function via ?reason= and map
// 1-to-1 to the entries below.
const REASON_COPY = {
  missing_token: {
    heading: translate({
      id: 'subscribePage.confirmError.reason.missingToken.heading',
      message: 'Missing confirmation token',
    }),
    body: translate({
      id: 'subscribePage.confirmError.reason.missingToken.body',
      message:
        "The link looks incomplete. Open it directly from the original email, or subscribe again.",
    }),
  },
  unknown_token: {
    heading: translate({
      id: 'subscribePage.confirmError.reason.unknownToken.heading',
      message: 'Link not recognised',
    }),
    body: translate({
      id: 'subscribePage.confirmError.reason.unknownToken.body',
      message:
        "This confirmation link doesn't match any pending subscription. The subscription request may have expired — subscribe again to get a fresh link.",
    }),
  },
  expired: {
    heading: translate({
      id: 'subscribePage.confirmError.reason.expired.heading',
      message: 'Link expired',
    }),
    body: translate({
      id: 'subscribePage.confirmError.reason.expired.body',
      message:
        'Confirmation links are valid for 24 hours. Subscribe again to get a fresh link.',
    }),
  },
  server: {
    heading: translate({
      id: 'subscribePage.confirmError.reason.server.heading',
      message: 'Something went wrong',
    }),
    body: translate({
      id: 'subscribePage.confirmError.reason.server.body',
      message:
        "We hit an error processing your confirmation. Please try again in a few minutes, or contact docs@openlm.com if the problem persists.",
    }),
  },
};

const DEFAULT_COPY = {
  heading: translate({
    id: 'subscribePage.confirmError.default.heading',
    message: "We couldn't confirm your subscription",
  }),
  body: translate({
    id: 'subscribePage.confirmError.default.body',
    message:
      'Try subscribing again. If the problem persists, contact docs@openlm.com.',
  }),
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
          <h1 className={styles.heading}>{copy.heading}</h1>
          <p className={styles.lede}>{copy.body}</p>
          <p className={styles.actions}>
            <Link to="/subscribe" className={styles.button}>
              {translate({
                id: 'subscribePage.confirmError.ctaRetry',
                message: "Subscribe again",
              })}
            </Link>
            <Link to="/" className={styles.buttonSecondary}>
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
