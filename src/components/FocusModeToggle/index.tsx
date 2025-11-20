import React from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';

import {useFocusMode} from '../../context/focusMode';
import styles from './styles.module.css';

interface FocusModeToggleProps {
  className?: string;
}

export default function FocusModeToggle({className}: FocusModeToggleProps) {
  const {isFocusMode, toggleFocusMode} = useFocusMode();

  const indicatorOnMessage = translate({
    id: 'theme.focusMode.statusOn',
    message: 'On',
  });

  const indicatorOffMessage = translate({
    id: 'theme.focusMode.statusOff',
    message: 'Off',
  });

  return (
    <button
      type="button"
      className={clsx(
        'button button--secondary button--sm',
        styles.focusModeToggle,
        isFocusMode && styles.focusModeToggleActive,
        className,
      )}
      onClick={toggleFocusMode}
      aria-pressed={isFocusMode}>
      <span className={styles.focusModeLabel}>
        <Translate id="theme.focusMode.label">Focus Mode</Translate>
      </span>
      <span
        className={clsx(
          styles.focusModeIndicator,
          isFocusMode ? styles.focusModeIndicatorActive : styles.focusModeIndicatorInactive,
        )}
        aria-hidden="true">
        {isFocusMode ? indicatorOnMessage : indicatorOffMessage}
      </span>
    </button>
  );
}
