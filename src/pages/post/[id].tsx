import { JSONContent } from '@tiptap/react'
import { format } from 'date-fns'
import {
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, firestore } from '@/lib/firebase/app'
import { useEditor } from '@/hooks'

import Spinner from '@/components/Spinner'
import Tiptap from '@/components/Tiptap'

import { Post, User } from '@/types'

type ContentProps = {
  content: JSONContent
}

const Content = (props: ContentProps) => {
  const { content } = props

  const editor = useEditor({
    options: {
      content,
      editable: false,
    },
  })

  return <Tiptap editor={editor} />
}

const PostPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = React.useState<Post>()
  const [user] = useAuthState(auth)
  const [author, setAuthor] = React.useState<User>()

  React.useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const postsQuery = query(
          collectionGroup(firestore, 'posts'),
          where('id', '==', id)
        )

        const postSnapshots = await getDocs(postsQuery)

        if (postSnapshots.size > 0) {
          const postDoc = postSnapshots.docs[0]
          setPost(postDoc.data() as Post)
        } else {
          router.push('/404')

          return
        }
      }
      fetchPost()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  React.useEffect(() => {
    if (post) {
      const authorDocRef = doc(firestore, 'users', post.authorId)

      const unsubscribe = onSnapshot(authorDocRef, (doc) => {
        if (doc.exists()) {
          setAuthor(doc.data() as User)
        }
      })

      return () => unsubscribe()
    }

    return
  }, [post])

  if (post && author) {
    const { title, createdAt, content, authorId } = post
    const { displayName, photoURL } = author

    return (
      <div className='relative mx-auto max-w-3xl'>
        {authorId === user?.uid && (
          <Link
            href={`/edit/${post.id}`}
            className='absolute right-5 top-20 rounded-md border border-accent-5 px-4 py-2 font-bold transition-colors duration-150 hover:border-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
          >
            Edit
          </Link>
        )}

        <div className='my-24 flex flex-col items-center gap-4'>
          <h1 className='text-3xl font-bold'>{title}</h1>

          <div className='text-sm text-accent-5'>
            {format(createdAt, 'yyyy-MM-dd, HH:mm')}
          </div>

          <Link
            href={`/user/${post.authorId}`}
            className='flex items-center gap-2'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoURL}
              width={50}
              height={50}
              className='rounded-full'
              referrerPolicy='no-referrer'
              alt={`Avatar of ${displayName}`}
            />

            <span>{displayName}</span>
          </Link>

          <Content content={JSON.parse(content) as JSONContent} />
        </div>
      </div>
    )
  }

  return <Spinner className='h-content' />
}
export default PostPage
