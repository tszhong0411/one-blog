import { Editor, EditorContent } from '@tiptap/react'
import clsx from 'clsx'

import Toolbar from './Toolbar'

type TiptapProps = {
  editor: Editor | null
}

const Tiptap = (props: TiptapProps) => {
  const { editor } = props

  return (
    <div className='flex w-full flex-col'>
      {editor?.isEditable && (
        <div className='toolbar flex flex-wrap items-center rounded-t border-x border-t border-accent-2 p-1'>
          <Toolbar editor={editor} />
        </div>
      )}
      <EditorContent
        editor={editor}
        className={clsx('min-h-[350px] bg-hong-bg py-6 px-2', {
          ['rounded-b border border-accent-2']: editor?.isEditable,
        })}
      />
    </div>
  )
}

export default Tiptap
