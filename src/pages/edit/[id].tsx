import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, firestore } from '@/lib/firebase/app'

import Form from '@/components/form'
import Spinner from '@/components/spinner'

import { Post } from '@/types'

const EditPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [user] = useAuthState(auth)
  const [post, setPost] = React.useState<Post>()

  React.useEffect(() => {
    if (id && user) {
      const postDocRef = doc(
        firestore,
        'users',
        user.uid,
        'posts',
        id as string
      )

      const unsubscribe = onSnapshot(postDocRef, (doc) => {
        if (doc.exists()) {
          setPost(doc.data() as Post)
        } else {
          router.push('/404')

          return
        }
      })

      return () => unsubscribe()
    }

    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user])

  if (post && user) {
    const { title, content, id } = post

    return (
      <div className='mx-auto my-24 flex max-w-3xl flex-col items-center gap-4'>
        <h1 className='text-3xl font-bold'>Edit post</h1>

        <Form user={user} title={title} content={content} id={id} />
      </div>
    )
  }

  return <Spinner className='h-content' />
}
export default EditPage
