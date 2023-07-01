import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, firestore } from '@/lib/firebase/app'

import PostCard from '@/components/post-card'
import Spinner from '@/components/spinner'

import { Post, User } from '@/types'

const UserPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = React.useState<User>()
  const [currentUser] = useAuthState(auth)
  const [posts, setPosts] = React.useState<Post[]>()

  React.useEffect(() => {
    if (id) {
      const userDocRef = doc(firestore, 'users', id as string)

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUser(doc.data() as User)
        } else {
          router.push('/404')
        }
      })

      return () => unsubscribe()
    }

    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  React.useEffect(() => {
    if (id) {
      const fetchDocuments = async () => {
        const userPostsCollection = collection(firestore, `users/${id}/posts`)
        const querySnapshot = await getDocs(userPostsCollection)
        const docs = querySnapshot.docs.map((doc) => doc.data())

        setPosts(docs as Post[])
      }

      fetchDocuments()
    }

    return
  }, [id])

  if (user && Array.isArray(posts)) {
    const { displayName, photoURL, bio } = user

    return (
      <div className='mx-auto flex max-w-xl flex-col items-center gap-4 py-24'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoURL || '/static/images/default-user.png'}
          width={150}
          height={150}
          className='rounded-full'
          referrerPolicy='no-referrer'
          alt={`Avatar of ${displayName}`}
        />

        <div className='text-lg font-bold sm:text-2xl'>{displayName}</div>

        {bio && <div className='text-accent-6 sm:text-xl'>{bio}</div>}

        {id === currentUser?.uid && (
          <Link
            href='/settings'
            className='rounded-md border border-accent-5 px-4 py-2 font-bold transition-colors duration-150 hover:border-white'
          >
            Edit profile
          </Link>
        )}

        {posts.length > 0 && (
          <h2 className='mt-8 text-3xl font-bold'>All posts</h2>
        )}

        <div className='mt-4 flex w-full flex-col gap-4 space-y-4 px-2'>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    )
  }

  return <Spinner className='h-content' />
}
export default UserPage
