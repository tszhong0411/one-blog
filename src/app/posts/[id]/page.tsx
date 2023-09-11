import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Back from '@/components/back'
import Controls from '@/components/controls'
import MDX from '@/components/mdx'
import UserAvatar from '@/components/user-avatar'
import { site } from '@/config/site'
import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'
import { formatPostDate } from '@/utils/format-post-date'
import { getMdxSource } from '@/utils/get-mdx-source'

import LikeButton from './like-button'

type PostPageProps = {
  params: {
    id: string
  }
}

export const generateMetadata = async (
  props: PostPageProps
): Promise<Metadata> => {
  const { params } = props
  const post = await db.post.findUnique({
    where: {
      id: params.id
    }
  })

  if (!post) return {}

  const ISOPublishedTime = new Date(post.createdAt).toISOString()
  const ISOModifiedTime = new Date(post.updatedAt).toISOString()

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      url: `${site.url}/posts/${post.id}`,
      type: 'article',
      title: post.title,
      description: post.description || undefined,
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: `${site.url}/users/${post.authorId}`,
      images: [
        {
          url: `${site.url}/api/og?title=${post.title}`,
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
  const { params } = props
  const { id } = params

  const user = await getCurrentUser()

  const post = await db.post.findUnique({
    where: {
      id,
      published: true
    },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true
        }
      },
      likes: {
        select: {
          id: true,
          userId: true,
          postId: true
        }
      }
    }
  })

  if (!post) {
    notFound()
  }

  const { title, description, content, createdAt, author, likes } = post

  const source = await getMdxSource(content)

  return (
    <>
      <div className='flex items-center justify-between'>
        <Back />
        <Controls id={id} user={user} authorId={author.id} postTitle={title} />
      </div>
      <div className='my-8'>
        <h1 className='text-2xl font-bold sm:text-3xl'>{title}</h1>
        <p className='mt-4 text-muted-foreground'>{description}</p>
      </div>
      <Link href={`/users/${author.id}`} className='flex items-center gap-3'>
        <UserAvatar
          width={40}
          height={40}
          src={author.image}
          alt={author.name}
          userId={author.id}
        />
        <div className='text-sm'>
          <div>{author.name}</div>
          <div className='text-xs text-muted-foreground'>
            {formatPostDate(createdAt)}
          </div>
        </div>
      </Link>
      <MDX source={source} />
      <LikeButton likes={likes} user={user} postId={id} />
    </>
  )
}

export default PostPage
