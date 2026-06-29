// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Announcement bar visibility window.
//
// Edit ANNOUNCEMENT_RELEASE_DATE to your release date and
// ANNOUNCEMENT_VISIBILITY_DAYS to control how long the banner is visible.
// The banner only shows between release date and release date + window;
// dates before the release date are excluded so banners staged in advance
// do not leak.
const ANNOUNCEMENT_RELEASE_DATE = new Date('2026-06-25'); // Set this to your release date
const ANNOUNCEMENT_VISIBILITY_DAYS = 30;                  // How many days to keep the banner up
const isAnnouncementActive = () => {
  const now = new Date();
  const daysSinceRelease = Math.floor((now.getTime() - ANNOUNCEMENT_RELEASE_DATE.getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceRelease >= 0 && daysSinceRelease <= ANNOUNCEMENT_VISIBILITY_DAYS;
};

/** @type {import('@docusaurus/types').Config} */
const meta = {
  title: 'OpenLM Documentation',
  tagline: 'Stretch your licenses to their limit!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://openlm.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/documentation/',
  baseUrlIssueBanner: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // Used only by the `docusaurus deploy` GitHub-Pages flow, which this repo
  // doesn't use (CI deploys via rsync). Kept for completeness.
  organizationName: 'openlm',
  projectName: 'documentation',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'ignore',

  // Baseline security meta tags. Note: `Content-Security-Policy` and
  // `frame-ancestors` cannot be set via <meta> reliably — those should
  // be applied at the nginx/CDN layer in front of /documentation/.
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'X-Content-Type-Options',
        content: 'nosniff',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'referrer',
        content: 'strict-origin-when-cross-origin',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'Permissions-Policy',
        content: 'camera=(), microphone=(), geolocation=(), payment=()',
      },
    },
  ],

  // mermaid support
  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
  },
};

/** @type {import('@docusaurus/plugin-content-docs').Options[]} */
const docs = [
  {
    id: 'cloud',
    path: 'docs/cloud',
    routeBasePath: '/cloud',
    sidebarPath: require.resolve('./sidebars-cloud.js'),
    lastVersion: 'current',
    versions: {
      current: {
        label: 'OpenLM Platform',
      },
    },
  },
  {
    id: 'legacy',
    path: 'docs/legacy',
    routeBasePath: '/legacy',
    lastVersion: 'current',
    versions: {
      current: {
        // One compound label everywhere the legacy product is named in the UI
        // (navbar, version dropdown, search filter, llms.txt section). The
        // product previously surfaced under four different names.
        label: 'Version 25 (Legacy)',
      },
    },
  },

];

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const defaultSettings = {
  breadcrumbs: true,
  showLastUpdateTime: true,
  sidebarCollapsible: true,
  showLastUpdateAuthor: true,
  admonitions: {
    keywords: ['note', 'tip', 'info', 'warning', 'danger', 'discontinued'],
  },
};

/**
 * Create a section
 * @param {import('@docusaurus/plugin-content-docs').Options} options
 */
function create_doc_plugin({
  sidebarPath = require.resolve('./sidebars-default.js'),
  ...options
}) {
  return [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      ...defaultSettings,
      sidebarPath,
      ...options,
    }),
  ];
};

const docs_plugins = docs.map((doc) => create_doc_plugin(doc));

function silenceVscodeLanguageserverTypesWarning() {
  return {
    name: 'silence-vscode-languageserver-types-warning',
    configureWebpack() {
      return {
        ignoreWarnings: [
          (warning) =>
            warning?.module?.resource?.includes(
              'vscode-languageserver-types',
            ) &&
            /Critical dependency: require function is used in a way/.test(
              warning?.message ?? '',
            ),
        ],
      };
    },
  };
}

