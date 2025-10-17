import React from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

export default function DocRootLayoutMain({
  hiddenSidebarContainer,
  isFocusMode,
  children,
}: {
  hiddenSidebarContainer: boolean;
  isFocusMode: boolean;
  children: React.ReactNode;
}) {
  const sidebar = useDocsSidebar();

  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
        isFocusMode && styles.focusModeMain,
      )}>
      <div
        className={clsx(
          'container padding-top--md padding-bottom--lg',
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced,
          isFocusMode && styles.focusModeWrapper,
        )}>
        {children}
      </div>
    </main>
  );
}
