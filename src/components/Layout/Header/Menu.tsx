'use client'

import {
  IconHeart,
  IconLogout,
  IconSettings,
  IconSquarePlus,
  IconUser,
} from '@tabler/icons-react'
import Link from 'next/link'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'
import { useClickAway } from 'react-use'

type MenuProps = {
  session: Session | null
}

const Menu = (props: MenuProps) => {
  const { session } = props

  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  useClickAway(ref, () => {
    setIsOpen(false)
  })

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative inline-block text-left' ref={ref}>
      <div>
        <button
          type='button'
          className='rounded-md border shadow-sm px-4 py-2 bg-hong-bg border-accent-3 text-sm font-medium'
          onClick={() => {
            session ? setIsOpen(!isOpen) : signIn()
          }}
        >
          <span>
            {session ? (
              <div className='flex gap-2 items-center'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={session?.user?.image as string}
                  width={24}
                  height={24}
                  className='rounded-full'
                  referrerPolicy='no-referrer'
                  alt={`${session?.user?.name} profile picture`}
                />
                {session?.user?.name}
              </div>
            ) : (
              '登入'
            )}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-hong-bg border border-accent-2'>
          <div className='py-1'>
            <Link
              href='/new-post'
              className='px-4 py-2 text-sm flex gap-4 items-center hover:bg-accent-3'
              onClick={() => toggleMenu()}
            >
              <IconSquarePlus stroke={1.5} />
              新文章
            </Link>
            <Link
              href='/liked'
              className='px-4 py-2 text-sm flex gap-4 items-center hover:bg-accent-3'
              onClick={() => toggleMenu()}
            >
              <IconHeart stroke={1.5} />
              已讚好文章
            </Link>
            <hr className='my-2 border-accent-2' />
            <Link
              href={`/user/${session?.user.id}`}
              className='px-4 py-2 text-sm flex gap-4 items-center hover:bg-accent-3'
              onClick={() => toggleMenu()}
            >
              <IconUser stroke={1.5} />
              個人資料
            </Link>
            <Link
              href='/settings'
              className='px-4 py-2 text-sm flex gap-4 items-center hover:bg-accent-3'
              onClick={() => toggleMenu()}
            >
              <IconSettings stroke={1.5} />
              設定
            </Link>
            <hr className='my-2 border-accent-2' />
            <button
              type='button'
              className='w-full px-4 py-2 text-sm flex gap-4 items-center hover:bg-accent-3'
              onClick={() => signOut()}
            >
              <IconLogout stroke={1.5} />
              登出
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu
