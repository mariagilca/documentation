import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

const MODAL_STORAGE_KEY = 'custom_modal_hide';

export default function CustomModal({
  header = "Welcome to OpenLM documentation",
  button1Text = "Acknowledge",
  button2Text = "Dimiss",
  onButton2Click,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hide = localStorage.getItem(MODAL_STORAGE_KEY);
    if (!hide) {
      setShow(true);
    }
  }, []);

  const handleButton1 = () => {
    localStorage.setItem(MODAL_STORAGE_KEY, '1');
    setShow(false);
  };

  const handleButton2 = () => {
    setShow(false);
    if (onButton2Click) onButton2Click();
  };

  if (!show) return null;

  return (
    <div className={styles['custom-modal-overlay']}>
      <div className={styles['custom-modal-container']}>
        <h2 className={styles['custom-modal-header']}>{header}</h2>

        <div className={styles['custom-modal-info-block']}>
          <p className={styles['custom-modal-info-header']}>Quick navigation tips:</p>

          <ul>
            <li>Use version selector from the right top corner to switch between <strong>Annapurna</strong> and <strong>Legacy</strong> documentation</li>
            <li>Search feature only works for <strong>Annapurna</strong> version documentation</li>
          </ul>
        </div>

        <div className={styles['custom-modal-buttons-row']}>
          <button className={styles['custom-modal-btn-secondary']} onClick={handleButton2}>{button2Text}</button>
          <button className={styles['custom-modal-btn-primary']} onClick={handleButton1}>{button1Text}</button>
        </div>
      </div>
    </div>
  );
}
