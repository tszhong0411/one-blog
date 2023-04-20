import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { EditorOptions, useEditor as useTiptap } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { lowlight } from 'lowlight'
import { DependencyList } from 'react'

type useEditorProps = {
  options?: Partial<EditorOptions>
  deps?: DependencyList
}

export const useEditor = (props: useEditorProps) => {
  const { options, deps } = props

  return useTiptap(
    {
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
          placeholder: 'Write something ...',
        }),
      ].concat(options?.extensions || []),
      editorProps: {
        attributes: {
          class: 'mx-auto focus:outline-none',
        },
      },
      ...options,
    },
    deps
  )
}
