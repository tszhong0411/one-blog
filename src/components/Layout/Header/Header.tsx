import Link from 'next/link'
import React from 'react'

import Menu from './Menu'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-40 bg-black/50 shadow-sm saturate-100 backdrop-blur-[10px]'>
      <div className='mx-auto flex h-[60px] max-w-4xl items-center justify-between px-8'>
        <Link href='/' className='text-lg font-bold'>
          One Blog
        </Link>

        <Menu />
      </div>
    </header>
  )
}

export default Header
