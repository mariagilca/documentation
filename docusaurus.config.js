// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Helper function to check if announcement should be shown (within 7 days of release)
const ANNOUNCEMENT_RELEASE_DATE = new Date('2025-09-19'); // Set this to your release date
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
    lastVersion: 'current',
    versions: {
      current: {
        label: 'Annapurna',
      },
    },
  },
  {
    id: 'onpremise',
    path: 'docs/onpremise',
    routeBasePath: '/onpremise',
    lastVersion: 'current',
    versions: {
      current: {
        label: 'Annapurna',
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
        label: 'v25',
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
  ...docs_plugins
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  ...meta,
  plugins,
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs/placeholder',
          id: 'default',
          routeBasePath: '/placeholder',
          ...defaultSettings,
        },
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
        theme: { light: 'neutral', dark: 'forest' },
      },
      algolia: {
        appId: 'LEM01HQWDQ',
        apiKey: '0b4b6fbb19f766c26c2b803a072a5dcf',
  
        indexName: 'openlm',
        
        // Add askAi parameter for AI-powered search
        askAi: 'AIZqal0ZHUKH',
  
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
        },
        items: [
          {
            type: 'dropdown',
            label: 'Docs',
            position: 'left',
            items: [
              // Non-clickable group heading for Annapurna
              {
                type: 'html',
                value: '<span class="dropdown-heading">Annapurna</span>',
                className: 'dropdown-heading-container'
              },
              {
                type: 'docSidebar',
                sidebarId: 'tutorialSidebar',
                docsPluginId: 'cloud',
                label: 'Cloud',
              },
              {
                type: 'docSidebar',
                sidebarId: 'tutorialSidebar',
                docsPluginId: 'onpremise',
                label: 'On-premise',
              },
              // Separator
              {
                type: 'html',
                value: '<hr class="dropdown-separator" />',
              },
              {
                type: 'docSidebar',
                sidebarId: 'tutorialSidebar',
                docsPluginId: 'legacy',
                label: 'Legacy',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Downloads',
            position: 'left',
            items: [
              {
                label: 'Annapurna',
                to: '/downloads',
              },
              {
                label: 'Legacy',
                href: 'https://www.openlm.com/downloads/',
              },
            ],
          },
          {
            label: 'Supported Software',
            to: '/supported-software/',
            position: 'right',
          },
          {
            type: 'dropdown',
            label: 'Release Notes',
            position: 'left',
            items: [
              // Group heading for Annapurna release notes
              {
                type: 'html',
                value: '<span class="dropdown-heading">Annapurna</span>',
                className: 'dropdown-heading-container'
              },
              {
                type: 'doc',
                docId: '/category/release-notes',
                docsPluginId: 'cloud',
                label: 'Cloud',
              },
              {
                type: 'doc',
                docId: '/category/release-notes',
                docsPluginId: 'onpremise',
                label: 'On-premise',
              },
              {
                type: 'html',
                value: '<hr class="dropdown-separator" />',
              },
              {
                href: 'https://www.openlm.com/release-notes/',
                label: 'Legacy',
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
            docsPluginId: 'onpremise',
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
                "href": "https://www.openlm.jp/product/license-parser/"
              },
              {
                "label": "OpenLM Platform: Version Annapurna",
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
                "label": "OneDirectorySync",
                "href": "https://www.openlm.jp/product/onedirectorysync/"
              },
              
              {
                "label": "OpenLM Features",
                "href": "https://www.openlm.com/products/openlm-features/"
              },
              {
                "label": "Dongle Monitoring",
                "href": "https://www.openlm.jp/product/dongle-monitoring/"
              },

            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Downloads',
                type: 'dropdown',
                to: '/downloads',
              },
              {
                label: 'Release Notes',
                to: '/onpremise/category/release-notes',
              },
              {
                label: 'Blog',
                href: 'https://www.openlm.jp/blog/',
              },
              {
                label: 'Developers',
                href: 'https://www.openlm.com/developers/',
              }
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                href: 'https://www.openlm.jp/about-openlm/',
              },
              {
                label: 'Privacy Policy',
                href: '/privacy-policy',
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
                href: 'https://www.openlm.jp/partner-with-openlm/',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OpenLM Japan. All rights reserved. `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      // Conditionally show announcement bar only if within 7 days of release
      // ...(isAnnouncementActive() && {
      //   announcementBar: {
      //     id: 'apple_style_announcement',
      //     content: 'New release published! <a href="/cloud/category/release-notes" style="color: #007AFF; text-decoration: none; font-weight: 500;">Learn more ></a>',
      //     backgroundColor: '#f2f4fc',
      //     textColor: '#1d1d1f',
      //     isCloseable: true,
      //   },
      // }),
    }),
};

module.exports = config;
