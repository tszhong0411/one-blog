import { Editor, EditorContent } from '@tiptap/react'
import clsx from 'clsx'

import Toolbar from './Toolbar'

type TiptapProps = {
  editor: Editor | null
}

const Tiptap = (props: TiptapProps) => {
  const { editor } = props

  return (
    <div className='flex flex-col w-full'>
      {editor?.isEditable && (
        <div className='items-center flex flex-wrap p-1 border-x border-t border-accent-2 rounded-t toolbar'>
          <Toolbar editor={editor} />
        </div>
      )}
      <EditorContent
        editor={editor}
        className={clsx('py-6 px-2 min-h-[350px] bg-hong-bg', {
          ['border border-accent-2 rounded-b']: editor?.isEditable,
        })}
      />
    </div>
  )
}

export default Tiptap
