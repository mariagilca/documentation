import React from 'react';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';

type BannerEntry = {enabled: boolean; content?: Record<string, string>};

/**
 * Renders the per-doc-set deprecation banner. The banner text is read
 * synchronously from `customFields.deprecationBanner` so it is emitted into the
 * static HTML at build time. This is intentional: search crawlers and LLM/RAG
 * text extractors read raw HTML and do not execute JavaScript, so a
 * client-fetched banner is invisible to them. Server-rendering the banner is
 * what makes the "this is the legacy product" signal reach AI tools.
 */
export default function DeprecationBanner(): React.ReactNode {
  const activePlugin = useActivePlugin();
  const {
    siteConfig: {customFields},
    i18n: {currentLocale, defaultLocale},
  } = useDocusaurusContext();

  const pluginId = activePlugin?.pluginId;
  const bannerConfig =
    (customFields?.deprecationBanner as Record<string, BannerEntry>) ?? {};
  const entry = pluginId ? bannerConfig[pluginId] : undefined;

  if (!entry?.enabled || !entry.content) return null;

  const content =
    entry.content[currentLocale] ??
    entry.content[defaultLocale] ??
    entry.content.en;

  if (!content) return null;

  return (
    <div className={styles.banner} role="status">
      <div className={styles.content}>
        <ReactMarkdown
          components={{
            p: ({children}) => <p className={styles.paragraph}>{children}</p>,
          }}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
