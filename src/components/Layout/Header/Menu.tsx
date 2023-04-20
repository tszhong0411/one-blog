import {
  IconHeart,
  IconLogout,
  IconSettings,
  IconSquarePlus,
  IconUser,
} from '@tabler/icons-react'
import { signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useClickAway } from 'react-use'

import { auth, firestore } from '@/lib/firebase/app'
import { useModal } from '@/hooks'

import Skeleton from '@/components/Skeleton/Skeleton'

import { User } from '@/types'

const Menu = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const [user, loading] = useAuthState(auth)
  const [currentUser, setCurrentUser] = React.useState<User>()
  const setVisible = useModal((state) => state.setVisible)

  React.useEffect(() => {
    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid)
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setCurrentUser(doc.data() as User)
        }
      })

      return () => unsubscribe()
    }

    return
  }, [user])

  useClickAway(ref, () => {
    setIsOpen(false)
  })

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  if (loading) {
    return <Skeleton className='h-10 w-36 rounded-md px-4 py-2' />
  }

  if (user && currentUser) {
    return (
      <div className='relative inline-block text-left' ref={ref}>
        <div>
          <button
            type='button'
            className='rounded-md border border-accent-3 bg-hong-bg px-4 py-2 text-sm font-medium'
            onClick={() => toggleMenu()}
          >
            <span>
              <div className='flex items-center gap-2'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentUser.photoURL || '/images/default-avatar.png'}
                  width={24}
                  height={24}
                  className='rounded-full'
                  referrerPolicy='no-referrer'
                  alt={`${currentUser.displayName} profile`}
                />
                {currentUser.displayName}
              </div>
            </span>
          </button>
        </div>

        {isOpen && (
          <div className='absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-accent-2 bg-hong-bg shadow-lg'>
            <div className='py-1'>
              <Link
                href='/new-post'
                className='flex items-center gap-4 px-4 py-2 text-sm hover:bg-accent-3'
                onClick={() => toggleMenu()}
              >
                <IconSquarePlus stroke={1.5} />
                New Post
              </Link>
              <Link
                href='/liked'
                className='flex items-center gap-4 px-4 py-2 text-sm hover:bg-accent-3'
                onClick={() => toggleMenu()}
              >
                <IconHeart stroke={1.5} />
                Liked posts
              </Link>
              <hr className='my-2 border-accent-2' />
              <Link
                href={`/user/${user.uid}`}
                className='flex items-center gap-4 px-4 py-2 text-sm hover:bg-accent-3'
                onClick={() => toggleMenu()}
              >
                <IconUser stroke={1.5} />
                Profile
              </Link>
              <Link
                href='/settings'
                className='flex items-center gap-4 px-4 py-2 text-sm hover:bg-accent-3'
                onClick={() => toggleMenu()}
              >
                <IconSettings stroke={1.5} />
                Settings
              </Link>
              <hr className='my-2 border-accent-2' />
              <button
                type='button'
                className='flex w-full items-center gap-4 px-4 py-2 text-sm hover:bg-accent-3'
                onClick={() => signOut(auth)}
              >
                <IconLogout stroke={1.5} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      type='button'
      className='rounded-md border border-white bg-white px-3.5 py-1.5 font-bold text-black transition-colors duration-300 hover:bg-black hover:text-white'
      onClick={() => setVisible('login', true)}
    >
      Log in
    </button>
  )
}

export default Menu
