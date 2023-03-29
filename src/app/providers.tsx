'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'

import { WithChildren } from '@/types'

type ProvidersProps = WithChildren

const queryClient = new QueryClient()

const Providers = (props: ProvidersProps) => {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default Providers
