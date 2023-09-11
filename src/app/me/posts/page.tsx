import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import PageHeader from '@/components/page-header'
import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

import Content from './content'

export const metadata: Metadata = {
  title: 'Your posts'
}

const PostsPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?redirect=/me/posts')
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id
    },
    select: {
      id: true,
      title: true,
      description: true,
      published: true,
      createdAt: true,
      likes: {
        select: {
          id: true
        }
      },
      author: {
        select: {
          name: true,
          image: true,
          id: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <>
      <PageHeader title='Your posts' className='mb-8' />
      <Content posts={posts} user={user} />
    </>
  )
}

export default PostsPage
