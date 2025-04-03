import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetch(`/documentation/release-notes/${noteKey}.json`)
      .then((response) => response.json())
      .then((result) => setReleaseNotes(result));
  }, [noteKey]);

  return (
    <div className={styles['releaseContainer']}>
      {releaseNotes.map((releaseNote) => {
        return (
          <>
            <div className={styles['releaseTimeLine']}></div>
            <div className={styles['releaseNotesVersionDate']}>

              <div className={styles['releaseNotesVersion']} id={releaseNote.version}>v{releaseNote.version}</div>
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