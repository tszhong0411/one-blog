import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBlockquote,
  IconBold,
  IconClearFormatting,
  IconCode,
  IconH1,
  IconH2,
  IconHighlight,
  IconItalic,
  IconLineDashed,
  IconList,
  IconListDetails,
  IconListNumbers,
  IconPilcrow,
  IconStrikethrough,
  IconTerminal2,
} from '@tabler/icons-react'
import { Editor } from '@tiptap/react'
import clsx from 'clsx'
import React from 'react'

type ToolbarProps = {
  editor: Editor | null
}

const Divider = () => {
  return <div className='bg-accent-3 h-5 w-[2px] mx-3' />
}

const Toolbar = (props: ToolbarProps) => {
  const { editor } = props

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={clsx(editor.isActive('bold') ? 'bg-accent-3' : '')}
      >
        <IconBold stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={clsx(editor.isActive('italic') ? 'bg-accent-3' : '')}
      >
        <IconItalic stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={clsx(editor.isActive('strike') ? 'bg-accent-3' : '')}
      >
        <IconStrikethrough stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={clsx(editor.isActive('code') ? 'bg-accent-3' : '')}
      >
        <IconCode stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        className={clsx(editor.isActive('highlight') ? 'bg-accent-3' : '')}
      >
        <IconHighlight stroke={1.5} size={20} />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={clsx(
          editor.isActive('heading', { level: 1 }) ? 'bg-accent-3' : ''
        )}
      >
        <IconH1 stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={clsx(
          editor.isActive('heading', { level: 2 }) ? 'bg-accent-3' : ''
        )}
      >
        <IconH2 stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={clsx(editor.isActive('paragraph') ? 'bg-accent-3' : '')}
      >
        <IconPilcrow stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={clsx(editor.isActive('bulletList') ? 'bg-accent-3' : '')}
      >
        <IconList stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={clsx(editor.isActive('orderedList') ? 'bg-accent-3' : '')}
      >
        <IconListNumbers stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={clsx(editor.isActive('taskList') ? 'bg-accent-3' : '')}
      >
        <IconListDetails stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={clsx(editor.isActive('codeBlock') ? 'bg-accent-3' : '')}
      >
        <IconTerminal2 stroke={1.5} size={20} />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={clsx(editor.isActive('blockquote') ? 'bg-accent-3' : '')}
      >
        <IconBlockquote stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <IconLineDashed stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <IconClearFormatting stroke={1.5} size={20} />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <IconArrowBackUp stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <IconArrowForwardUp stroke={1.5} size={20} />
      </button>
    </>
  )
}

export default Toolbar
