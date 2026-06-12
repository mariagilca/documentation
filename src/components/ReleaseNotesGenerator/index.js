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

// Each changelog page imports ONLY its own JSON (and its -ja twin) and passes
// it in via the `notes` / `notesJa` props:
//
//   import ReleaseNotesGenerator from '@site/src/components/ReleaseNotesGenerator';
//   import notes from '@site/static/release-notes/broker.json';
//   import notesJa from '@site/static/release-notes/broker-ja.json';
//
//   <ReleaseNotesGenerator noteKey="broker" notes={notes} notesJa={notesJa} />
//
// Content still renders server-side into the static HTML (crawler/LLM-safe).
// Keep the `noteKey` attribute: src/plugins/llm-markdown reads it to expand
// the changelog into the page's .md twin.
//
// This component previously used require.context to inline EVERY file in
// static/release-notes/ (116 JSON, EN+JA) into each page's chunk — ~567KB of
// other pages' data re-downloaded on every changelog page. Do not reintroduce
// a directory-wide require.context here.
function normalizeNotes(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.default)) return value.default;
  return [];
}

export default function ReleaseNotesGenerator({ noteKey, notes, notesJa }) {
  const {
    i18n: { currentLocale, defaultLocale },
  } = useDocusaurusContext();

  const localized = currentLocale !== defaultLocale ? normalizeNotes(notesJa) : [];
  const releaseNotes = localized.length ? localized : normalizeNotes(notes);

  if (!releaseNotes.length) {
    if (process.env.NODE_ENV === 'development' && noteKey && !notes) {
      console.warn(
        `[ReleaseNotesGenerator] "${noteKey}": no \`notes\` prop. ` +
          'Import the JSON in the MDX page and pass it in — see the comment in src/components/ReleaseNotesGenerator/index.js.',
      );
    }
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
