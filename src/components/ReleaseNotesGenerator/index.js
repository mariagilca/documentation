import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ReactMarkdown from 'react-markdown';
import styles from './index.module.css';

const changeTypes = [
  {
    name: 'updated',
    color: 'var(--rmk-color-release-updated)',
    label: 'Updated',
  },
  {
    name: 'added',
    color: 'var(--rmk-color-release-added)',
    label: 'Added',
  },
  {
    name: 'fixed',
    color: 'var(--rmk-color-release-fixed)',
    label: 'Fixed'
  },
  {
    name: 'removed',
    color: 'var(--rmk-color-release-removed)',
    label: 'Removed',
  },
  {
    name: 'improved',
    color: 'var(--rmk-color-release-improved)',
    label: 'Improved',
  },
];

// Bundle every release-notes JSON file at build time. This is what makes the
// changelog render server-side: the content is in the static HTML that search
// crawlers and LLM/RAG extractors read, instead of being fetched by JavaScript
// after page load (which left the page empty for any non-JS consumer).
// Keyed by file basename, e.g. "broker" and the localized "broker-ja".
const noteContext = require.context(
  '../../../static/release-notes',
  false,
  /\.json$/,
);

const NOTES_BY_KEY = noteContext.keys().reduce((acc, key) => {
  const base = key.replace(/^\.\//, '').replace(/\.json$/, '');
  const data = noteContext(key);
  acc[base] = Array.isArray(data) ? data : data?.default ?? [];
  return acc;
}, {});

function resolveNotes(noteKey, locale, defaultLocale) {
  if (!noteKey) return [];
  if (locale && locale !== defaultLocale) {
    const localized = NOTES_BY_KEY[`${noteKey}-${locale}`];
    if (localized) return localized;
  }
  return NOTES_BY_KEY[noteKey] ?? [];
}

export default function ReleaseNotesGenerator({ noteKey }) {
  const {
    i18n: { currentLocale, defaultLocale },
  } = useDocusaurusContext();

  const releaseNotes = resolveNotes(noteKey, currentLocale, defaultLocale);

  if (!releaseNotes.length) {
    return null;
  }

  return (
    <div className={styles['releaseContainer']}>
      {releaseNotes.map((releaseNote, rnIndex) => {
        return (
          <React.Fragment key={releaseNote.version ?? rnIndex}>
            <div className={styles['releaseTimeLine']}></div>
            <div className={styles['releaseNotesVersionDate']}>

              <div className={styles['releaseNotesVersion']} id={releaseNote.version}>{releaseNote.version}</div>
              <div className={styles['releaseNotesDate']}>
                {releaseNote.createdAt
                  ? new Date(releaseNote.createdAt * 1000).toLocaleDateString('en-US', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long',
                    })
                  : null}
              </div>

            </div>
            <div>

              <div>
                {changeTypes.map((changeType) => {
                  return releaseNote[changeType.name]?.length > 0 ? (
                    <React.Fragment key={changeType.name}>

                    <div className={styles['releaseNotesContainer']}>
                      <div
                        className={styles['releaseNoteType']}
                        key={changeType.name}
                        style={{
                          backgroundColor: changeType.color,
                          color: 'var(--rmk-color-text-inverse)',
                        }}
                      >
                        {changeType.label}
                      </div>

                      <div className={styles['releaseNoteTypeText']}>
                        {releaseNote[changeType.name].map((item, index) => (
                          <div className={styles['markdown-body']} key={index}>
                            {/* Content is bundled at build time (trusted source). react-markdown v10 still escapes raw HTML by default; keep it that way unless you add rehype-sanitize. */}
                            <ReactMarkdown>{item}</ReactMarkdown>
                          </div>

                        ))}
                      </div>
                      </div>

                    </React.Fragment>
                  ) : null
                })
                }
              </div>


            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
