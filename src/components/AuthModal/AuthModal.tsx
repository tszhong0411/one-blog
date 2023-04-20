import * as DialogPrimitive from '@radix-ui/react-dialog'
import { IconBrandGoogle, IconX } from '@tabler/icons-react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import React from 'react'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'

import { auth, firestore } from '@/lib/firebase/app'
import { useModal } from '@/hooks'

import Spinner from '../Spinner'

const AuthModal = () => {
  const [signInWithGoogle, user, loading] = useSignInWithGoogle(auth)
  const setVisible = useModal((state) => state.setVisible)
  const loginModal = useModal((state) => state.login)
  const [currentUser] = useAuthState(auth)

  React.useEffect(() => {
    if (currentUser) {
      setVisible('login', false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  React.useEffect(() => {
    if (user) {
      const userDocRef = doc(firestore, 'users', user.user.uid)

      const unsubscribe = onSnapshot(userDocRef, async (doc) => {
        if (!doc.exists()) {
          await setDoc(userDocRef, {
            displayName: user.user.displayName,
            photoURL: user.user.photoURL,
          })
        }
      })

      return () => unsubscribe()
    }

    return
  }, [user])

  return (
    <DialogPrimitive.Root
      open={loginModal}
      onOpenChange={(open) => setVisible('login', open)}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className='animate-in fade-in fixed inset-0 z-40 bg-black/50 opacity-100 backdrop-blur-sm transition-opacity' />
        <DialogPrimitive.Content className='fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-accent-2 bg-hong-bg p-4 focus:outline-none'>
          <DialogPrimitive.Close asChild>
            <button
              className='absolute right-4 top-4'
              aria-label='Close'
              type='button'
            >
              <IconX />
            </button>
          </DialogPrimitive.Close>
          <div className='relative my-12 flex flex-col items-center justify-center gap-4'>
            <div className='text-xl font-bold'>Sign in</div>
            <button
              type='button'
              className='flex w-56 items-center justify-center gap-2 rounded-lg border border-accent-2 px-4 py-2 transition-colors duration-300 hover:border-white'
              onClick={() => signInWithGoogle()}
              disabled={loading}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <IconBrandGoogle />
                  <div>Sign in with Google</div>
                </>
              )}
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
export default AuthModal
