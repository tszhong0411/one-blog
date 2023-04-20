import { User } from 'firebase/auth'
import { collectionGroup, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, firestore } from '@/lib/firebase/app'

import PostCard, { Loader } from '@/components/PostCard'
import Spinner from '@/components/Spinner'

import { Post } from '@/types'

type ContentProps = {
  user: User
}

const Content = (props: ContentProps) => {
  const { user } = props
  const [posts, setPosts] = React.useState<Post[]>()

  React.useEffect(() => {
    const postsCollection = collectionGroup(firestore, 'posts')
    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => doc.data()) as Post[]

      setPosts(docs.filter((post) => post.likes[user.uid]))
    })

    return () => unsubscribe()
  }, [user.uid])

  if (posts) {
    return (
      <>
        {posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        ) : (
          <div className='flex min-h-[calc(100vh-224px)] items-center justify-center text-xl font-bold'>
            <p>No liked articles</p>
          </div>
        )}
      </>
    )
  }

  return <Loader />
}

const LikedPage = () => {
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
    <div className='mx-auto flex max-w-2xl flex-col gap-4 py-12'>
      <Content user={user} />
    </div>
  )
}
export default LikedPage
