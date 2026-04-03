import React from 'react';
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
import CategoryPreviewCard from '@site/src/components/CategoryPreviewCard';
import DocLinkCard from '@site/src/components/DocLinkCard';
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

function DocCategoryGeneratedIndexPageContent({categoryGeneratedIndex}) {
  const category = useCurrentSidebarCategory();
  const filteredItems = filterDocCardListItems(category.items);

  const categories = filteredItems.filter(
    (item): item is PropSidebarItemCategory => item.type === 'category',
  );
  const links = filteredItems.filter(
    (item): item is PropSidebarItemLink => item.type === 'link',
  );

  return (
    <div className={styles.generatedIndexPage}>
      <DocVersionBanner />
      <DocBreadcrumbs />
      <DocVersionBadge />

      <header className={styles.header}>
        <Heading as="h1" className={styles.title}>
          {categoryGeneratedIndex.title}
        </Heading>
        {categoryGeneratedIndex.description && (
          <p className={styles.description}>
            {categoryGeneratedIndex.description}
          </p>
        )}
      </header>

      {categories.length > 0 && (
        <section className={styles.section}>
          <span className={styles.sectionLabel}>
            {translate({
              message: 'In this section',
              id: 'genindex.sectionLabel.categories',
              description: 'Label for the subcategories section on a generated index page',
            })}
          </span>
          <div className={styles.categoriesList}>
            {categories.map((item) => (
              <CategoryPreviewCard key={item.label} item={item} />
            ))}
          </div>
        </section>
      )}

      {links.length > 0 && (
        <section className={styles.section}>
          <span className={styles.sectionLabel}>
            {translate({
              message: 'Pages',
              id: 'genindex.sectionLabel.pages',
              description: 'Label for the doc pages section on a generated index page',
            })}
          </span>
          <div className={styles.linksGrid}>
            {links.map((item) => (
              <DocLinkCard key={item.href} item={item} />
            ))}
          </div>
        </section>
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
