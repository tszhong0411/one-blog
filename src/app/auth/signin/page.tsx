import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import LoginButton from './login-button'

type SignInPageProps = {
  searchParams: {
    callbackUrl: string
  }
}

const SignInPage = async (props: SignInPageProps) => {
  const { searchParams } = props

  const session = await getServerSession(authOptions)

  if (session) {
    redirect(searchParams.callbackUrl ?? '/')
  }

  return (
    <div className='flex min-h-[calc(100vh-60px-68px)] flex-col items-center justify-center gap-12'>
      <h1 className='text-[32px] font-bold'>登入到 One Blog</h1>
      <div className='w-full max-w-xs'>
        <LoginButton />
      </div>
    </div>
  )
}

export default SignInPage
