'use client'

import { IconBrandGoogle } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn('google')}
      className='flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#3e7ee8] hover:bg-[#6c99e3] text-white'
    >
      <IconBrandGoogle size={20} />
      繼續以 Google
    </button>
  )
}

export default LoginButton
