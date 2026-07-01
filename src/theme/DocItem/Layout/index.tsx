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
import SubscribeButton from '../../../components/SubscribeButton';
import ProductNotice from '../../../components/ProductNotice';
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
  const {metadata, frontMatter} = useDoc();
  const {isFocusMode} = useFocusMode();
  const location = useLocation();
  const baseUrl = useBaseUrl('/');
  const {siteConfig} = useDocusaurusContext();
  const activePlugin = useActivePlugin();
  const showDesktopToc = Boolean(docTOC.desktop);
  const showBreadcrumbs = !isFocusMode;
  const showSubscribe =
    !isFocusMode && isSubscribablePath(location.pathname, baseUrl);

  // Both product lines stamp a machine-readable product signal that survives
  // crawling and RAG chunking, so AI tools can tell legacy (v25/v26) content
  // apart from OpenLM Platform even when reading a single page in isolation.
  // Legacy also gets a "Version 25:" <title> prefix. Keeping the signal
  // symmetric (Platform stamped too, not only legacy) means an unstamped page
  // is never read as ambiguous by default — see the disambiguation strategy,
  // Fix 2. The two doc plugins are the only ones rendered through DocItem.
  const isLegacy = activePlugin?.pluginId === 'legacy';
  const isPlatform = activePlugin?.pluginId === 'cloud';
  const titleDelimiter = siteConfig.titleDelimiter ?? '|';
  const legacyTitle =
    isLegacy && metadata.title
      ? `Version 25: ${metadata.title} ${titleDelimiter} ${siteConfig.title}`
      : null;

  // Fix 3: opt-in cross-product notice on Platform pages that document a
  // component shared with Version 25 (e.g. Broker). Set `legacy_equivalent` in
  // the page's frontmatter to the legacy target path; `legacy_equivalent_label`
  // optionally overrides the link text. Absent frontmatter → no notice.
  const legacyEquivalent =
    typeof frontMatter?.legacy_equivalent === 'string'
      ? frontMatter.legacy_equivalent
      : null;
  const legacyEquivalentLabel =
    typeof frontMatter?.legacy_equivalent_label === 'string'
      ? frontMatter.legacy_equivalent_label
      : undefined;

  // Advertise the clean Markdown twin emitted by src/plugins/llm-markdown so
  // crawlers/AI agents can discover it from the HTML page without already
  // knowing the ".md" convention. location.pathname already carries the docs
  // baseUrl; siteConfig.url is the bare origin.
  const siteUrl = (siteConfig.url ?? '').replace(/\/$/, '');
  const mdHref = `${siteUrl}${location.pathname.replace(/\/$/, '')}.md`;

  return (
    <div className={clsx('row', styles.docItemRow, isFocusMode && styles.focusModeRow)}>
      <Head>
        <link rel="alternate" type="text/markdown" href={mdHref} />
      </Head>
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
      {isPlatform && (
        <Head>
          <meta name="doc-version" content="platform-current" />
          <meta name="doc-product" content="OpenLM Platform" />
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
            {!isFocusMode && isPlatform && legacyEquivalent && (
              <ProductNotice to={legacyEquivalent} label={legacyEquivalentLabel} />
            )}
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
