'use client'

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
  IconLoader2,
  IconPilcrow,
  IconStrikethrough,
  IconTerminal2,
} from '@tabler/icons-react'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import {
  EditorContent,
  EditorEvents,
  EditorOptions,
  useEditor,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cx } from '@tszhong0411/utils'
import { lowlight } from 'lowlight'
import '@/styles/editor.css'

const Divider = () => {
  return <div className='mx-3 h-5 w-[2px] bg-accent-3' />
}

type EditorProps = {
  options?: Partial<EditorOptions>
  onChange?: (editor: EditorEvents['update']['editor']) => void
}

const Editor = (props: EditorProps) => {
  const { options, onChange } = props

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Placeholder.configure({
        placeholder: 'Type something ...',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange && onChange(editor)
    },
    ...options,
  })

  if (!editor)
    return (
      <IconLoader2 width={36} height={36} className='mx-auto animate-spin' />
    )

  return (
    <div className='flex w-full flex-col'>
      {editor.isEditable && (
        <div className='toolbar flex flex-wrap items-center rounded-t border-x border-t border-accent-2 p-1'>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={cx(editor.isActive('bold') ? 'bg-accent-3' : '')}
          >
            <IconBold stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={cx(editor.isActive('italic') ? 'bg-accent-3' : '')}
          >
            <IconItalic stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={cx(editor.isActive('strike') ? 'bg-accent-3' : '')}
          >
            <IconStrikethrough stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={cx(editor.isActive('code') ? 'bg-accent-3' : '')}
          >
            <IconCode stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            disabled={!editor.can().chain().focus().toggleHighlight().run()}
            className={cx(editor.isActive('highlight') ? 'bg-accent-3' : '')}
          >
            <IconHighlight stroke={1.5} size={20} />
          </button>
          <Divider />
          <button
            type='button'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={cx(
              editor.isActive('heading', { level: 1 }) ? 'bg-accent-3' : '',
            )}
          >
            <IconH1 stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={cx(
              editor.isActive('heading', { level: 2 }) ? 'bg-accent-3' : '',
            )}
          >
            <IconH2 stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={cx(editor.isActive('paragraph') ? 'bg-accent-3' : '')}
          >
            <IconPilcrow stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cx(editor.isActive('bulletList') ? 'bg-accent-3' : '')}
          >
            <IconList stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cx(editor.isActive('orderedList') ? 'bg-accent-3' : '')}
          >
            <IconListNumbers stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={cx(editor.isActive('taskList') ? 'bg-accent-3' : '')}
          >
            <IconListDetails stroke={1.5} size={20} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={cx(editor.isActive('codeBlock') ? 'bg-accent-3' : '')}
          >
            <IconTerminal2 stroke={1.5} size={20} />
          </button>
          <Divider />
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cx(editor.isActive('blockquote') ? 'bg-accent-3' : '')}
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
        </div>
      )}
      <EditorContent
        editor={editor}
        className={cx(
          'min-h-[350px] bg-accent-bg px-2 py-6',
          editor.isEditable && 'rounded-b border border-accent-2',
        )}
      />
    </div>
  )
}

export default Editor
