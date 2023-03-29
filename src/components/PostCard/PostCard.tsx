import { Post } from '@prisma/client'
import { format } from 'date-fns'
import { Route } from 'next'
import Link from 'next/link'

import LikeButton from './like-button'
import ShareButton from './share-button'

type PostCardProps = {
  href?: Route
  author: {
    name: string | null
    image: string | null
  }
} & Post

const PostCard = (props: PostCardProps) => {
  const { id, createdAt, title, href, author, authorId } = props

  return (
    <div>
      <Link
        key={id}
        href={href ?? `/post/${id}`}
        className='p-4 border border-accent-2 rounded-t w-full block hover:border-white transition-colors duration-150'
      >
        {title}

        <div className='text-sm text-accent-6'>
          {format(new Date(createdAt), 'dd MMM yyyy, HH:mm')}
        </div>
      </Link>
      <div className='w-full border-b border-x border-accent-2 p-2 rounded-b flex gap-2 items-center justify-between'>
        <Link href={`/user/${authorId}`} className='flex gap-2'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={author.image ?? '/static/images/user-default.png'}
            width={24}
            height={24}
            className='rounded-full'
            referrerPolicy='no-referrer'
            alt={`Avatar of ${author.name || 'User'}`}
          />
          <span>{author.name || 'User'}</span>
        </Link>
        <div className='flex gap-2 items-center justify-center'>
          <LikeButton id={id} />
          <ShareButton id={id} />
        </div>
      </div>
    </div>
  )
}

export default PostCard
