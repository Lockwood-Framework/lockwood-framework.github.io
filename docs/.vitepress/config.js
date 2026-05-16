import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lockwood Framework',
  description: 'A RedM server framework built for serious roleplay.',
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Lockwood Framework',

    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Resources', link: '/resources/lw-db' },
      { text: 'Build Order', link: '/build-order' },
      {
        text: 'GitHub',
        link: 'https://github.com/Lockwood-Framework',
        target: '_blank'
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Build Order', link: '/build-order' },
          { text: 'Conventions', link: '/conventions' },
        ]
      },
      {
        text: 'Foundation',
        items: [
          { text: 'lw-db', link: '/resources/lw-db' },
          { text: 'lw-shared', link: '/resources/lw-shared' },
          { text: 'lw-controls-api', link: '/resources/lw-controls-api' },
        ]
      },
      {
        text: 'Core',
        items: [
          { text: 'lw-core', link: '/resources/lw-core' },
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'lw-characters-api', link: '/resources/lw-characters-api' },
          { text: 'lw-time-api', link: '/resources/lw-time-api' },
          { text: 'lw-weather-api', link: '/resources/lw-weather-api' },
          { text: 'lw-economy-api', link: '/resources/lw-economy-api' },
          { text: 'lw-inventory-api', link: '/resources/lw-inventory-api' },
          { text: 'lw-skills-api', link: '/resources/lw-skills-api' },
          { text: 'lw-reputation-api', link: '/resources/lw-reputation-api' },
          { text: 'lw-legal-api', link: '/resources/lw-legal-api' },
          { text: 'lw-property-api', link: '/resources/lw-property-api' },
          { text: 'lw-business-api', link: '/resources/lw-business-api' },
          { text: 'lw-bounty-api', link: '/resources/lw-bounty-api' },
          { text: 'lw-government-api', link: '/resources/lw-government-api' },
          { text: 'lw-organizations-api', link: '/resources/lw-organizations-api' },
          { text: 'lw-clothing-api', link: '/resources/lw-clothing-api' },
          { text: 'lw-appearance-api', link: '/resources/lw-appearance-api' },
          { text: 'lw-horse-appearance-api', link: '/resources/lw-horse-appearance-api' },
        ]
      },
      {
        text: 'UI & World',
        items: [
          { text: 'lw-ui-core', link: '/resources/lw-ui-core' },
          { text: 'lw-world-objects', link: '/resources/lw-world-objects' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'License', link: '/license' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Lockwood-Framework' },
    ],

    footer: {
      message: 'Released under the Rangeland Public License v1.0',
      copyright: 'Copyright © 2026 Morgrhim'
    },

    search: {
      provider: 'local'
    }
  }
})