// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer'

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'ViaVai',
    tagline: 'Templates Docusaurus with Tailwind CSS and Shadcn/ui',
    favicon: 'img/favicon.ico',

    url: 'https://xlonglink.github.io',
    baseUrl: '/viavai',

    organizationName: 'XLongLink',
    projectName: 'viavai',

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    trailingSlash: true,

    i18n: {
        defaultLocale: 'en',
        locales: ['en']
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/namnguyenthanhwork/docusaurus-tailwind-shadcn-template/tree/main'
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css'
                }
            })
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'ViaVai',
                logo: {
                    alt: 'ViaVai Logo',
                    src: 'img/logo.svg'
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Tutorial'
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    {
                        'href': 'https://github.com/XLongLink/viavai',
                        'position': 'right',
                        'className': 'header-github-link',
                        'aria-label': 'GitHub repository'
                    }
                ]
            },
            footer: {
                style: 'dark',
                links: [],
                copyright: `Copyright © ${new Date().getFullYear()} xLongLink`
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula
            },
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: true,
            },
        }),
}

export default config
