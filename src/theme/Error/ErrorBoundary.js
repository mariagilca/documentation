import React, { useEffect } from 'react';
import {translate} from '@docusaurus/Translate';

export default function ErrorBoundary({ error, resetError }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'var(--rmk-font-family-base)',
        color: 'var(--rmk-color-text-body)',
      }}
    >
      <h1>{translate({message: 'This page needs to reload', id: 'error.page.reload'})}</h1>
      <p>
        {translate({message: 'We’re trying to reload the page for you. If nothing happens, click here.', id: 'error.page.reload.instruction'})}
      </p>
      <p
        style={{
          marginTop: '1rem',
          fontSize: '0.9rem',
          color: 'var(--rmk-color-text-neutral)',
        }}
      >
        (The issue is often related to baseUrl or deployment configuration.)
      </p>
    </div>
  );
}
