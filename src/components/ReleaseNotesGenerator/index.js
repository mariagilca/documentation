import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ReactMarkdown from 'react-markdown';
import styles from './index.module.css';

const changeTypes = [
  {
    name: 'updated',
    color: '#6c5ce7',
    label: 'Updated',
  },
  {
    name: 'added',
    color: '#00b894',
    label: 'Added',
  },
  {
    name: 'fixed',
    color: '#0984e3',
    label: 'Fixed'
  },
  {
    name: 'removed',
    color: '#f44336',
    label: 'Removed',
  },
  {
    name: 'improved',
    color: '#be2edd',
    label: 'Improved',
  },
];

export default function ReleaseNotesGenerator({ noteKey }) {
  const [releaseNotes, setReleaseNotes] = useState([]);
  const [error, setError] = useState(null);
  const { i18n: { currentLocale } } = useDocusaurusContext();

  useEffect(() => {
    if (!noteKey) return;
    let isActive = true;
    const controller = new AbortController();

    async function loadReleaseNotes() {
      setError(null);
      setReleaseNotes([]);
      const locale = currentLocale || 'en';
      const fileName = locale === 'en' ? `${noteKey}.json` : `${noteKey}-${locale}.json`;
      const basePath = locale === 'en' ? '/documentation/release-notes' : `/documentation/${locale}/release-notes`;

      console.log(`Loading release notes from ${basePath}/${fileName}`);
      // Try localized file first (if not EN), then fallback to EN.
      const candidateUrls = locale === 'en'
        ? [`${basePath}/${fileName}`]
        : [`${basePath}/${fileName}`, `${basePath}/${noteKey}.json`];

      for (const url of candidateUrls) {
        try {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) {
            if (res.status === 404) continue; // try next candidate
            throw new Error(`Failed loading release notes (${res.status})`);
          }
            const data = await res.json();
            if (isActive) setReleaseNotes(data);
            return;
        } catch (e) {
          if (e.name === 'AbortError') return; // component unmounted
          // Only set error after exhausting candidates
          continue;
        }
      }
      if (isActive) setError('Release notes not found.');
    }

    loadReleaseNotes();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [noteKey, currentLocale]);

  return (
    <div className={styles['releaseContainer']}>
      {error && (
        <div style={{ color: 'var(--ifm-color-danger)', marginBottom: '1rem' }}>{error}</div>
      )}
      {releaseNotes.map((releaseNote) => {
        return (
          <>
            <div className={styles['releaseTimeLine']}></div>
            <div className={styles['releaseNotesVersionDate']}>

              <div className={styles['releaseNotesVersion']} id={releaseNote.version}>{releaseNote.version}</div>
              <div className={styles['releaseNotesDate']}>
                {new Date(releaseNote.createdAt * 1000).toLocaleDateString('en-US', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'long',
                })}
              </div>

            </div>
            <div>

              <div>
                {changeTypes.map((changeType) => {
                  return releaseNote[changeType.name]?.length > 0 ? (
                    <React.Fragment key={changeType.name}>

                    <div className={styles['releaseNotesContainer']}>
                      <div className={styles['releaseNoteType']} 
                          key={changeType.name} style={{
                        backgroundColor: changeType.color,
                        color: 'white',
                      }}>{changeType.label}
                      </div>

                      <div className={styles['releaseNoteTypeText']}>
                        {releaseNote[changeType.name].map((item, index) => (
                          <div className={styles['markdown-body']} key={index}>
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
          </>
        );
      })}
    </div>
  );
}