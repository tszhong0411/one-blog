import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import PageHeader from '@/components/page-header'
import { getCurrentUser } from '@/lib/auth'
import { getPostsByUserId } from '@/queries/get-posts-by-user-id'

import PostsClient from './page.client'

export const metadata: Metadata = {
  title: 'Your posts'
}

const PostsPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?redirect=/me/posts')
  }

  const { posts } = await getPostsByUserId(user.id)

  return (
    <>
      <PageHeader title='Your posts' className='mb-8' />
      <PostsClient posts={posts} user={user} />
    </>
  )
}

export default PostsPage
