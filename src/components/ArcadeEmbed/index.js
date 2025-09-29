export function ArcadeEmbed({ src, title, aspectRatio = '55.34591194968554%' }) {
  return (
    <div style={{ position: 'relative', paddingBottom: `calc(${aspectRatio} + 41px)`, height: 0, width: '100%' }}>
      <iframe
        src={src}
        title={title}
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
      />
    </div>
  )
}
