import type { Metadata } from 'next'

import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

import PageHeader from '@/components/page-header'
import { db, posts } from '@/db'
import { getCurrentUser } from '@/lib/auth'

import Content from './content'

export const metadata: Metadata = {
  title: 'Your posts'
}

const PostsPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?redirect=/me/posts')
  }

  const _posts = await db.query.posts.findMany({
    where: eq(posts.authorId, user.id),
    columns: {
      id: true,
      title: true,
      description: true,
      published: true,
      createdAt: true
    },
    orderBy: desc(posts.createdAt),
    with: {
      likes: {
        columns: {
          id: true
        }
      },
      user: {
        columns: {
          name: true,
          image: true,
          id: true
        }
      }
    }
  })

  return (
    <>
      <PageHeader title='Your posts' className='mb-8' />
      <Content posts={_posts} user={user} />
    </>
  )
}

export default PostsPage
