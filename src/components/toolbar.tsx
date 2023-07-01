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
import { Button } from '@tszhong0411/ui'
import { cx } from '@tszhong0411/utils'

type ToolbarProps = {
  editor: Editor | null
}

const Divider = () => {
  return <div className='mx-3 h-5 w-[2px] bg-accent-3' />
}

const Toolbar = (props: ToolbarProps) => {
  const { editor } = props

  if (!editor) {
    return null
  }

  return (
    <>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cx(editor.isActive('bold') ? 'bg-accent-3' : '')}
        title='Bold'
      >
        <IconBold stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cx(editor.isActive('italic') ? 'bg-accent-3' : '')}
        title='Italic'
      >
        <IconItalic stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cx(editor.isActive('strike') ? 'bg-accent-3' : '')}
        title='Strikethrough'
      >
        <IconStrikethrough stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cx(editor.isActive('code') ? 'bg-accent-3' : '')}
        title='Code'
      >
        <IconCode stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        className={cx(editor.isActive('highlight') ? 'bg-accent-3' : '')}
        title='Highlight'
      >
        <IconHighlight stroke={1.5} size={20} />
      </Button>
      <Divider />
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cx(
          editor.isActive('heading', { level: 1 }) ? 'bg-accent-3' : ''
        )}
        title='Heading 1'
      >
        <IconH1 stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cx(
          editor.isActive('heading', { level: 2 }) ? 'bg-accent-3' : ''
        )}
        title='Heading 2'
      >
        <IconH2 stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cx(editor.isActive('paragraph') ? 'bg-accent-3' : '')}
        title='Paragraph'
      >
        <IconPilcrow stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cx(editor.isActive('bulletList') ? 'bg-accent-3' : '')}
        title='Bullet List'
      >
        <IconList stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cx(editor.isActive('orderedList') ? 'bg-accent-3' : '')}
        title='Ordered List'
      >
        <IconListNumbers stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={cx(editor.isActive('taskList') ? 'bg-accent-3' : '')}
        title='Task List'
      >
        <IconListDetails stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cx(editor.isActive('codeBlock') ? 'bg-accent-3' : '')}
        title='Code Block'
      >
        <IconTerminal2 stroke={1.5} size={20} />
      </Button>
      <Divider />
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cx(editor.isActive('blockquote') ? 'bg-accent-3' : '')}
        title='Blockquote'
      >
        <IconBlockquote stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        title='Horizontal Rule'
      >
        <IconLineDashed stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        title='Clear Formatting'
      >
        <IconClearFormatting stroke={1.5} size={20} />
      </Button>
      <Divider />
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title='Undo'
      >
        <IconArrowBackUp stroke={1.5} size={20} />
      </Button>
      <Button
        variant='ghost'
        type='button'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title='Redo'
      >
        <IconArrowForwardUp stroke={1.5} size={20} />
      </Button>
    </>
  )
}

export default Toolbar
