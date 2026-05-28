import React from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc, useActivePlugin} from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
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
import DeprecationBanner from '../../../components/DeprecationBanner';
import SubscribeButton from '../../../components/SubscribeButton';
import styles from './styles.module.css';

// SubscribeButton surfaces on every /cloud/ doc page. /legacy/ is in
// maintenance mode and doesn't get the follow affordance. Strip the
// docs site baseUrl before checking the path prefix.
function isSubscribablePath(pathname: string, baseUrl: string): boolean {
  const base = baseUrl.replace(/\/$/, '');
  const p = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return p.startsWith('/cloud/') || p === '/cloud';
}

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
  const location = useLocation();
  const baseUrl = useBaseUrl('/');
  const {siteConfig} = useDocusaurusContext();
  const activePlugin = useActivePlugin();
  const showDesktopToc = Boolean(docTOC.desktop);
  const showBreadcrumbs = !isFocusMode;
  const showSubscribe =
    !isFocusMode && isSubscribablePath(location.pathname, baseUrl);

  // Legacy doc pages carry a version signal that survives crawling and RAG
  // chunking: a `doc-version` meta tag plus a "Version 25:" <title> prefix, so
  // AI tools can tell legacy (v25/v26) content apart from OpenLM Platform.
  const isLegacy = activePlugin?.pluginId === 'legacy';
  const titleDelimiter = siteConfig.titleDelimiter ?? '|';
  const legacyTitle =
    isLegacy && metadata.title
      ? `Version 25: ${metadata.title} ${titleDelimiter} ${siteConfig.title}`
      : null;

  return (
    <div className={clsx('row', styles.docItemRow, isFocusMode && styles.focusModeRow)}>
      {isLegacy && (
        <Head>
          <meta name="doc-version" content="v25-legacy" />
          <meta
            name="doc-product"
            content="OpenLM Version 25 / v26 (legacy)"
          />
          {legacyTitle && <title>{legacyTitle}</title>}
        </Head>
      )}
      <div
        className={clsx(
          'col',
          !docTOC.hidden && styles.docItemCol,
          styles.docContent,
          isFocusMode && styles.focusModeContent,
        )}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <DeprecationBanner />
        <div className={styles.docItemContainer}>
          <article>
            <div className={styles.breadcrumbRow}>
              {showBreadcrumbs && <DocBreadcrumbs />}
              <div className={styles.utilityCluster}>
                {showSubscribe && <SubscribeButton />}
                <FocusModeToggle />
              </div>
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
