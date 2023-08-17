import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBlockquote,
  IconBold,
  IconClearFormatting,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconHighlight,
  IconItalic,
  IconLineDashed,
  IconLink,
  IconList,
  IconListDetails,
  IconListNumbers,
  IconPilcrow,
  IconStrikethrough,
  IconTerminal2,
} from '@tabler/icons-react'
import { Editor } from '@tiptap/react'
import { cx } from '@tszhong0411/utils'
import React from 'react'

type ToolbarProps = {
  editor: Editor
}

const Divider = () => <div className='mx-3 h-5 w-[2px] bg-accent-3' />

const Toolbar = (props: ToolbarProps) => {
  const { editor } = props

  const setLink = React.useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <div
      className={cx(
        'sticky top-[60px] z-10 flex flex-wrap items-center rounded-t border border-accent-2 bg-accent-bg p-1',
        '[&>button:hover]:bg-accent-3 [&>button]:mr-1 [&>button]:h-7 [&>button]:w-7 [&>button]:rounded [&>button]:p-1',
        '[&>button:disabled]:cursor-not-allowed [&>button:disabled]:opacity-50',
      )}
    >
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cx(editor.isActive('bold') ? 'bg-accent-3' : '')}
        title='Bold'
      >
        <IconBold stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cx(editor.isActive('italic') ? 'bg-accent-3' : '')}
        title='Italic'
      >
        <IconItalic stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cx(editor.isActive('strike') ? 'bg-accent-3' : '')}
        title='Strikethrough'
      >
        <IconStrikethrough stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cx(editor.isActive('code') ? 'bg-accent-3' : '')}
        title='Code'
      >
        <IconCode stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        className={cx(editor.isActive('highlight') ? 'bg-accent-3' : '')}
        title='Highlight'
      >
        <IconHighlight stroke={1.5} size={20} />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cx(
          editor.isActive('heading', { level: 1 }) ? 'bg-accent-3' : '',
        )}
        title='Heading 1'
      >
        <IconH1 stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cx(
          editor.isActive('heading', { level: 2 }) ? 'bg-accent-3' : '',
        )}
        title='Heading 2'
      >
        <IconH2 stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cx(
          editor.isActive('heading', { level: 3 }) ? 'bg-accent-3' : '',
        )}
        title='Heading 3'
      >
        <IconH3 stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cx(editor.isActive('paragraph') ? 'bg-accent-3' : '')}
        title='Paragraph'
      >
        <IconPilcrow stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cx(editor.isActive('bulletList') ? 'bg-accent-3' : '')}
        title='Bullet List'
      >
        <IconList stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cx(editor.isActive('orderedList') ? 'bg-accent-3' : '')}
        title='Ordered List'
      >
        <IconListNumbers stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={cx(editor.isActive('taskList') ? 'bg-accent-3' : '')}
        title='Task List'
      >
        <IconListDetails stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cx(editor.isActive('codeBlock') ? 'bg-accent-3' : '')}
        title='Code Block'
      >
        <IconTerminal2 stroke={1.5} size={20} />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => setLink()}
        className={cx(editor.isActive('link') && 'bg-accent-3')}
        title='Link'
      >
        <IconLink stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cx(editor.isActive('blockquote') ? 'bg-accent-3' : '')}
        title='Blockquote'
      >
        <IconBlockquote stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title='Horizontal Rule'
      >
        <IconLineDashed stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        title='Clear Formatting'
      >
        <IconClearFormatting stroke={1.5} size={20} />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title='Undo'
      >
        <IconArrowBackUp stroke={1.5} size={20} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title='Redo'
      >
        <IconArrowForwardUp stroke={1.5} size={20} />
      </button>
    </div>
  )
}

export default Toolbar
