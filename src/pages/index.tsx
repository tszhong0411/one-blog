import { Flex } from '@mantine/core'
import React from 'react'

import { usePosts } from '@/hooks/usePosts'

import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import PostCard from '@/components/PostCard'

const HomePage = () => {
  const { posts, isLoading, isError } = usePosts()

  if (isLoading || isError) {
    return <Loader height='50vh' layoutProps={{ pt: 150 }} />
  }

  return (
    <Layout>
      <Flex direction='column' gap={40} w='100%' px='xl' maw={1000} mx='auto'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Flex>
    </Layout>
  )
}

export default HomePage
