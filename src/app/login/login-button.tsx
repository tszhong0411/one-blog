'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React from 'react'

import { Button } from '@/components/ui'

const LoginButton = () => {
  const [loading, setLoading] = React.useState(false)
  const searchParams = useSearchParams()
  const pathname = searchParams.get('redirect') || '/'

  return (
    <Button
      onClick={() => {
        setLoading(true)
        signIn('google', {
          redirect: false,
          callbackUrl: pathname,
        })
      }}
      variant='outline'
      className='mx-auto mt-8'
      disabled={loading}
    >
      {loading && <Loader2 size={16} className='mr-2.5 animate-spin' />}
      {!loading && (
        <Image
          src='/images/google.svg'
          width={16}
          height={16}
          alt='Google'
          className='mr-2.5'
        />
      )}
      Continue with Google
    </Button>
  )
}

export default LoginButton
