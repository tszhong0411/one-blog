import { JSONContent } from '@tiptap/react'
import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import Content from './content'

type PostPageProps = {
  params: {
    [key: string]: string
  }
}

const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
          email: true,
        },
      },
    },
  })

  return post
}

const PostPage = async (props: PostPageProps) => {
  const { params } = props
  const post = await getPostById(params.id)
  const session = await getServerSession(authOptions)

  if (!post) {
    notFound()
  }

  const { title, content, createdAt, author } = post

  return (
    <div className='relative max-w-3xl mx-auto'>
      {session?.user?.email === post.author.email && (
        <Link
          href={`/edit/${post.id}`}
          className='px-4 py-2 font-bold rounded-md border border-accent-5 hover:border-white transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5 absolute right-5 top-20'
        >
          編輯文章
        </Link>
      )}

      <div className='flex flex-col gap-4 items-center my-24'>
        <h1 className='text-3xl font-bold'>{title}</h1>

        <div className='text-sm text-accent-5'>
          {format(createdAt, 'yyyy-MM-dd')}
        </div>

        <Link
          href={`/user/${post.authorId}`}
          className='flex items-center gap-2'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={author.image as string}
            width={50}
            height={50}
            className='rounded-full'
            referrerPolicy='no-referrer'
            alt={`Avatar of ${author.name}`}
          />

          <span>{author.name}</span>
        </Link>

        <Content content={content as JSONContent} />
      </div>
    </div>
  )
}

export default PostPage
