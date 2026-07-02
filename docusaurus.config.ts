import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Noki's Page",
  tagline: "Noki's Blog",
  favicon: 'images/fav.ico',

  url: 'https://reiinoki.github.io',
  baseUrl: '/',
  organizationName: 'ReiiNoki',
  projectName: 'reiinoki.github.io',
  trailingSlash: true,
  staticDirectories: ['static'],

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          path: 'blog',
          routeBasePath: 'blog',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'ingress',
        path: 'ingress',
        routeBasePath: 'ingress',
        exclude: ['**/_drafts/**'],
        blogTitle: 'Ingress',
        blogDescription: 'Ingress articles',
        blogSidebarTitle: 'All Ingress Posts',
        blogSidebarCount: 'ALL',
        showReadingTime: true,
        postsPerPage: 'ALL',
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
  ],

  themeConfig: {
    image: 'images/avatar.jpg',
    navbar: {
      title: "Noki's Page",
      logo: {
        alt: "Noki's Page",
        src: 'images/avatar.jpg',
      },
      items: [
        {to: '/', label: 'Home', position: 'left', exact: true},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/ingress', label: 'Ingress', position: 'left'},
        {to: '/comment', label: 'Comment', position: 'left'},
        {
          href: 'https://github.com/ReiiNoki/reiinoki.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Site',
          items: [
            {label: 'Home', to: '/'},
            {label: 'Blog', to: '/blog'},
            {label: 'Ingress', to: '/ingress'},
            {label: 'Comment', to: '/comment'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ReiiNoki',
            },
            {
              label: '知乎',
              href: 'https://www.zhihu.com/people/reiinoki',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ReiiNoki. Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
