import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '@/lib/firebase/app'

import Form from '@/components/form'
import Spinner from '@/components/spinner'

const NewPostPage = () => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  if (loading) {
    return <Spinner className='h-content' />
  }

  if (!user) {
    router.push('/')

    return
  }

  return (
    <div className='mx-auto my-24 flex max-w-3xl flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold'>New post</h1>

      <Form user={user} />
    </div>
  )
}

export default NewPostPage
