import type { NextSeoProps } from 'next-seo'

type Site = {
  url: string
  title: string
  name: string
  keywords: string[]
  titleTemplate: string
  description: string
  favicons: NonNullable<NextSeoProps['additionalLinkTags']>
}

export const site: Site = {
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://one-blog.honghong.me'
      : 'http://localhost:3000',
  title: 'One Blog',
  name: 'Hong',
  keywords: ['blog', 'one-blog', 'full-stack blog', 'nextjs blog'],
  titleTemplate: '- One Blog',
  description:
    'Welcome to our blog! Here, you can publish your own articles, interact with other users, and like your favorite posts. Additionally, you can easily edit your profile, including your avatar and bio, to showcase more information about yourself. Join our community today and share your thoughts and experiences!',
  favicons: [
    {
      rel: 'icon',
      href: '/static/favicon/favicon.svg',
    },
    {
      rel: 'shortcut icon',
      href: '/static/favicon/favicon.svg',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/static/favicon/apple-touch-icon.png',
      type: 'image/png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/static/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/static/favicon/favicon-32x32.png',
    },
  ],
}
