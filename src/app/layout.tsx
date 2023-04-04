import { Analytics } from '@vercel/analytics/react'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter, Noto_Sans_TC } from 'next/font/google'

import '@/styles/globals.css'

import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

import { site } from '@/config/site'

import CustomToaster from './custom-toaster'
import Providers from './providers'

import { WithChildren } from '@/types'

type RootLayoutProps = WithChildren

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s ${site.titleTemplate}`,
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/static/favicon/site.webmanifest',
  twitter: {
    title: site.name,
    card: 'summary_large_image',
    site: '@TszhongLai0411',
    creator: '@TszhongLai0411',
  },
  openGraph: {
    url: `${site.url}`,
    type: 'website',
    title: site.title,
    siteName: site.title,
    description: site.description,
    locale: 'zh-TW',
    images: [
      {
        url: 'https://honghong.me/static/images/projects/one-blog/cover.png',
        width: 1600,
        height: 960,
        alt: site.description,
      },
    ],
  },
  icons: {
    icon: '/static/favicon/favicon.svg',
    apple: [
      {
        url: '/static/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [...site.favicons],
  },
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html
      lang='zh-TW'
      className={clsx(inter.variable, notoSansTC.variable, 'scroll-smooth')}
    >
      <body className='overflow-x-hidden font-default bg-hong-bg text-hong-fg'>
        <Providers>
          {/* @ts-expect-error Server component */}
          <Header />
          <main className='pt-[60px] px-3.5'>{children}</main>
          <CustomToaster />
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
