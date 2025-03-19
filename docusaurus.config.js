// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpenLM Documentation',
  tagline: 'Stretch your licenses to their limits!',
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

  //onBrokenLinks: 'throw',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Annapurna',
              path: '',
            },
          },
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/mariagilca/docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
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
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },  
      image: 'img/OpenLM-Docs.png',
      navbar: {
        title: '',
        logo: {
          alt: 'OpenLM Documentation',
          src: 'img/OpenLM-Docs.png'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right'
          },

          // {to: '/blog', label: 'Blog', position: 'left'}
          //,
          // {
          //   href: 'https://github.com/facebook/docusaurus',
          //   label: 'GitHub',
          //   position: 'right',
          // },
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
                "label": "Software License Management Cloud",
                "href": "https://www.openlm.com/products/software-license-management-cloud-saas/"
              },
              {
                "label": "OpenLM Academic Program",
                "href": "https://www.openlm.com/products/openlm-academic-program/"
              },
              {
                "label": "OpenLM License Allocation Manager",
                "href": "https://www.openlm.com/products/openlm-license-allocations-manager/"
              },
              {
                "label": "OpenLM Directory Sync",
                "href": "https://www.openlm.com/products/openlm-directory-sync/"
              },
              {
                "label": "OpenLM Applications Manager",
                "href": "https://www.openlm.com/products/openlm-applications-manager/"
              },
              {
                "label": "OpenLM Features",
                "href": "https://www.openlm.com/products/openlm-features/"
              }
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Downloads',
                href: 'https://www.openlm.com/downloads/',
              },
              {
                label: 'Release Notes',
                href: 'https://www.openlm.com/release-notes/',
              },
              {
                label: 'Blog',
                href: 'https://www.openlm.com/blog/',
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
                href: 'https://www.openlm.com/about-openlm/',
              },
              {
                label: 'Privacy Policy',
                href: 'https://www.openlm.com/privacy-policy/',
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
                href: 'https://www.openlm.com/partner-with-openlm/',
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
    }),
};

export default config;
