import { collectionGroup, onSnapshot } from 'firebase/firestore'
import React from 'react'

import { firestore } from '@/lib/firebase/app'

import PostCard from '@/components/PostCard'
import Spinner from '@/components/Spinner'

import { Post } from '@/types'

const HomePage = () => {
  const [posts, setPosts] = React.useState<Post[]>()

  React.useEffect(() => {
    const postsCollection = collectionGroup(firestore, 'posts')
    const unsubscribe = onSnapshot(postsCollection, (querySnapshot) => {
      const docs = querySnapshot.docs.map((doc) => doc.data())

      setPosts(docs as Post[])
    })

    return () => unsubscribe()
  }, [])

  if (posts) {
    return (
      <div className='mx-auto flex max-w-2xl flex-col gap-4 py-12'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    )
  }

  return <Spinner className='h-content' />
}

export default HomePage
