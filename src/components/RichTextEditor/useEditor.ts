import { Link } from '@mantine/tiptap'
import CharacterCount from '@tiptap/extension-character-count'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorOptions, useEditor as useTiptapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { lowlight } from 'lowlight'
import { DependencyList } from 'react'

type useEditorProps = {
  options?: Partial<EditorOptions>
  deps?: DependencyList
}

export const useEditor = (props: useEditorProps) => {
  const {
    options: { extensions = [], content, ...rest },
    deps,
  } = props

  return useTiptapEditor(
    {
      extensions: [
        StarterKit.configure({
          codeBlock: false,
        }),
        Underline,
        Link,
        TextStyle,
        Superscript,
        Subscript,
        Highlight,
        Image,
        Color,
        CharacterCount,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
        ...extensions,
      ],
      content,
      ...rest,
    },
    deps
  )
}
