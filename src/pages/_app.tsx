import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import '@/styles/globals.css'

import Layout from '@/components/Layout'

import { site } from '@/config/site'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <Layout>
      <DefaultSeo
        titleTemplate={`%s ${site.titleTemplate}`}
        defaultTitle={site.title}
        description={site.description}
        robotsProps={{
          maxVideoPreview: -1,
          maxImagePreview: 'large',
          maxSnippet: -1,
        }}
        themeColor='#000'
        additionalLinkTags={[
          ...site.favicons,
          {
            rel: 'manifest',
            href: '/static/favicon/site.webmanifest',
          },
        ]}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: site.keywords.join(','),
          },
        ]}
        openGraph={{
          url: `${site.url}`,
          type: 'website',
          title: site.title,
          siteName: site.title,
          description: site.description,
          locale: 'en-US',
          images: [
            {
              url: 'https://honghong.me/static/images/projects/one-blog/cover.png',
              width: 1200,
              height: 630,
              alt: site.description,
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@tszhong0411',
          site: '@tszhong0411',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  )
}
