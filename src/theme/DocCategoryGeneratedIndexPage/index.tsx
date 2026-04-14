import React, {useCallback, useState} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useCurrentSidebarCategory} from '@docusaurus/plugin-content-docs/client';
import {filterDocCardListItems} from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {translate} from '@docusaurus/Translate';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Heading from '@theme/Heading';
import CategoryListItem from '@site/src/components/CategoryListItem';
import DocListItem from '@site/src/components/DocListItem';
import type {PropSidebarItemCategory, PropSidebarItemLink} from '@docusaurus/plugin-content-docs';
import styles from './styles.module.css';

function DocCategoryGeneratedIndexPageMetadata({categoryGeneratedIndex}) {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function CopyPageLink() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, []);

  return (
    <button
      type="button"
      className={styles.copyPageBtn}
      onClick={handleCopy}
      aria-label={translate({
        message: 'Copy link to this page',
        id: 'genindex.copyPageLink',
        description: 'Aria label for copy page link button',
      })}
      title={copied ? 'Copied!' : 'Copy link to this page'}>
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>Copy link</span>
        </>
      )}
    </button>
  );
}

function DocCategoryGeneratedIndexPageContent({categoryGeneratedIndex}) {
  const category = useCurrentSidebarCategory();
  const filteredItems = filterDocCardListItems(category.items);

  return (
    <div className={styles.generatedIndexPage}>
      <DocVersionBanner />
      <DocBreadcrumbs />
      <DocVersionBadge />

      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Heading as="h1" className={styles.title}>
            {categoryGeneratedIndex.title}
          </Heading>
          <CopyPageLink />
        </div>
        {categoryGeneratedIndex.description && (
          <p className={styles.description}>
            {categoryGeneratedIndex.description}
          </p>
        )}
      </header>

      {filteredItems.length > 0 && (
        <div className={styles.list}>
          {filteredItems.map((item) =>
            item.type === 'category' ? (
              <CategoryListItem key={item.label} item={item as PropSidebarItemCategory} />
            ) : (
              <DocListItem key={(item as PropSidebarItemLink).href} item={item as PropSidebarItemLink} />
            ),
          )}
        </div>
      )}

      <footer className="margin-top--md">
        <DocPaginator
          previous={categoryGeneratedIndex.navigation.previous}
          next={categoryGeneratedIndex.navigation.next}
        />
      </footer>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props) {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
