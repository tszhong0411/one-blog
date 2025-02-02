import type { AnyExtension } from '@tiptap/react'

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { Highlight } from '@tiptap/extension-highlight'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { StarterKit } from '@tiptap/starter-kit'
import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

export const extensions: AnyExtension[] = [
  StarterKit.configure({
    codeBlock: false
  }),
  Highlight,
  TaskList,
  TaskItem.configure({
    nested: true
  }),
  Placeholder.configure({
    placeholder: 'Type something ...'
  }),
  Link.configure({
    openOnClick: false
  }).extend({
    inclusive: false,
    priority: 100
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: 'plaintext',
    HTMLAttributes: {
      class: 'p-3 not-prose bg-secondary/50 rounded-lg border my-6'
    }
  })
]
