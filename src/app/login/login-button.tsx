'use client'

import { Button } from '@tszhong0411/ui'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import * as React from 'react'

const LoginButton = () => {
  const [loading, setLoading] = React.useState(false)
  const searchParams = useSearchParams()
  const pathname = searchParams.get('redirect') ?? '/'

  return (
    <Button
      onClick={() => {
        setLoading(true)
        void signIn('google', {
          redirect: false,
          callbackUrl: pathname
        })
      }}
      variant='outline'
      className='mx-auto mt-8'
      disabled={loading}
    >
      {loading && <Loader2Icon size={16} className='mr-2.5 animate-spin' />}
      {!loading && (
        <Image src='/images/google.svg' width={16} height={16} alt='Google' className='mr-2.5' />
      )}
      Continue with Google
    </Button>
  )
}

export default LoginButton
