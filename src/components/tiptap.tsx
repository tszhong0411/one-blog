import { Editor, EditorContent } from '@tiptap/react'
import { cx } from '@tszhong0411/utils'

import Toolbar from './toolbar'

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
        className={cx('min-h-[350px] bg-accent-bg px-2 py-6', {
          ['rounded-b border-x border-b border-accent-2']: editor?.isEditable,
        })}
      />
    </div>
  )
}

export default Tiptap
