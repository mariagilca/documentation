import { translate } from '@docusaurus/Translate';

export function ArcadeEmbed({ src, title, aspectRatio = '55.34591194968554%', linkLabel }) {
  const resolvedTitle = title || translate({ message: 'Interactive demo' });
  const defaultLinkLabel = translate({ message: 'Open demo in a new tab' });
  const linkText = linkLabel || defaultLinkLabel;

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
          aria-hidden="true"
          tabIndex={-1}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
        />
      </div>
      <figcaption style={{ marginTop: '0.75rem' }}>
        <a href={src} target="_blank" rel="noopener noreferrer">
          {linkText}
        </a>
      </figcaption>
    </figure>
  );
}
