import React, {useEffect, useState} from 'react';
import {useActivePlugin} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';

const contentCache: Record<string, string> = {};

export default function DeprecationBanner(): React.ReactNode {
  const activePlugin = useActivePlugin();
  const {
    siteConfig: {customFields, baseUrl},
    i18n: {currentLocale},
  } = useDocusaurusContext();

  const [content, setContent] = useState<string | null>(null);

  const pluginId = activePlugin?.pluginId;
  const bannerConfig =
    (customFields?.deprecationBanner as Record<string, {enabled: boolean}>) ??
    {};
  const isEnabled = pluginId ? bannerConfig[pluginId]?.enabled === true : false;

  useEffect(() => {
    if (!isEnabled || !pluginId) return;

    const locale = currentLocale || 'en';
    const cacheKey = `${pluginId}-${locale}`;

    if (contentCache[cacheKey]) {
      setContent(contentCache[cacheKey]);
      return;
    }

    let isActive = true;
    const controller = new AbortController();

    async function loadContent() {
      const fileName =
        locale === 'en' ? `${pluginId}.md` : `${pluginId}-${locale}.md`;
      const basePath = `${baseUrl}deprecation-banners`;

      const candidates =
        locale === 'en'
          ? [`${basePath}/${fileName}`]
          : [`${basePath}/${fileName}`, `${basePath}/${pluginId}.md`];

      for (const url of candidates) {
        try {
          const res = await fetch(url, {signal: controller.signal});
          if (!res.ok) {
            if (res.status === 404) continue;
            throw new Error(`Failed to load deprecation banner (${res.status})`);
          }
          const text = await res.text();
          if (isActive) {
            contentCache[cacheKey] = text;
            setContent(text);
          }
          return;
        } catch (e) {
          if ((e as Error).name === 'AbortError') return;
          continue;
        }
      }
    }

    loadContent();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [isEnabled, pluginId, currentLocale, baseUrl]);

  if (!isEnabled || !content) return null;

  return (
    <div className={styles.banner} role="status">
      <div className={styles.content}>
        {/* react-markdown v10 escapes raw HTML by default. Do NOT add `rehype-raw` here without also adding `rehype-sanitize` — the markdown is fetched at runtime and could be tampered with at the CDN. */}
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
