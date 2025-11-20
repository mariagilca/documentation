import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import {useFocusMode} from '../../../context/focusMode';
import FocusModeToggle from '../../../components/FocusModeToggle';
import styles from './styles.module.css';

function useDocTOC() {
  const {frontMatter, toc} = useDoc();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;
  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({children}: {children: React.ReactNode}) {
  const docTOC = useDocTOC();
  const {metadata} = useDoc();
  const {isFocusMode} = useFocusMode();
  const showDesktopToc = Boolean(docTOC.desktop);
  const showBreadcrumbs = !isFocusMode;

  return (
    <div className={clsx('row', styles.docItemRow, isFocusMode && styles.focusModeRow)}>
      <div
        className={clsx(
          'col',
          !docTOC.hidden && styles.docItemCol,
          styles.docContent,
          isFocusMode && styles.focusModeContent,
        )}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <div className={styles.breadcrumbRow}>
              {showBreadcrumbs && <DocBreadcrumbs />}
              <FocusModeToggle className={styles.focusModeToggle} />
            </div>
            <DocVersionBadge />
            {!isFocusMode && docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            {!isFocusMode && <DocItemFooter />}
          </article>
        </div>
      </div>
      {showDesktopToc && (
        <aside
          className={clsx(
            'col col--3',
            styles.docItemAside,
            isFocusMode && styles.focusModeToc,
          )}>
          {docTOC.desktop}
        </aside>
      )}
    </div>
  );
}
