import React, {useCallback, useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import styles from './styles.module.css';
import {FocusModeContext} from '../../../context/focusMode';

export default function DocRootLayout({children}: {children: React.ReactNode}) {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const setFocusMode = useCallback((value: boolean) => {
    setIsFocusMode(value);
  }, []);

  const toggleFocusMode = useCallback(() => {
    setIsFocusMode((value) => !value);
  }, []);

  const focusModeValue = useMemo(
    () => ({
      isFocusMode,
      toggleFocusMode,
      setFocusMode,
    }),
    [isFocusMode, toggleFocusMode, setFocusMode],
  );

  const effectiveHiddenSidebar = hiddenSidebarContainer || isFocusMode;

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const body = document.body;
    const focusClass = 'docs-focus-mode';
    const hiddenClass = 'docs-focus-hidden';
    const hiddenSelectors = [
      'header.navbar',
      '.navbar',
      '.navbar__placeholder',
      'footer.theme-layout-footer',
      '.theme-layout-footer',
    ];
    const elementsToHide = hiddenSelectors.reduce<HTMLElement[]>((elements, selector) => {
      elements.push(...Array.from(document.querySelectorAll<HTMLElement>(selector)));
      return elements;
    }, []);

    if (isFocusMode) {
      body.classList.add(focusClass);
      elementsToHide.forEach((element) => {
        element.classList.add(hiddenClass);
      });
    } else {
      body.classList.remove(focusClass);
      elementsToHide.forEach((element) => {
        element.classList.remove(hiddenClass);
      });
    }

    return () => {
      body.classList.remove(focusClass);
      elementsToHide.forEach((element) => {
        element.classList.remove(hiddenClass);
      });
    };
  }, [isFocusMode]);

  return (
    <FocusModeContext.Provider value={focusModeValue}>
      <div className={clsx(styles.docsWrapper, isFocusMode && styles.focusModeWrapper)}>
        <BackToTopButton />
        <div className={clsx(styles.docRoot, isFocusMode && styles.focusModeRoot)}>
          {sidebar && !isFocusMode && (
            <DocRootLayoutSidebar
              sidebar={sidebar.items}
              hiddenSidebarContainer={effectiveHiddenSidebar}
              setHiddenSidebarContainer={setHiddenSidebarContainer}
            />
          )}
          <DocRootLayoutMain
            hiddenSidebarContainer={effectiveHiddenSidebar}
            isFocusMode={isFocusMode}>
            {children}
          </DocRootLayoutMain>
        </div>
      </div>
    </FocusModeContext.Provider>
  );
}
