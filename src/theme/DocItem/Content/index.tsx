import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import {useLocation} from '@docusaurus/router';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import CopyPageButton from '@site/src/components/CopyPageButton';

function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

function CopyPageButtonAnchor() {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const article = node.closest('article');
    if (!article) return;
    const h1 = article.querySelector('h1');
    if (!h1 || !h1.parentNode) return;

    const existing = h1.parentElement as HTMLElement | null;
    if (existing?.dataset.copyButtonRow === 'true') {
      if (!existing.contains(node)) existing.appendChild(node);
      return;
    }

    const row = document.createElement('div');
    row.dataset.copyButtonRow = 'true';
    Object.assign(row.style, {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: '0.75rem',
      flexWrap: 'wrap',
      marginBottom: '1.25rem',
    } as Partial<CSSStyleDeclaration>);

    h1.parentNode.insertBefore(row, h1);
    row.appendChild(h1);
    Object.assign((h1 as HTMLElement).style, {
      marginBottom: '0',
      flex: '1 1 auto',
      minWidth: '0',
    } as Partial<CSSStyleDeclaration>);
    Object.assign(node.style, {
      marginBottom: '0',
      flexShrink: '0',
      transform: 'translateY(-0.15em)',
    } as Partial<CSSStyleDeclaration>);
    row.appendChild(node);
  }, [location.pathname, mounted]);

  if (!mounted) return null;
  return (
    <div ref={ref}>
      <CopyPageButton />
    </div>
  );
}

export default function DocItemContent({ children }: { children: React.ReactNode }) {
  const syntheticTitle = useSyntheticTitle();
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <CopyPageButtonAnchor />
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
