import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'

import LoginButton from './login-button'

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to One Blog'
}

const LoginPage = async () => {
  const user = await getCurrentUser()

  if (user) {
    redirect('/')
  }

  return (
    <div className='min-h-content flex w-full flex-col items-center justify-center p-4'>
      <div className='text-2xl font-semibold'>Log in</div>
      <p className='text-muted-foreground'>to continue to One Blog</p>
      <LoginButton />
    </div>
  )
}

export default LoginPage
