import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

import { ServiceMapCta } from '@site/src/components/ServiceMapCta';
import { OPENLM_PLATFORM_NODES } from '@site/src/data/openlmPlatformGraph';

function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

function useServiceNodeForDoc() {
  const { metadata } = useDoc();
  const permalink = metadata.permalink ?? '';
  return OPENLM_PLATFORM_NODES.find((node) => node.href && permalink.endsWith(node.href));
}

export default function DocItemContent({ children }: { children: React.ReactNode }) {
  const syntheticTitle = useSyntheticTitle();
  const node = useServiceNodeForDoc();
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      
      <MDXContent>{children}</MDXContent>
    </div>
  );
}

