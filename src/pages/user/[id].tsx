import { Avatar, Button, Center, Flex, Text } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React from 'react'

import { usePostsByUser } from '@/hooks/usePostsByUser'
import { useUser } from '@/hooks/useUser'

import ErrorText from '@/components/ErrorText'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import PostCard from '@/components/PostCard'

const ProfilePage = () => {
  const { query } = useRouter()
  const id = query.id as string
  const { user, isLoading: isUserLoading, isError: isUserError } = useUser(id)
  const { data: session } = useSession()
  const {
    posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = usePostsByUser(id)

  if (isUserError?.message === 'Not found') {
    return <ErrorText message='User not found' />
  }

  if (isUserLoading || isUserError || isPostsLoading || isPostsError) {
    return <Loader height='50vh' />
  }

  return (
    <Layout
      seo={{
        title: user.name,
      }}
    >
      <Center component={Flex} direction='column' gap={16}>
        <Avatar
          w={150}
          h={150}
          src={user.image}
          radius={9999}
          imageProps={{
            referrerPolicy: 'no-referrer',
          }}
        />
        <Text fz={{ base: 18, sm: 24 }} weight={800}>
          {user.name}
        </Text>
        {user.bio && (
          <Text fz={{ base: 16, sm: 20 }} color='dimmed' weight={500}>
            {user.bio}
          </Text>
        )}
        {user.id === session?.user.id && (
          <Button component={Link} href='/settings' radius='xl'>
            Edit profile
          </Button>
        )}
        <Text mt={60} size={26} mb={20} lts={1.5}>
          Latest posts
        </Text>
        <Flex direction='column' gap={40} w='100%' px='xl' maw={1000} mx='auto'>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Flex>
        {posts.length === 0 && (
          <Text size={24} weight={500}>
            No posts
          </Text>
        )}
      </Center>
    </Layout>
  )
}

export default ProfilePage
