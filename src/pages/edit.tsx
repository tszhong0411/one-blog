import { Button, Flex, TextInput, Title } from '@mantine/core'
import { createStyles } from '@mantine/styles'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import React from 'react'

import { createHandler } from '@/lib/handler'
import { sanitize } from '@/lib/sanitize'

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
  const { classes } = useStyles()
  const [title, setTitle] = React.useState('')
  const { status } = useSession()
  const { push } = useRouter()

  const editor = useEditor({
    options: {
      content: '',
    },
  })

  if (status === 'loading') {
    return <Loader />
  }

  if (status === 'unauthenticated') {
    return <ErrorText />
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
        New post
      </Title>
      <Flex justify='center' align='center' w='100%'>
        <div className={classes.container}>
          <TextInput
            withAsterisk
            size='lg'
            label='Title'
            w='100%'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <RichTextEditor editor={editor} />
          <Flex justify='space-between'>
            <Flex gap={8}>
              <Button
                type='button'
                onClick={() =>
                  createHandler({
                    body: {
                      title,
                      content: sanitize({
                        dirty: editor.getHTML(),
                      }),
                      published: false,
                    },
                    callback: () => push('/drafts'),
                  })
                }
              >
                Save as draft
              </Button>
              <Button
                type='button'
                onClick={() =>
                  createHandler({
                    body: {
                      title,
                      content: sanitize({
                        dirty: editor.getHTML(),
                      }),
                      published: true,
                    },
                    callback: async (data) => {
                      const id = (await data).id
                      if (id) {
                        push(`/post/${id}`)
                      }
                    },
                  })
                }
              >
                Publish
              </Button>
            </Flex>
            <Button variant='outline' type='button' onClick={() => push('/')}>
              Cancel
            </Button>
          </Flex>
        </div>
      </Flex>
    </Layout>
  )
}

export default EditPage
