import { Button, createStyles, Flex, TextInput, Title } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconX } from '@tabler/icons'
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
  const [disabled, setDisabled] = React.useState(false)

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

  const { title, published, id } = post

  const action = (type: 'publish' | 'save' | 'delete') => {
    const _title = newTitle ?? title

    if (!_title || editor.storage.characterCount.words() === 0) {
      return showNotification({
        message: 'Title or content missing',
        icon: <IconX />,
      })
    }

    if (type === 'publish') {
      setDisabled(true)

      publishHandler({
        body: {
          title: _title,
          content: sanitize({
            dirty: editor.getHTML(),
          }),
          id,
        },
        callback: () => push(`/post/${id}`),
      })
    }

    if (type === 'save') {
      setDisabled(true)

      updateHandler({
        body: {
          title: _title,
          content: editor.getHTML(),
          id,
        },
        callback: () => push('/drafts'),
      })
    }

    if (type === 'delete') {
      setDisabled(true)

      deleteHandler({
        id,
        callback: () => push('/drafts'),
        onCancel: () => setDisabled(false),
      })
    }
  }

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
                  onClick={() => action('save')}
                  disabled={disabled}
                >
                  Save as draft
                </Button>
              )}
              <Button
                type='button'
                onClick={() => action('publish')}
                disabled={disabled}
              >
                Publish
              </Button>
            </Flex>
            <Button
              type='button'
              variant='outline'
              onClick={() => action('delete')}
              disabled={disabled}
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
