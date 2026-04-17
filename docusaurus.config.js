// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Helper function to check if announcement should be shown (within 7 days of release)
const ANNOUNCEMENT_RELEASE_DATE = new Date('2026-04-10'); // Set this to your release date
const isAnnouncementActive = () => {
  const now = new Date();
  const daysSinceRelease = Math.floor((now.getTime() - ANNOUNCEMENT_RELEASE_DATE.getTime()) / (1000 * 60 * 60 * 24));
  return daysSinceRelease <= 7; // Show for 7 days
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
  organizationName: 'mariagilca', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'ignore',

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
        label: 'Version 25',
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
const plugins = [
  ...docs_plugins,
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
    '@docusaurus/plugin-client-redirects',
    {
      redirects: [
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
  customFields: {
    deprecationBanner: {
      legacy: { enabled: true },
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
        askAi: 'gOVYMNBglLuQ', //Grok
  
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
      image: 'img/openlm-docs.png',
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
                label: 'Version 25',
              },
            ],
          },
          {
            label: 'Downloads',
            href: 'https://www.openlm.com/downloads/',
            target: '_blank',
            rel: 'noopener noreferrer',
            position: 'left',
          },
          {
            label: 'Supported Software',
            to: '/supported-software/',
            position: 'right',
          },
          {
            type: 'dropdown',
            label: 'Changelog',
            position: 'left',
            items: [
              {
                href: 'https://www.openlm.com/release-notes/',
                label: 'Version 25',
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
          {
            title: 'Products',
            items: [

              {
                "label": "OpenLM License Parser",
                "href": "https://www.openlm.com/products/license-parser/"
              },
              {
                "label": "OpenLM Platform",
                "href": "https://www.openlm.com/product/openlm-software-asset-management-sam//"
              },
              {
                "label": "OpenLM Academic Program",
                "href": "https://www.openlm.com/products/openlm-academic-program/"
              },
              {
                "label": "OpenLM Analytics",
                "href": "https://www.openlm.com/product/openlm-analytics/"
              },
              {
                "label": "OpenLM Identity Alignment",
                "href": "https://www.openlm.com/products/openlm-identity-alignment/"
              },
              
              {
                "label": "OpenLM Features",
                "href": "https://www.openlm.com/products/openlm-features/"
              },
              {
                "label": "Dongle Monitoring",
                "href": "https://www.openlm.com/products/dongle-monitoring/"
              },

            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Downloads',
                href: 'https://www.openlm.com/downloads/',
                target: '_blank',
                rel: 'noopener noreferrer',
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
                label: 'Changelog',
                to: '/changelog/',
              },
              {
                label: 'Release Notes',
                to: '/release-notes/',
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
        copyright: `Copyright © ${new Date().getFullYear()} OpenLM. All rights reserved. `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      // Conditionally show announcement bar only if within 7 days of release
      ...(isAnnouncementActive() && {
        announcementBar: {
          id: 'apple_style_announcement',
          content:
            '<span class="rmk-announce__locale rmk-announce__locale--en">Broker v26.4.9 and Applications Manager v26.4.8.607 are live (April 10, 2026). <a href="/documentation/legacy/changelog/broker">Broker changelog</a> &middot; <a href="/documentation/legacy/changelog/applications-manager">Applications Manager changelog</a></span><span class="rmk-announce__locale rmk-announce__locale--ja" lang="ja">Broker v26.4.9 と Applications Manager v26.4.8.607 をリリースしました（2026年4月10日）。<a href="/documentation/legacy/changelog/broker">Broker 変更履歴</a> &middot; <a href="/documentation/legacy/changelog/applications-manager">Applications Manager 変更履歴</a></span>',
          isCloseable: true,
        },
      }),
    }),
};

module.exports = config;
