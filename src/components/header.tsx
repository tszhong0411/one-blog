import Link from 'next/link'

import Menu from './menu'

const Header = () => {
  return (
    <header className='fixed left-0 right-0 top-0 z-40 bg-black/50 shadow-sm saturate-100 backdrop-blur-[10px]'>
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
