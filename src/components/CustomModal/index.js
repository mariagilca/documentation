import React, { useState, useEffect, useId, useRef, useCallback } from 'react';
import { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

const MODAL_STORAGE_KEY = 'custom_modal_hide';

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function readHideFlag() {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(MODAL_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeHideFlag() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(MODAL_STORAGE_KEY, '1');
  } catch {
    // localStorage may be unavailable (private mode, quota); modal will reappear next visit.
  }
}

export default function CustomModal({
  header,
  button1Text,
  button2Text,
  onButton2Click,
}) {
  const [show, setShow] = useState(false);
  const containerRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const titleId = useId();

  const headerText =
    header ?? translate({ id: 'customModal.header', message: 'Welcome to OpenLM documentation' });
  const button1Label =
    button1Text ?? translate({ id: 'customModal.button.acknowledge', message: 'Acknowledge' });
  const button2Label =
    button2Text ?? translate({ id: 'customModal.button.dismiss', message: 'Dismiss' });

  useEffect(() => {
    if (readHideFlag()) return;
    setShow(true);
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    if (onButton2Click) onButton2Click();
  }, [onButton2Click]);

  const acknowledge = useCallback(() => {
    writeHideFlag();
    setShow(false);
  }, []);

  // Focus management + Esc handling + focus trap, only while modal is open.
  useEffect(() => {
    if (!show || typeof document === 'undefined') return undefined;

    previouslyFocusedRef.current = document.activeElement;

    const container = containerRef.current;
    if (container) {
      const firstFocusable = container.querySelector(FOCUSABLE_SELECTORS);
      if (firstFocusable instanceof HTMLElement) {
        firstFocusable.focus();
      }
    }

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        dismiss();
        return;
      }
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusables = Array.from(
        containerRef.current.querySelectorAll(FOCUSABLE_SELECTORS),
      ).filter((el) => el instanceof HTMLElement && !el.hasAttribute('disabled'));
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
      const previous = previouslyFocusedRef.current;
      if (previous instanceof HTMLElement) {
        previous.focus();
      }
    };
  }, [show, dismiss]);

  if (!show) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      dismiss();
    }
  };

  return (
    <div
      className={styles['custom-modal-overlay']}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={containerRef}
        className={styles['custom-modal-container']}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className={styles['custom-modal-header']}>
          {headerText}
        </h2>

        <div className={styles['custom-modal-info-block']}>
          <p className={styles['custom-modal-info-header']}>
            {translate({
              id: 'customModal.tips.heading',
              message: 'Quick navigation tips:',
            })}
          </p>

          <ul>
            <li>
              <span className={styles['custom-modal-version-tip-desktop']}>
                {translate({
                  id: 'customModal.tips.versionSelector.desktop',
                  message:
                    'Use the version selector in the top right corner to switch between OpenLM Platform and Version 25 (legacy) documentation.',
                })}
              </span>
              <span className={styles['custom-modal-version-tip-mobile']}>
                {translate({
                  id: 'customModal.tips.versionSelector.mobile',
                  message:
                    'Use the version selector in the top left corner to switch between OpenLM Platform and Version 25 (legacy) documentation.',
                })}
              </span>
            </li>
            <li>
              {translate({
                id: 'customModal.tips.search',
                message: 'Search only works for the OpenLM Platform version of the documentation.',
              })}
            </li>
          </ul>
        </div>

        <div className={styles['custom-modal-buttons-row']}>
          <button
            type="button"
            className={styles['custom-modal-btn-secondary']}
            onClick={dismiss}
          >
            {button2Label}
          </button>
          <button
            type="button"
            className={styles['custom-modal-btn-primary']}
            onClick={acknowledge}
          >
            {button1Label}
          </button>
        </div>
      </div>
    </div>
  );
}
