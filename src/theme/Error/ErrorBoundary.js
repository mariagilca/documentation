import React, { useEffect, useRef } from 'react';
import {translate} from '@docusaurus/Translate';

const RELOAD_FLAG = 'errorBoundaryAutoReloaded';

export default function ErrorBoundary({ error, resetError }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    // Guard against reload loops: only auto-reload once per tab session.
    let alreadyReloaded = false;
    try {
      alreadyReloaded = window.sessionStorage.getItem(RELOAD_FLAG) === '1';
    } catch {
      // sessionStorage may be unavailable (e.g. private browsing); skip auto-reload.
      alreadyReloaded = true;
    }

    if (alreadyReloaded) return undefined;

    timerRef.current = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(RELOAD_FLAG, '1');
      } catch {
        // ignore
      }
      window.location.reload();
    }, 4000);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleReloadNow = () => {
    if (typeof window === 'undefined') return;
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    window.location.reload();
  };

  return (
    <div
      role="alert"
      style={{
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'var(--rmk-font-family-base)',
        color: 'var(--rmk-color-text-body)',
      }}
    >
      <h1>{translate({message: 'This page needs to reload', id: 'error.page.reload'})}</h1>
      <p>
        {translate({message: 'We’re trying to reload the page for you. If nothing happens, click the button below.', id: 'error.page.reload.instruction'})}
      </p>
      <button
        type="button"
        onClick={handleReloadNow}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        {translate({message: 'Reload now', id: 'error.page.reload.button'})}
      </button>
      <p
        style={{
          marginTop: '1rem',
          fontSize: '0.9rem',
          color: 'var(--rmk-color-text-neutral)',
        }}
      >
        {translate({
          message: '(The issue is often related to baseUrl or deployment configuration.)',
          id: 'error.page.reload.note',
        })}
      </p>
    </div>
  );
}
