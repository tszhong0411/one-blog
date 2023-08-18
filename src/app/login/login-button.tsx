'use client'

import { Button } from '@tszhong0411/ui'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React from 'react'

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
      loading={loading}
      disabled={loading}
    >
      {!loading && (
        <Image
          src='/images/google.svg'
          width={22}
          height={22}
          alt='Google'
          className='mr-2.5'
        />
      )}
      Continue with Google
    </Button>
  )
}

export default LoginButton
