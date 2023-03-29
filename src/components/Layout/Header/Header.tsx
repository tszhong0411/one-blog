import Link from 'next/link'
import { getServerSession } from 'next-auth'
import React from 'react'

import { authOptions } from '@/lib/auth'

import Menu from './Menu'

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className='fixed top-0 left-0 right-0 z-40 bg-white/80 shadow-sm saturate-[1.8] backdrop-blur-[10px] dark:bg-black/50 dark:saturate-100'>
      <div className='mx-auto flex h-[60px] max-w-4xl items-center justify-between px-8'>
        <Link href='/' className='text-lg font-bold'>
          One Blog
        </Link>

        <Menu session={session} />
      </div>
    </header>
  )
}

export default Header
