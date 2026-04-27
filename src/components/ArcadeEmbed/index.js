import React from 'react';
import { translate } from '@docusaurus/Translate';

/**
 * ArcadeEmbed — renders an interactive Arcade demo with an accessible text
 * alternative for WCAG 1.2.1 (Audio-only / Video-only). The Arcade demo is
 * a visual product tour; users who cannot interact with the iframe (screen
 * reader users, keyboard-only users on some demos, users with no JavaScript)
 * need an equivalent description of what the demo shows.
 *
 * Usage:
 *   <ArcadeEmbed src="..." title="Short description" />
 *
 *   <ArcadeEmbed src="..." title="Short description">
 *     Written walkthrough describing the steps the demo covers.
 *   </ArcadeEmbed>
 *
 *   <ArcadeEmbed src="..." title="Short description" steps={[
 *     "Step 1 description",
 *     "Step 2 description",
 *   ]} />
 */
export function ArcadeEmbed({
  src,
  title,
  aspectRatio = '55.34591194968554%',
  linkLabel,
  steps,
  children,
}) {
  const resolvedTitle = title || translate({ message: 'Interactive demo' });
  const defaultLinkLabel = translate({ message: 'Open demo in a new tab' });
  const linkText = linkLabel || defaultLinkLabel;

  const alternativeLabel = translate({
    message: 'Prefer a text version of this demo?',
  });
  const alternativeSummary = translate({
    message: 'View written walkthrough',
  });
  const alternativeDefault = translate({
    message:
      "This interactive demo is a visual product tour. If you prefer a text version or use assistive technology that can't interact with the embed, the surrounding documentation section covers the same steps.",
  });

  const hasCustomAlternative = Boolean(children) || (Array.isArray(steps) && steps.length > 0);

  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: 'relative', paddingBottom: `calc(${aspectRatio} + 41px)`, height: 0, width: '100%' }}>
        <iframe
          src={src}
          title={resolvedTitle}
          frameBorder="0"
          loading="lazy"
          allowFullScreen
          allow="clipboard-write"
          aria-describedby="arcade-embed-alternative"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
        />
      </div>
      <figcaption style={{ marginTop: '0.75rem' }}>
        <a href={src} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </figcaption>
      <details
        id="arcade-embed-alternative"
        style={{
          marginTop: '0.75rem',
          padding: '0.5rem 0.75rem',
          borderLeft: '3px solid var(--rmk-color-border-contrast, #d1d5db)',
          background: 'var(--rmk-color-surface-alt, #f9fafb)',
          borderRadius: '4px',
          fontSize: '0.9rem',
        }}>
        <summary style={{ cursor: 'pointer', fontWeight: 500 }}>
          <span aria-hidden="true">{alternativeLabel} </span>
          {alternativeSummary}
        </summary>
        <div style={{ marginTop: '0.5rem' }}>
          {hasCustomAlternative ? (
            Array.isArray(steps) && steps.length > 0 ? (
              <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {steps.map((step, i) => (
                  <li key={i} style={{ marginBottom: '0.25rem' }}>{step}</li>
                ))}
              </ol>
            ) : (
              children
            )
          ) : (
            <p style={{ margin: 0 }}>{alternativeDefault}</p>
          )}
        </div>
      </details>
    </figure>
  );
}
