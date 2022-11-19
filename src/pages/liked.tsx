import { Flex, Text, Title } from '@mantine/core'
import { useSession } from 'next-auth/react'
import React from 'react'

import { useLikedPosts } from '@/hooks/useLikedPosts'

import ErrorText from '@/components/ErrorText'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import PostCard from '@/components/PostCard'

const LikedPage = () => {
  const { posts, isLoading, isError } = useLikedPosts()
  const { status } = useSession()

  if (status === 'loading' || isLoading || isError) {
    return <Loader height='60vh' />
  }

  if (status === 'unauthenticated') {
    return <ErrorText />
  }

  return (
    <Layout
      seo={{
        title: 'Liked posts',
      }}
    >
      <Title align='center' mb={40}>
        Liked posts
      </Title>
      <Flex direction='column' gap={40} w='100%' px='xl' maw={1000} mx='auto'>
        {posts.map((post) => (
          <PostCard key={post.postId} post={post.Post} />
        ))}
      </Flex>
      {posts.length === 0 && (
        <Text py={40} align='center' size={24} weight={500}>
          No posts
        </Text>
      )}
    </Layout>
  )
}

export default LikedPage
