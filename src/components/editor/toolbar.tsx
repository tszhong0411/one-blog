import { type Editor } from '@tiptap/react'
import { cn } from '@tszhong0411/utils'
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HighlighterIcon,
  ItalicIcon,
  LayoutListIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PilcrowIcon,
  RemoveFormattingIcon,
  RotateCcwIcon,
  RotateCwIcon,
  StrikethroughIcon,
  TerminalSquareIcon,
  TextQuoteIcon
} from 'lucide-react'
import { useCallback } from 'react'

type ToolbarProps = {
  editor: Editor
}

const Divider = () => <div className='bg-muted mx-3 h-5 w-[2px]' />

const Toolbar = (props: ToolbarProps) => {
  const { editor } = props

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = globalThis.prompt('URL', previousUrl as string)

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
      className={cn(
        'bg-background sticky top-[60px] z-10 flex flex-wrap items-center rounded-t border p-1',
        '[&>button:hover]:bg-muted [&>button]:mr-1 [&>button]:size-7 [&>button]:rounded [&>button]:p-1',
        '[&>button:disabled]:cursor-not-allowed [&>button:disabled]:opacity-50'
      )}
    >
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(editor.isActive('bold') ? 'bg-muted' : '')}
        aria-label='Bold'
      >
        <BoldIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(editor.isActive('italic') ? 'bg-muted' : '')}
        aria-label='Italic'
      >
        <ItalicIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(editor.isActive('strike') ? 'bg-muted' : '')}
        aria-label='Strikethrough'
      >
        <StrikethroughIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(editor.isActive('code') ? 'bg-muted' : '')}
        aria-label='Code'
      >
        <CodeIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        className={cn(editor.isActive('highlight') ? 'bg-muted' : '')}
        aria-label='Highlight'
      >
        <HighlighterIcon className='size-4' />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(editor.isActive('heading', { level: 1 }) ? 'bg-muted' : '')}
        aria-label='Heading 1'
      >
        <Heading1Icon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(editor.isActive('heading', { level: 2 }) ? 'bg-muted' : '')}
        aria-label='Heading 2'
      >
        <Heading2Icon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(editor.isActive('heading', { level: 3 }) ? 'bg-muted' : '')}
        aria-label='Heading 3'
      >
        <Heading3Icon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(editor.isActive('paragraph') ? 'bg-muted' : '')}
        aria-label='Paragraph'
      >
        <PilcrowIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive('bulletList') ? 'bg-muted' : '')}
        aria-label='Bullet List'
      >
        <ListIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive('orderedList') ? 'bg-muted' : '')}
        aria-label='Ordered List'
      >
        <ListOrderedIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={cn(editor.isActive('taskList') ? 'bg-muted' : '')}
        aria-label='Task List'
      >
        <LayoutListIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(editor.isActive('codeBlock') ? 'bg-muted' : '')}
        aria-label='Code Block'
      >
        <TerminalSquareIcon className='size-4' />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => {
          setLink()
        }}
        className={cn(editor.isActive('link') && 'bg-muted')}
        aria-label='Link'
      >
        <LinkIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(editor.isActive('blockquote') ? 'bg-muted' : '')}
        aria-label='Blockquote'
      >
        <TextQuoteIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        aria-label='Horizontal Rule'
      >
        <MinusIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        aria-label='Clear Formatting'
      >
        <RemoveFormattingIcon className='size-4' />
      </button>
      <Divider />
      <button
        type='button'
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        aria-label='Undo'
      >
        <RotateCcwIcon className='size-4' />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        aria-label='Redo'
      >
        <RotateCwIcon className='size-4' />
      </button>
    </div>
  )
}

export default Toolbar
