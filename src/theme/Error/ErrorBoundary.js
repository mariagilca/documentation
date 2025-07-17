import React, { useEffect } from 'react';

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
        fontFamily: 'sans-serif',
        color: '#333',
      }}
    >
      <h1>This page needs to reaload</h1>
      <p>
        We’re trying to reload the page for you. If nothing happens,{' '}
        <a href={window.location.href}>click here</a>.
      </p>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        (The issue is often related to baseUrl or deployment configuration.)
      </p>
    </div>
  );
}