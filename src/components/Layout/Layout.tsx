import { Box, BoxProps } from '@mantine/core'
import { useRouter } from 'next/router'
import { NextSeo, NextSeoProps } from 'next-seo'
import React from 'react'

import { Favicons } from './Favicons'
import Footer from './Footer'
import Navbar from './Navbar'

type LayoutProps = {
  children: React.ReactNode
  seo?: Omit<NextSeoProps, 'children'>
} & BoxProps

const Layout = (props: LayoutProps) => {
  const { children, seo, ...rest } = props
  const { asPath } = useRouter()

  return (
    <>
      <NextSeo
        titleTemplate='%s | One Blog'
        defaultTitle='One Blog'
        description='A simple blog made by 小康 (@tszhong0411)'
        canonical={`https://one-blog.honghong.me${asPath}`}
        twitter={{
          cardType: 'summary_large_image',
          site: '@TszhongLai0411',
          handle: '@TszhongLai0411',
        }}
        openGraph={{
          url: `https://one-blog.honghong.me${asPath}`,
          type: 'website',
          title: 'One Blog',
          description: 'A simple blog made by 小康 (@tszhong0411)',
          images: [
            {
              url: 'https://one-blog.honghong.me/static/images/og.png',
              width: 1200,
              height: 630,
              alt: 'A simple blog made by 小康 (@tszhong0411)',
            },
          ],
        }}
        additionalLinkTags={[...Favicons]}
        {...seo}
      />
      <Navbar />
      <Box
        mih='calc(100vh - 60px)'
        ml={{
          sm: 80,
        }}
        py={150}
        {...rest}
      >
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default Layout
