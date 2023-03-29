import type { Metadata } from 'next'

import prisma from '@/lib/prisma'

import PostCard from '@/components/PostCard'

import { site } from '@/config/site'

export const metadata: Metadata = {
  alternates: {
    canonical: site.url,
  },
}

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return posts
}

const HomePage = async () => {
  const posts = await getAllPosts()

  return (
    <div className='max-w-2xl mx-auto py-12 flex flex-col gap-4'>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  )
}

export default HomePage
