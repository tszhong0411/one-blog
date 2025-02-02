import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import readingTime from 'reading-time'

import Editor from '@/components/editor'
import UserAvatar from '@/components/user-avatar'
import { getCurrentUser } from '@/lib/auth'
import { SITE_URL } from '@/lib/constants'
import { getPostById } from '@/queries/get-post-by-id'
import { getPostMetadataById } from '@/queries/get-post-metadata-by-id'
import { formatPostDate } from '@/utils/format-post-date'

import LikeButton from './like-button'

type PostPageProps = {
  params: Promise<{
    id: string
  }>
}

export const generateMetadata = async (props: PostPageProps): Promise<Metadata> => {
  const { id } = await props.params
  const { post } = await getPostMetadataById(id)

  if (!post) return {}

  const ISOPublishedTime = new Date(post.createdAt).toISOString()
  const ISOModifiedTime = new Date(post.updatedAt).toISOString()

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      url: `${SITE_URL}/posts/${id}`,
      type: 'article',
      title: post.title,
      description: post.description ?? undefined,
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: `${SITE_URL}/users/${post.authorId}`,
      images: [
        {
          url: `${SITE_URL}/api/og?title=${post.title}`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/png'
        }
      ]
    }
  }
}

const PostPage = async (props: PostPageProps) => {
  const { id } = await props.params

  const user = await getCurrentUser()
  const { post } = await getPostById(id)

  if (!post) {
    notFound()
  }

  const { title, description, content, createdAt, user: author, likes } = post
  const dateTime = formatPostDate(createdAt, {
    format: 'YYYY-MM-DD'
  })

  return (
    <>
      <div className='space-y-4'>
        <div className='text-muted-foreground flex gap-2'>
          <time dateTime={dateTime}>{formatPostDate(createdAt, { relative: true })}</time>
          <span>·</span>
          <span>{readingTime(content ?? '').text}</span>
        </div>
        <h1 className='text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl'>{title}</h1>
        <p className='text-muted-foreground text-lg md:text-xl'>{description}</p>
        <Link href={`/users/${author.id}`} className='flex items-center gap-2'>
          <UserAvatar
            width={32}
            height={32}
            src={author.image}
            alt={author.name}
            userId={author.id}
          />
          <div className='text-sm'>
            <div>{author.name}</div>
          </div>
        </Link>
      </div>
      <article className='py-6'>
        <Editor options={{ content, editable: false }} />
      </article>
      <LikeButton likes={likes} user={user} postId={id} />
    </>
  )
}

export default PostPage
