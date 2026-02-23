import React, {useState} from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import styles from './styles.module.css';
import {useFocusMode} from '../../../context/focusMode';

export default function DocRootLayout({children}: {children: React.ReactNode}) {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const {isFocusMode} = useFocusMode();
  const effectiveHiddenSidebar = hiddenSidebarContainer || isFocusMode;

  return (
    <div className={clsx(styles.docsWrapper, isFocusMode && styles.focusModeWrapper)}>
      <div className={clsx(styles.docRoot, isFocusMode && styles.focusModeRoot)}>
        {sidebar && !isFocusMode && (
          <DocRootLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={effectiveHiddenSidebar}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <DocRootLayoutMain hiddenSidebarContainer={effectiveHiddenSidebar} isFocusMode={isFocusMode}>
          {children}
        </DocRootLayoutMain>
      </div>
      <BackToTopButton />
    </div>
  );
}