const plugins = [
  ...docs_plugins,
  silenceVscodeLanguageserverTypesWarning,
  [
    require.resolve('./src/plugins/reading-time'),
    {
      docsDirectories: docs.map((d) => ({path: d.path, id: d.id})),
    },
  ],
  [
    require.resolve('./src/plugins/last-updated'),
    {
      docsDirectories: docs.map((d) => ({path: d.path, id: d.id})),
    },
  ],
  [
    require.resolve('./src/plugins/llm-markdown'),
    {
      docsDirectories: docs.map((d) => ({
        path: d.path,
        id: d.id,
        routeBasePath: d.routeBasePath,
        label: d.versions?.current?.label || d.id,
      })),
    },
  ],
  [
    '@docusaurus/plugin-client-redirects',
    {
      redirects: [
        // License Parser changelog migrated from legacy to the platform (June 2026)
        { from: '/legacy/changelog/license-parser', to: '/cloud/changelog/cloud/license-parser' },
        // understanding-openlm pages moved into get-started
        { from: '/cloud/understanding-openlm/intro', to: '/cloud/getting-started/what-is-openlm' },
        { from: '/cloud/understanding-openlm/architecture', to: '/cloud/getting-started/architecture' },
        { from: '/cloud/understanding-openlm/glossary', to: '/cloud/glossary' },
        { from: '/cloud/understanding-openlm/list-of-services', to: '/cloud/service-index' },
        { from: '/cloud/getting-started/glossary', to: '/cloud/glossary' },
        { from: '/cloud/getting-started/service-index', to: '/cloud/service-index' },
        { from: '/cloud/understanding-openlm/workstation-agent-features', to: '/cloud/for-end-users/workstation-agent' },
        { from: '/cloud/understanding-openlm/system-requirements', to: '/cloud/deployment-operations/system-requirements' },
        { from: '/cloud/install/components_installation', to: '/cloud/deployment-operations/components-installation' },
        // Old quick-start-guide URL now redirects to prerequisites (guide was split into discrete pages)
        { from: '/cloud/getting-started/available_installation_methods', to: '/cloud/getting-started/prerequisites' },
        { from: '/cloud/getting-started/quick-start-guide', to: '/cloud/getting-started/prerequisites' },
        // Process Manager moved from Data Collection to Automations
        { from: '/cloud/data-collection/process-manager', to: '/cloud/automations/process-manager' },
        // Top-level /changelog hub deleted — point at the cloud Changelog category index.
        { from: '/changelog', to: '/cloud/category/changelog' },
        // Guessable doc-set roots. Neither doc set has a doc at its route
        // base, so /cloud and /legacy 404ed for anyone editing the URL bar.
        { from: '/cloud', to: '/cloud/getting-started/what-is-openlm' },
        { from: '/legacy', to: '/legacy/intro' },
        // Legacy KB article migrated into the docs site
        {
          from: [
            '/legacy/knowledge-base/openlm-database-optimal-configuration',
            '/knowledge-base/openlm-database-optimal-configuration',
          ],
          to: '/legacy/openlm-database-optimal-configuration',
        },
        // NOTE: ArcGIS Online used to be a section anchor inside amp.mdx
        // (#arcgis-online). It now has its own page at /engineering-lms/arcgis-online.
        // The plugin-client-redirects schema does not accept hash fragments in `from`,
        // so anchor-only links resolve to amp.mdx and silently miss the section. Update
        // inbound links to point at the new arcgis-online page directly.
      ],
      createRedirects(existingPath) {
        const redirects = [];
        // Redirect old /cloud/services/* paths to new /cloud/* paths
        if (existingPath.match(/^\/cloud\/(automations|data-collection|integrations|openlm-administration|slm|users|compliance|dongle-monitoring|lfm|sam|vlm)(\/|$)/)) {
          redirects.push(existingPath.replace(/^\/cloud\//, '/cloud/services/'));
        }
        // Redirect old interfacing-lms paths to connect-license-managers (now under data-collection)
        if (existingPath.startsWith('/cloud/data-collection/connect-license-managers/')) {
          redirects.push(
            existingPath.replace(
              '/cloud/data-collection/connect-license-managers/',
              '/cloud/data-collection/interfacing-lms/'
            ),
          );
          // Also redirect from the old getting-started location
          redirects.push(
            existingPath.replace(
              '/cloud/data-collection/connect-license-managers/',
              '/cloud/getting-started/connect-license-managers/'
            ),
          );
        }
        return redirects.length > 0 ? redirects : undefined;
      },
    },
  ],
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  ...meta,
  future: {
    v4: true,
  },
  // navbarScroll: toggles data-homepage / data-nav-scrolled on <html> to drive
  // the homepage navbar's scroll-reveal pill (see src/css/custom.css).
  // printDetails: force-opens collapsed <details> while printing (pairs with
  // the @media print block in src/css/custom.css).
  clientModules: [
    './src/clientModules/navbarScroll.js',
    './src/clientModules/printDetails.js',
  ],
  customFields: {
    deprecationBanner: {
      legacy: {
        enabled: true,
        // Rendered server-side into static HTML so crawlers and LLM/RAG
        // extractors (which don't run JS) see the legacy/version signal.
        content: {
          en:
            '*OpenLM Version 25 / v26 (Legacy)* is nearing end of life. Security and bug fixes are available until *March 31, 2027*. Technical support ends *December 31, 2027*.\n\n> This page documents OpenLM legacy (v25/v26), not OpenLM Platform. We recommend [migrating to the OpenLM Platform](/documentation/cloud/getting-started/what-is-openlm) for the latest features and continued support.',
          ja:
            '*OpenLM Version 25 / v26（レガシー）* はサポート終了が近づいています。セキュリティおよびバグ修正は *2027年3月31日* まで提供されます。テクニカルサポートは *2027年12月31日* に終了します。\n\n> このページは OpenLM Platform ではなく OpenLM レガシー (v25/v26) について説明しています。最新の機能と継続的なサポートのため、[OpenLM Platform への移行](/documentation/ja/cloud/getting-started/what-is-openlm)をお勧めします。',
        },
      },
    },
  },
  plugins,
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        sitemap: {
          // Emit <lastmod> from each doc's git-based last update so search
          // crawlers and AI fetchers can prioritize recently changed pages.
          // (showLastUpdateTime is enabled on both doc sets, which is what
          // supplies the per-route date the sitemap reads.)
          lastmod: 'date',
          // Legacy tag pages are thin auto-generated listings with no inbound
          // links — keep them out of the sitemap (EN and /ja/ alike). Cloud tag
          // pages stay: their vocabulary is curated in docs/cloud/tags.yml.
          ignorePatterns: ['/**/legacy/tags', '/**/legacy/tags/**'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      mermaid: {
        // Mermaid diagram theming
        // Use a neutral light theme and a dark base; override key palette tokens
        theme: { light: 'neutral', dark: 'dark' },
        options: {
          fontFamily: 'Atkinson Hyperlegible, system-ui, -apple-system, Segoe UI, sans-serif',
          themeVariables: {
            background: 'transparent',
            primaryColor: '#155fa0',
            primaryBorderColor: '#0b4d88',
            primaryTextColor: '#ffffff',
            lineColor: '#155fa0',
            secondaryColor: '#f3f4f6',
            tertiaryColor: '#e2e8f0',
            textColor: '#0b1220',
            clusterBkg: '#f9fafb',
            clusterBorder: '#d1d5db',
            nodeBorder: '#d1d5db',
          },
        },
      },
      algolia: {
        appId: 'LEM01HQWDQ',
        apiKey: '0b4b6fbb19f766c26c2b803a072a5dcf',
  
        indexName: 'openlm',
        
        // Add askAi parameter for AI-powered search
        //askAi: 'AIZqal0ZHUKH', //Gemini
        askAi: 'EYvPQmAxNGez', //openai
  
        // Optional: see doc section below
        contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },
        searchParameters: {},
        searchPagePath: 'search',
        insights: true,
      },  
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      // Social card. Must be a real 1200×630 raster: the previous value
      // reused the 468×76 transparent navbar wordmark, which X rejects for
      // summary_large_image and which disappears on dark Slack/Teams.
      image: 'img/openlm-social-card.png',
      navbar: {
        title: '',
        logo: {
          alt: 'OpenLM Documentation',
          src: 'img/openlm-docs.png',
          srcDark: 'img/openlm-docs-dark.png',
          // width: 143,
          // height: 32,
        },
        items: [
          {
            type: 'dropdown',
            label: 'Docs',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'tutorialSidebar',
                docsPluginId: 'cloud',
                label: 'OpenLM Platform',
              },
              {
                type: 'docSidebar',
                sidebarId: 'tutorialSidebar',
                docsPluginId: 'legacy',
                label: 'Version 25 (Legacy)',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Product',
            position: 'left',
            items: [
              {
                label: 'Downloads',
                href: 'https://www.openlm.com/downloads/',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              {
                label: 'Supported Software',
                to: '/supported-software/',
              },
            ],
          },
          // One "What's new" home for everything release-related. Release
          // Notes (curated highlights) and the per-service engineering
          // changelogs used to be split across two menus with no hint of the
          // taxonomy.
          {
            type: 'dropdown',
            label: "What's new",
            position: 'left',
            items: [
              {
                label: 'Release Notes',
                to: '/release-notes/',
              },
              // Non-clickable section header; styled via .navbar-dropdown-header
              // in src/css/custom.css. A type:'html' item can't be translated via
              // navbar.json, so it carries both locales' text in dual spans
              // (.locale-toggle--en / --ja) that CSS shows/hides by <html lang>,
              // the same pattern as the announcement bar below.
              {
                type: 'html',
                value:
                  '<span class="navbar-dropdown-header"><span class="locale-toggle locale-toggle--en">Changelog</span><span class="locale-toggle locale-toggle--ja" lang="ja">変更履歴</span></span>',
              },
              {
                label: 'OpenLM Platform',
                to: '/cloud/category/changelog',
              },
              {
                label: 'Legacy',
                to: '/legacy/category/changelog/',
              },
            ],
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            docsPluginId: 'cloud',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            docsPluginId: 'legacy',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },

        ],
      },
      footer: {
        style: 'dark',
        links: [
          // Documentation column first: the footer previously offered only
          // marketing exit ramps, with no way back into the docs and no
          // support link anywhere in the chrome.
          {
            title: 'Documentation',
            items: [
              {
                label: 'OpenLM Platform',
                to: '/cloud/getting-started/what-is-openlm',
              },
              {
                label: 'Version 25 (Legacy)',
                to: '/legacy/intro',
              },
              {
                label: "What's new",
                to: '/release-notes/',
              },
              {
                label: 'Glossary',
                to: '/cloud/glossary',
              },
              {
                label: 'Search',
                to: '/search',
              },
              {
                label: 'Contact support',
                href: 'https://www.openlm.com/contact-us/',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Glossary',
                to: '/cloud/glossary',
              },
              {
                label: 'Downloads',
                href: 'https://www.openlm.com/downloads/',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              {
                label: 'Supported Software',
                to: '/supported-software/',
              },
              {
                label: 'Blog',
                href: 'https://www.openlm.com/blog/',
              },
              {
                label: 'Developers',
                href: 'https://www.openlm.com/developers/',
              },
              {
                label: 'Release Notes',
                to: '/release-notes/',
              },
              {
                label: 'Subscribe to release updates',
                to: '/subscribe/',
              },
              {
                label: 'Doc feedback',
                href: 'https://app.arcade.software/share/QmFv92cLTnwngBcCvHBi',
              }
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                href: 'https://www.openlm.com/about-openlm/',
              },
              {
                label: 'Privacy Policy',
                to: '/privacy-policy',
              },
              {
                label: 'OpenLM End User License Agreement',
                href: 'https://www.openlm.com/openlm-master-eula-agreement/',
              },
              {
                label: 'GSA Contact Holder',
                href: 'https://www.openlm.com/gsa-contact-holder/',
              },
              {
                label: 'Partner with OpenLM',
                href: 'https://www.openlm.com/partner/',
              }
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        // nightOwl's deep blue-black background sits in the same cool hue
        // family as the slate surface tokens; Dracula's warm purple-gray
        // read as a third, clashing neutral on the dark canvas.
        darkTheme: prismThemes.nightOwl,
      },
      // Date-gated release banner (see ANNOUNCEMENT_* constants at the top).
      // Shows for ANNOUNCEMENT_VISIBILITY_DAYS after ANNOUNCEMENT_RELEASE_DATE.
      ...(isAnnouncementActive() && {
        announcementBar: {
          id: 'workstation_agent_26_6_24_1528',
          content:
            '<span class="rmk-announce__locale rmk-announce__locale--en">New release: <a href="/documentation/cloud/changelog/components/workstation-agent">Workstation Agent v26.6.24.1528</a> — now available for macOS</span><span class="rmk-announce__locale rmk-announce__locale--ja" lang="ja">新リリース：<a href="/documentation/ja/cloud/changelog/components/workstation-agent">Workstation Agent v26.6.24.1528</a> — macOS に対応</span>',
          isCloseable: true,
        },
      }),
    }),
};

module.exports = config;
