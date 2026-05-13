/**
 * SubscribeButton — small utility button + modal for one-click subscribe.
 *
 * Mounted via the DocItem/Layout swizzle on every doc page (gated to
 * /cloud/ paths). Sits in the breadcrumb row alongside FocusModeToggle
 * and Copy page.
 *
 * Click → modal opens → user enters email → submit → "check your inbox."
 * No topic picker. The subscription is global: subscribers get notified
 * about every docs page change.
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const FUNCTIONS_BASE =
  'https://europe-west1-zoho-creator-dev.cloudfunctions.net';

type Status = 'idle' | 'submitting' | 'submitted' | 'error';

interface SubscribeButtonProps {
  /** Override the button's label. Default: "Follow". */
  label?: string;
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

export default function SubscribeButton({label}: SubscribeButtonProps = {}) {
  const isBrowser = useIsBrowser();
  const {i18n} = useDocusaurusContext();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const locale = i18n.currentLocale === 'ja' ? 'ja' : 'en';

  const openModal = useCallback(() => {
    setOpen(true);
    setStatus('idle');
    setError(null);
    requestAnimationFrame(() => {
      dialogRef.current?.showModal();
      requestAnimationFrame(() => emailInputRef.current?.focus());
    });
  }, []);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
    setOpen(false);
  }, []);

  const onDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) closeModal();
    },
    [closeModal],
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setError(
          translate({
            id: 'subscribeButton.error.badEmail',
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
              id: 'subscribeButton.error.submit',
              message: 'Something went wrong. Please try again in a moment.',
            }),
        );
      }
    },
    [email, locale],
  );

  if (!isBrowser) return null;

  const triggerLabel =
    label ??
    translate({
      id: 'subscribeButton.label',
      message: 'Subscribe',
    });

  const triggerIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  return (
    <>
      <button
        type="button"
        className={clsx('button button--secondary button--sm', styles.trigger)}
        onClick={openModal}>
        {triggerIcon}
        <span>{triggerLabel}</span>
      </button>

      {open ? (
        <dialog
          ref={dialogRef}
          className={styles.dialog}
          onClick={onDialogClick}
          onClose={() => setOpen(false)}
          aria-labelledby="subscribe-button-heading">
          <div className={styles.dialogBody}>
            <button
              type="button"
              className={styles.close}
              aria-label={translate({
                id: 'subscribeButton.close',
                message: 'Close',
              })}
              onClick={closeModal}>
              ×
            </button>

            {status === 'submitted' ? (
              <>
                <h2 id="subscribe-button-heading" className={styles.heading}>
                  {translate({
                    id: 'subscribeButton.success.title',
                    message: 'Check your inbox',
                  })}
                </h2>
                <p className={styles.body}>
                  {translate(
                    {
                      id: 'subscribeButton.success.body',
                      message:
                        "We've sent a confirmation link to {email}. Click it within 24 hours to start receiving updates.",
                    },
                    {email: email.trim()},
                  )}
                </p>
                <button
                  type="button"
                  className={styles.primary}
                  onClick={closeModal}>
                  {translate({
                    id: 'subscribeButton.success.close',
                    message: 'Close',
                  })}
                </button>
              </>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 id="subscribe-button-heading" className={styles.heading}>
                  {translate({
                    id: 'subscribeButton.heading',
                    message: 'Stay informed about OpenLM',
                  })}
                </h2>
                <p className={styles.body}>
                  {translate({
                    id: 'subscribeButton.body',
                    message:
                      "We'll email you when there's a new OpenLM release. One short email per release — no marketing, no noise.",
                  })}
                </p>

                <label className={styles.emailRow}>
                  <span className={styles.emailLabel}>
                    {translate({
                      id: 'subscribeButton.email.label',
                      message: 'Email',
                    })}
                  </span>
                  <input
                    ref={emailInputRef}
                    type="email"
                    className={styles.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
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
                    className={styles.primary}
                    disabled={status === 'submitting'}>
                    {status === 'submitting'
                      ? translate({
                          id: 'subscribeButton.cta.submitting',
                          message: 'Sending…',
                        })
                      : translate({
                          id: 'subscribeButton.cta',
                          message: 'Subscribe',
                        })}
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      ) : null}
    </>
  );
}
