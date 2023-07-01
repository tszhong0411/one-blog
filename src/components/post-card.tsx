import { format } from 'date-fns'
import { doc, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import React from 'react'

import { firestore } from '@/lib/firebase/app'

import LikeButton from './like-button'
import { Loader } from './loader'
import ShareButton from './share-button'

import { Post, User } from '@/types'

type PostCardProps = { post: Post }

const PostCard = (props: PostCardProps) => {
  const { post } = props
  const { id, title, createdAt, authorId } = post
  const [author, setAuthor] = React.useState<User>()

  React.useEffect(() => {
    const authorDocRef = doc(firestore, 'users', authorId)

    const unsubscribe = onSnapshot(authorDocRef, (doc) => {
      if (doc.exists()) {
        setAuthor(doc.data() as User)
      }
    })

    return () => unsubscribe()
  }, [authorId])

  if (author) {
    return (
      <div>
        <Link
          key={id}
          href={`/post/${id}`}
          className='block w-full rounded-t border border-accent-2 p-4 transition-colors duration-150 hover:border-white'
        >
          {title}

          <div className='text-sm text-accent-6'>
            {format(new Date(createdAt), 'dd MMM yyyy, HH:mm')}
          </div>
        </Link>
        <div className='flex w-full items-center justify-between gap-2 rounded-b border-x border-b border-accent-2 p-2'>
          <Link href={`/user/${authorId}`} className='flex gap-2'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.photoURL ?? '/static/images/user-default.png'}
              width={24}
              height={24}
              className='rounded-full'
              referrerPolicy='no-referrer'
              alt={`Avatar of ${author.displayName || 'User'}`}
            />
            <span>{author.displayName || 'User'}</span>
          </Link>
          <div className='flex items-center justify-center gap-2'>
            <LikeButton id={id} authorId={authorId} />
            <ShareButton id={id} />
          </div>
        </div>
      </div>
    )
  }

  return <Loader />
}

export default PostCard
