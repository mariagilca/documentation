import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
  </svg>
);

export default function CopyPageButton() {
  const {siteConfig} = useDocusaurusContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('idle');
  const containerRef = useRef(null);

  const cleanPath = location.pathname.replace(/\/$/, '') || '/';
  const mdPath = cleanPath === '/' ? '/index.md' : `${cleanPath}.md`;
  const absoluteMdUrl = `${siteConfig.url.replace(/\/$/, '')}${mdPath}`;

  const prompt = translate(
    {
      id: 'copyPageButton.prompt',
      message: 'Read {url} so I can ask you questions about it.',
      description: 'Prompt sent to ChatGPT/Claude when opening a doc page in an LLM',
    },
    {url: absoluteMdUrl},
  );
  const chatgptUrl = `https://chatgpt.com/?hints=search&q=${encodeURIComponent(prompt)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleCopy = async () => {
    if (state === 'copying') return;
    setState('copying');
    try {
      const res = await fetch(mdPath);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setState('copied');
      setOpen(false);
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2500);
    }
  };

  const label =
    state === 'copied' ? translate({id: 'copyPageButton.copied', message: 'Copied'}) :
    state === 'error' ? translate({id: 'copyPageButton.failed', message: 'Failed'}) :
    state === 'copying' ? translate({id: 'copyPageButton.copying', message: 'Copying…'}) :
    translate({id: 'copyPageButton.copy', message: 'Copy page'});

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={clsx('button button--secondary button--sm', styles.mainButton)}
        onClick={handleCopy}
        aria-label={translate({id: 'copyPageButton.copyAriaLabel', message: 'Copy page as Markdown'})}
        disabled={state === 'copying'}>
        {state === 'copied' ? <CheckIcon /> : <SparkleIcon />}
        <span className={styles.label}>{label}</span>
      </button>
      <button
        type="button"
        className={clsx('button button--secondary button--sm', styles.dropdownToggle)}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={translate({id: 'copyPageButton.menuAriaLabel', message: 'More options for sharing this page with an LLM'})}>
        <ChevronIcon />
      </button>
      {open && (
        <div role="menu" className={styles.menu}>
          <button
            type="button"
            role="menuitem"
            className={styles.menuItem}
            onClick={handleCopy}>
            <CopyIcon />
            <span className={styles.menuLabel}>
              {translate({id: 'copyPageButton.copy', message: 'Copy page'})}
            </span>
          </button>
          <a
            role="menuitem"
            className={styles.menuItem}
            href={mdPath}
            target="_blank"
            rel="noreferrer">
            <ExternalIcon />
            <span className={styles.menuLabel}>
              {translate({id: 'copyPageButton.viewAsMarkdown', message: 'View as Markdown'})}
            </span>
          </a>
          <div className={styles.menuDivider} role="separator" />
          <a
            role="menuitem"
            className={styles.menuItem}
            href={chatgptUrl}
            target="_blank"
            rel="noreferrer">
            <SparkleIcon />
            <span className={styles.menuLabel}>
              {translate({id: 'copyPageButton.chatWithChatGPT', message: 'Chat with ChatGPT'})}
            </span>
          </a>
          <a
            role="menuitem"
            className={styles.menuItem}
            href={claudeUrl}
            target="_blank"
            rel="noreferrer">
            <SparkleIcon />
            <span className={styles.menuLabel}>
              {translate({id: 'copyPageButton.chatWithClaude', message: 'Chat with Claude'})}
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
