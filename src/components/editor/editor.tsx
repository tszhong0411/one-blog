'use client'

import '@/styles/editor.css'

import { EditorContent, type EditorEvents, type EditorOptions, useEditor } from '@tiptap/react'
import { cn } from '@tszhong0411/utils'
import { Loader2Icon } from 'lucide-react'

import { extensions } from './extensions'
import Toolbar from './toolbar'

type EditorProps = {
  options?: Partial<EditorOptions>
  onChange?: (editor: EditorEvents['update']['editor']) => void
}

const Editor = (props: EditorProps) => {
  const { options, onChange } = props

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none mx-auto focus:outline-none'
      }
    },
    onUpdate: ({ editor: e }) => {
      if (onChange) {
        onChange(e)
      }
    },
    ...options
  })

  if (!editor) {
    return <Loader2Icon className='mx-auto size-6 animate-spin' />
  }

  return (
    <div className='flex w-full flex-col'>
      {editor.isEditable && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn(
          'min-h-[350px] bg-background px-2 py-6',
          editor.isEditable && 'rounded-b border'
        )}
      />
    </div>
  )
}

export default Editor
