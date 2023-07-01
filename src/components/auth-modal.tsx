import { IconBrandGoogle } from '@tabler/icons-react'
import { Button, Dialog, DialogContent } from '@tszhong0411/ui'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import React from 'react'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'

import { auth, firestore } from '@/lib/firebase/app'
import { useModal } from '@/hooks'

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
    <Dialog
      open={loginModal}
      onOpenChange={(open) => setVisible('login', open)}
    >
      <DialogContent className='fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-accent-2 bg-accent-bg p-4 focus:outline-none'>
        <div className='relative my-12 flex flex-col items-center justify-center gap-4'>
          <div className='text-xl font-bold'>Sign in</div>

          <Button
            type='button'
            onClick={() => signInWithGoogle()}
            loading={loading}
            disabled={loading}
          >
            <IconBrandGoogle size={16} className='mr-2' /> Sign in with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AuthModal
