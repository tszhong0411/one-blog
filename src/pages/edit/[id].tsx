import { Button, createStyles, Flex, TextInput, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React from 'react'

import { deleteHandler, publishHandler, updateHandler } from '@/lib/handler'
import { sanitize } from '@/lib/sanitize'
import { usePostById } from '@/hooks/usePostById'

import ErrorText from '@/components/ErrorText'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import RichTextEditor, { useEditor } from '@/components/RichTextEditor'

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: 800,
    width: '100%',
    padding: `0 ${theme.spacing.xl}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },
}))

const EditPage = () => {
  const { query } = useRouter()
  const postId = query.id as string
  const { post, isLoading, isError } = usePostById(postId, true)
  const { classes } = useStyles()
  const { push } = useRouter()
  const [newTitle, setNewTitle] = React.useState<string>()
  const { status } = useSession()

  const editor = useEditor({
    options: {
      content: '',
    },
  })

  React.useEffect(() => {
    if (!post || !editor) {
      return undefined
    }

    editor.commands.setContent(post.content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, editor])

  if (!editor || status === 'loading' || isLoading || isError) {
    return <Loader />
  }

  if (status === 'unauthenticated' || isError?.message === 'Unauthorized') {
    return <ErrorText message='You have no permission to edit the post.' />
  }

  const { title, content, published, id } = post

  return (
    <Layout
      seo={{
        title: 'Edit',
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Title align='center' mb={40}>
        Edit post
      </Title>
      <Flex justify='center' align='center' w='100%'>
        <div className={classes.container}>
          <TextInput
            withAsterisk
            size='lg'
            label='Title'
            w='100%'
            value={newTitle ?? title}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <RichTextEditor editor={editor} />
          <Flex justify='space-between' gap={8}>
            <Flex gap={8}>
              {!published && (
                <Button
                  type='button'
                  onClick={() =>
                    updateHandler({
                      body: {
                        title: newTitle ?? title,
                        content: editor.getHTML() ?? content,
                        id,
                      },
                      callback: () => push('/drafts'),
                    })
                  }
                >
                  Save as draft
                </Button>
              )}
              <Button
                type='button'
                onClick={() =>
                  publishHandler({
                    body: {
                      title: newTitle ?? title,
                      content: sanitize({
                        dirty: editor.getHTML() ?? content,
                      }),
                      id,
                    },
                    callback: () => push(`/post/${id}`),
                  })
                }
              >
                Publish
              </Button>
            </Flex>
            <Button
              type='button'
              variant='outline'
              onClick={() =>
                deleteHandler({
                  id,
                  callback: () => push('/drafts'),
                })
              }
            >
              Delete
            </Button>
          </Flex>
        </div>
      </Flex>
    </Layout>
  )
}

export default EditPage
