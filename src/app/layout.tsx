import { cn } from '@tszhong0411/utils'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import '@/styles/globals.css'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Toaster from '@/components/toaster'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/constants'

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  manifest: '/favicon/site.webmanifest',
  twitter: {
    title: SITE_NAME,
    card: 'summary_large_image',
    site: '@tszhong0411',
    creator: '@tszhong0411',
    images: [
      {
        url: 'https://honghong.me/images/projects/one-blog/cover.png',
        width: 1280,
        height: 832,
        alt: SITE_DESCRIPTION
      }
    ]
  },
  alternates: {
    canonical: SITE_URL
  },
  keywords: ['blog', 'one-blog', 'full-stack blog', 'nextjs blog'],
  themeColor: '#000000',
  creator: 'tszhong0411',
  openGraph: {
    url: SITE_URL,
    type: 'website',
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en-US',
    images: [
      {
        url: 'https://honghong.me/images/projects/one-blog/cover.png',
        width: 1280,
        height: 832,
        alt: SITE_DESCRIPTION,
        type: 'image/png'
      }
    ]
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png'
      }
    ]
  }
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang='en-US' className={cn(GeistSans.variable, 'scroll-smooth')}>
      <body>
        <Header />
        <main className='mx-auto min-h-[calc(100vh-68px)] max-w-4xl px-8 pb-16 pt-24'>
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
