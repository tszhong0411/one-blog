import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import Analytics from '@/components/Analytics'

import GlobalStyles from '@/GlobalStyles'

export default function App(props: AppProps) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props

  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily:
            'Sora,Noto Sans TC,Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
          primaryColor: 'red',
          breakpoints: {
            xs: 375,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
          },
          globalStyles: GlobalStyles,
        }}
      >
        <ModalsProvider>
          <NotificationsProvider autoClose={5000} position='top-right'>
            <Analytics />
            <Component {...pageProps} />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  )
}
