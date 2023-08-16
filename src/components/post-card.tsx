'use client'

import { Like, Post } from '@prisma/client'
import { IconHeart } from '@tabler/icons-react'
import Link from 'next/link'
import { User } from 'next-auth'
import React from 'react'

import { formatPostDate } from '@/utils/format-post-date'

import Controls from './controls'
import UserAvatar from './user-avatar'

export type PostCardProps = {
  post: Pick<
    Post,
    'id' | 'title' | 'description' | 'published' | 'createdAt'
  > & {
    likes: Pick<Like, 'id'>[]
  } & {
    author: Pick<User, 'name' | 'image' | 'id'>
  }
  user?: User | null
  showAuthor?: boolean
}

const PostCard = (props: PostCardProps) => {
  const { post, user, showAuthor = true } = props
  const { id, title, description, published, createdAt, likes, author } = post

  return (
    <article className='flex items-start justify-between border-b border-accent-2 px-1 py-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-1'>
          {showAuthor && (
            <>
              <Link
                href={`/users/${[author.id]}`}
                className='flex items-center gap-1 text-sm'
              >
                <UserAvatar
                  width={24}
                  height={24}
                  userId={author.id}
                  src={author.image}
                  alt={author.name}
                />
                <span>{author.name}</span>
              </Link>
              <span>·</span>
            </>
          )}
          <span className='text-xs'>{formatPostDate(createdAt)}</span>
        </div>
        <Link
          href={`/${published ? 'posts' : 'editor'}/${id}`}
          className='block space-y-2'
        >
          <h2 className='text-lg font-semibold'>{title}</h2>
          <p className='line-clamp-3 text-accent-6'>{description}</p>
        </Link>
        <div className='mt-4 flex items-center gap-2 text-sm'>
          <IconHeart width={20} height={20} />
          {likes.length}
        </div>
      </div>
      <Controls user={user} id={id} authorId={author.id} />
    </article>
  )
}

export default PostCard
