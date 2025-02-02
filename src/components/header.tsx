import Link from 'next/link'

import { getCurrentUser } from '@/lib/auth'

import Menu from './menu'
import NewPostButton from './new-post-button'
import ThemeToggle from './theme-toggle'

const Header = async () => {
  const user = await getCurrentUser()

  return (
    <header className='bg-background/50 fixed inset-x-0 top-0 z-40 shadow-xs saturate-100 backdrop-blur-[10px]'>
      <div className='h-header mx-auto flex max-w-4xl items-center justify-between px-6'>
        <Link href='/' className='text-lg font-bold'>
          One Blog
        </Link>

        <div className='flex items-center gap-4'>
          {user && <NewPostButton />}
          <ThemeToggle />
          <Menu user={user} />
        </div>
      </div>
    </header>
  )
}

export default Header
