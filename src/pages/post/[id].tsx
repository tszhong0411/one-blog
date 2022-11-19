import { Avatar, Button, Container, Flex, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React from 'react'

import { formatDate } from '@/lib/formatDate'
import { deleteHandler } from '@/lib/handler'
import { usePostById } from '@/hooks/usePostById'

import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import RichTextEditor, { useEditor } from '@/components/RichTextEditor'

const PostPage = () => {
  const { query } = useRouter()
  const postId = query.id as string
  const {
    post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = usePostById(postId)
  const { data: session } = useSession()

  const { push } = useRouter()

  const editor = useEditor({
    options: {
      content: '',
      editable: false,
    },
  })

  React.useEffect(() => {
    if (!editor || !post) {
      return undefined
    }

    editor.commands.setContent(post.content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, post])

  if (!editor || isPostLoading || isPostError) {
    return (
      <Loader
        containerProps={{ size: 1000, py: 48, w: '100%', px: 'xl' }}
        height='40vh'
      />
    )
  }

  const { title, id, author, publishedAt } = post

  return (
    <Layout
      seo={{
        title: title,
        openGraph: {
          type: 'article',
          title: `${title} | One Blog`,
          article: {
            publishedTime: dayjs(publishedAt).format(),
            authors: ['https://one-blog.honghong.me'],
          },
        },
      }}
    >
      <Container size={1000} px={{ base: 'xl', sm: 56 }} w='100%'>
        <Flex justify='space-between' align='center'>
          <Flex gap={16} align='center'>
            <Avatar
              radius='xl'
              src={author.image}
              alt={author.name}
              imageProps={{
                referrerPolicy: 'no-referrer',
              }}
            />
            <Flex direction='column'>
              <Text>{author.name}</Text>
              <Text color='dimmed'>{formatDate(publishedAt)}</Text>
            </Flex>
          </Flex>
          {session?.user.id === author.id && (
            <Flex gap={16} align='center' justify='center'>
              <Button variant='outline' component={Link} href={`/edit/${id}`}>
                Edit
              </Button>
              <Button
                onClick={() =>
                  deleteHandler({
                    id,
                    callback: () => push('/'),
                  })
                }
              >
                Delete
              </Button>
            </Flex>
          )}
        </Flex>
        <Title color='white' my={12}>
          {title}
        </Title>
        <RichTextEditor editor={editor} />
      </Container>
    </Layout>
  )
}

export default PostPage
