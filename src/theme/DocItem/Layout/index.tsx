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
import DocItemPaginator from '@theme/DocItem/Paginator';
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

  // Fix 3: opt-in cross-product link on Platform pages that document a
  // component shared with Version 25 (e.g. Broker). Set `legacy_equivalent` in
  // the page's frontmatter to the legacy target path. Absent frontmatter →
  // nothing emitted.
  //
  // `legacy_equivalent` drives two independent outputs:
  //   1. A machine-readable <link rel="related"> in <head> (below), always
  //      emitted when the field is set. This is the crawlable/RAG-visible
  //      signal that ties this Platform page to its Version 25 equivalent even
  //      when the page is read in isolation.
  //   2. The visible ProductNotice banner, gated on `legacy_equivalent_notice`
  //      (defaults to true). Set `legacy_equivalent_notice: false` to keep the
  //      machine signal but drop the human-facing banner.
  // `legacy_equivalent_label` optionally overrides the banner link text.
  const legacyEquivalent =
    typeof frontMatter?.legacy_equivalent === 'string'
      ? frontMatter.legacy_equivalent
      : null;
  const legacyEquivalentLabel =
    typeof frontMatter?.legacy_equivalent_label === 'string'
      ? frontMatter.legacy_equivalent_label
      : undefined;
  const showLegacyNotice = frontMatter?.legacy_equivalent_notice !== false;

  // Advertise the clean Markdown twin emitted by src/plugins/llm-markdown so
  // crawlers/AI agents can discover it from the HTML page without already
  // knowing the ".md" convention. location.pathname already carries the docs
  // baseUrl; siteConfig.url is the bare origin.
  const siteUrl = (siteConfig.url ?? '').replace(/\/$/, '');
  const mdHref = `${siteUrl}${location.pathname.replace(/\/$/, '')}.md`;

  // Absolute URL for the Version 25 equivalent. `legacy_equivalent` is a docs
  // route without the site baseUrl (e.g. "/legacy/..."), so prepend baseUrl
  // and origin — the same shape as mdHref — to make the machine signal
  // unambiguous when a crawler or RAG chunk reads this page out of context.
  const legacyEquivalentHref = legacyEquivalent
    ? `${siteUrl}${baseUrl.replace(/\/$/, '')}${legacyEquivalent}`
    : null;

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
          {legacyEquivalentHref && (
            <link
              rel="related"
              href={legacyEquivalentHref}
              title="OpenLM Version 25 (legacy) equivalent"
            />
          )}
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
            {!isFocusMode && isPlatform && legacyEquivalent && showLegacyNotice && (
              <ProductNotice to={legacyEquivalent} label={legacyEquivalentLabel} />
            )}
            {!isFocusMode && docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            {!isFocusMode && <DocItemFooter />}
          </article>
          {/* Stock DocItem/Layout renders the prev/next paginator; it was
              dropped when this file was swizzled for focus mode. Restored as
              the reading flow's page-turn, hidden in focus mode like the
              footer. */}
          {!isFocusMode && <DocItemPaginator />}
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
