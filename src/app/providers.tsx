'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

type ProvidesProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidesProps) => {
  const { children } = props

  return (
    <SessionProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        enableColorScheme
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers
