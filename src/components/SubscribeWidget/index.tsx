/**
 * SubscribeWidget — email-only subscription to OpenLM docs updates.
 *
 * One email field. One submit button. No topic picker — the subscription
 * is global: subscribers get notified whenever any docs page is updated.
 *
 * Drop into any MDX page:
 *   import SubscribeWidget from '@site/src/components/SubscribeWidget';
 *   <SubscribeWidget />
 *
 * Talks to the `subscribe` Cloud Function in the `zoho-creator-dev`
 * Firebase project. After submit, the user receives a confirmation email
 * (handled by the function); this component just shows "Check your inbox."
 */

import React, {useCallback, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const FUNCTIONS_BASE =
  'https://europe-west1-zoho-creator-dev.cloudfunctions.net';

type Status = 'idle' | 'submitting' | 'submitted' | 'error';

interface SubscribeWidgetProps {
  /** Optional override for the heading text. */
  title?: string;
}

async function callSubscribe(email: string, locale: string): Promise<void> {
  const res = await fetch(`${FUNCTIONS_BASE}/subscribe`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({data: {email, locale}}),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok || payload.error) {
    throw new Error(
      payload?.error?.message ||
        payload?.error ||
        `Request failed (${res.status})`,
    );
  }
}

export default function SubscribeWidget({title}: SubscribeWidgetProps = {}) {
  const {i18n} = useDocusaurusContext();
  const locale = i18n.currentLocale === 'ja' ? 'ja' : 'en';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setError(
          translate({
            id: 'subscribe.error.badEmail',
            message: 'Please enter a valid email address.',
          }),
        );
        return;
      }
      setStatus('submitting');
      setError(null);
      try {
        await callSubscribe(trimmed, locale);
        setStatus('submitted');
      } catch (err: any) {
        setStatus('error');
        setError(
          err?.message ||
            translate({
              id: 'subscribe.error.submit',
              message: 'Something went wrong. Please try again in a moment.',
            }),
        );
      }
    },
    [email, locale],
  );

  if (status === 'submitted') {
    return (
      <div className={styles.widget}>
        <h3 className={styles.heading}>
          {translate({
            id: 'subscribe.success.title',
            message: 'Check your inbox',
          })}
        </h3>
        <p className={styles.success}>
          {translate(
            {
              id: 'subscribe.success.body',
              message:
                "We've sent a confirmation link to {email}. Click it within 24 hours to start receiving updates.",
            },
            {email: email.trim()},
          )}
        </p>
      </div>
    );
  }

  return (
    <form className={styles.widget} onSubmit={onSubmit} noValidate>
      <h3 className={styles.heading}>
        {title ??
          translate({
            id: 'subscribe.title',
            message: 'Stay informed about OpenLM',
          })}
      </h3>
      <p className={styles.subhead}>
        {translate({
          id: 'subscribe.subhead',
          message:
            "We'll email you when there's a new OpenLM release. One short email per release — no marketing, no noise. Unsubscribe with one click from any email.",
        })}
      </p>

      <label className={styles.emailRow}>
        <span className={styles.emailLabel}>
          {translate({id: 'subscribe.email.label', message: 'Email'})}
        </span>
        <input
          type="email"
          className={styles.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={translate({
            id: 'subscribe.email.placeholder',
            message: 'you@example.com',
          })}
          autoComplete="email"
          inputMode="email"
          required
          disabled={status === 'submitting'}
        />
      </label>

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submit}
          disabled={status === 'submitting'}>
          {status === 'submitting'
            ? translate({
                id: 'subscribe.cta.submitting',
                message: 'Sending…',
              })
            : translate({
                id: 'subscribe.cta',
                message: 'Subscribe',
              })}
        </button>
      </div>
    </form>
  );
}
