import { Button, Flex, Modal, TextInput } from '@mantine/core'
import { useInputState, useMediaQuery } from '@mantine/hooks'
import { RichTextEditor as Tiptap, RichTextEditorProps } from '@mantine/tiptap'
import { IconArrowBackUp, IconArrowForwardUp, IconPhoto } from '@tabler/icons'
import React from 'react'
import { z } from 'zod'

import getCodeHighlight from './getCodeHighlight'

const RichTextEditor = (props: Omit<RichTextEditorProps, 'children'>) => {
  const { editor } = props
  const [url, setUrl] = useInputState('')
  const [opened, setOpened] = React.useState(false)
  const [error, setError] = React.useState('')
  const matches = useMediaQuery('(min-width: 640px)')

  const onClose = () => {
    setUrl('')
    setError('')
    setOpened(false)
  }

  const addImage = () => {
    try {
      z.string().url().parse(url)
      editor?.chain().focus().setImage({ src: url }).run()
      onClose()
    } catch {
      setError('URL is not valid')
    }
  }

  return (
    <>
      <Tiptap
        editor={editor}
        styles={(theme) => ({
          content: {
            ...getCodeHighlight(theme),
            padding: !editor?.isEditable && 0,
          },
          root: {
            border: !editor?.isEditable && 'none',
          },
        })}
        withCodeHighlightStyles={false}
      >
        {editor?.isEditable && (
          <Tiptap.Toolbar sticky stickyOffset={matches ? 0 : 60}>
            <Tiptap.ControlsGroup>
              <Tiptap.Bold />
              <Tiptap.Italic />
              <Tiptap.Underline />
              <Tiptap.Strikethrough
                aria-label='Strikethrough'
                title='Strikethrough'
              />
              <Tiptap.ClearFormatting />
              <Tiptap.Highlight />
              <Tiptap.CodeBlock />
              <Tiptap.Control
                onClick={() => setOpened(true)}
                aria-label='Add image'
                title='Add image'
              >
                <IconPhoto stroke={1.5} size={16} />
              </Tiptap.Control>
            </Tiptap.ControlsGroup>
            <Tiptap.ControlsGroup>
              <Tiptap.H1 />
              <Tiptap.H2 />
              <Tiptap.H3 />
              <Tiptap.H4 />
              <Tiptap.H5 />
              <Tiptap.H6 />
            </Tiptap.ControlsGroup>
            <Tiptap.ControlsGroup>
              <Tiptap.Blockquote />
              <Tiptap.Hr />
              <Tiptap.BulletList />
              <Tiptap.OrderedList />
              <Tiptap.Subscript />
              <Tiptap.Superscript />
              <Tiptap.ColorPicker
                colors={[
                  '#25262b',
                  '#868e96',
                  '#fa5252',
                  '#e64980',
                  '#be4bdb',
                  '#7950f2',
                  '#4c6ef5',
                  '#228be6',
                  '#15aabf',
                  '#12b886',
                  '#40c057',
                  '#82c91e',
                  '#fab005',
                  '#fd7e14',
                ]}
              />
            </Tiptap.ControlsGroup>
            <Tiptap.ControlsGroup>
              <Tiptap.Link />
              <Tiptap.Unlink />
            </Tiptap.ControlsGroup>
            <Tiptap.ControlsGroup>
              <Tiptap.AlignLeft />
              <Tiptap.AlignCenter />
              <Tiptap.AlignJustify />
              <Tiptap.AlignRight />
            </Tiptap.ControlsGroup>
            <Tiptap.ControlsGroup>
              <Tiptap.Control
                onClick={() => editor?.chain().focus().undo().run()}
                aria-label='Undo'
                title='Undo'
              >
                <IconArrowBackUp stroke={1.5} size={16} />
              </Tiptap.Control>
              <Tiptap.Control
                onClick={() => editor?.chain().focus().redo().run()}
                aria-label='Redo'
                title='Redo'
              >
                <IconArrowForwardUp stroke={1.5} size={16} />
              </Tiptap.Control>
            </Tiptap.ControlsGroup>
            {String(editor?.storage.characterCount.words())} words
          </Tiptap.Toolbar>
        )}
        <Tiptap.Content />
      </Tiptap>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        title='Add image'
        overlayBlur={3}
        centered
      >
        <TextInput
          label='Image url'
          placeholder='URL'
          value={url}
          onChange={setUrl}
          error={error}
          withAsterisk
          required
        />
        <Flex gap={8} justify='end' mt={16}>
          <Button variant='default' onClick={() => onClose()}>
            Cancel
          </Button>
          <Button onClick={addImage}>Add</Button>
        </Flex>
      </Modal>
    </>
  )
}

export default RichTextEditor
