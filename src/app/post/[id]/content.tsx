'use client'

import { JSONContent } from '@tiptap/react'

import { useEditor } from '@/hooks'

import Tiptap from '@/components/Tiptap'

type ContentProps = {
  content: JSONContent
}

const Content = (props: ContentProps) => {
  const { content } = props

  const editor = useEditor({
    options: {
      content,
      editable: false,
    },
  })

  return <Tiptap editor={editor} />
}

export default Content
