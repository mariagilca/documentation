import React, { useRef, useEffect } from 'react';
import styles from './index.module.css';

export default function DownloadCard({
  title,
  version,
  description,
  supportedOSVersions = [],
  downloadLinks = [],
  learnMoreLink,
  image
}) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = useRef(null);

  const handleDownloadClick = () => {
    if (downloadLinks.length === 1) {
      window.open(downloadLinks[0].link, '_blank');
    } else {
      setShowDropdown(prev => !prev);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className={styles['download-card']}>
      <div className={styles['icon-container']}>
        <img src={image} alt={`${title} icon`} className={styles['card-icon']} />
      </div>
      <div className={styles['card-body']}>
        <div className={styles['card-header']}>
          <h2 className={styles['card-title']}>{title}</h2>
          <span className={styles['card-version']}>v{version}</span>
          {supportedOSVersions.map((os, index) => (
            <span key={index} className={styles['os-tag']}>{os}</span>
          ))}
        </div>
        <p className={styles['card-description']}>{description}</p>
        <br />
        <div className={styles['card-footer']}>
          <div className={styles['dropdown-wrapper']} ref={dropdownRef}>
            <button
              className={styles['download-btn']}
              onClick={handleDownloadClick}
            >
              Download
            </button>
            {downloadLinks.length > 1 && showDropdown && (
              <ul className={styles['dropdown-menu']}>
                {downloadLinks.map((item, idx) => (
                  <li key={idx} className={styles['dropdown-item']}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg> {item.platformName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a
            className={styles['learn-more-link']}
            href={learnMoreLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more →
          </a>
        </div>
      </div>
    </div>
  );
}