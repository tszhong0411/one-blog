'use client'

import { Post } from '@prisma/client'
import { JSONContent } from '@tiptap/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-hot-toast'

import { useEditor } from '@/hooks'

import Tiptap from '@/components/Tiptap'

type FormProps = Partial<Post>

const Form = (props: FormProps) => {
  const { title, content, id } = props

  const editor = useEditor({
    options: {
      content: (content as JSONContent) ?? null,
    },
  })
  const inputRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [disabled, setDisabled] = React.useState(false)

  const handleCreate = async () => {
    if (!inputRef.current?.value) return toast.error('標題不能為空')

    setDisabled(true)

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: editor?.getJSON(),
        title: inputRef.current?.value,
      }),
    })

    setDisabled(false)

    if (!res.ok) return toast.error('新增文章失敗')

    const { id } = await res.json()
    toast.success('新增文章成功')

    if (id) {
      router.push(`/post/${id}`)
    }
  }

  const handleDelete = async () => {
    if (!id) return

    const confirmed = confirm('確定要刪除文章嗎？')

    if (!confirmed) return

    setDisabled(true)

    const res = await fetch('/api/posts', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })

    setDisabled(false)

    if (!res.ok) return toast.error('刪除文章失敗')

    toast.success('刪除文章成功')
    router.push('/')
  }

  const handleUpdate = async () => {
    if (!id) return

    if (!inputRef.current?.value) return toast.error('標題不能為空')

    setDisabled(true)

    const res = await fetch('/api/posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: editor?.getJSON(),
        id,
        title: inputRef.current?.value,
      }),
    })

    setDisabled(false)

    if (!res.ok) return toast.error('更新文章失敗')

    toast.success('更新文章成功')
    router.push(`/post/${id}`)
  }

  return (
    <div className='w-full space-y-4'>
      <div>
        <label className='text-sm font-bold mb-2' htmlFor='title'>
          標題
        </label>
        <input
          className='appearance-none border border-accent-2 rounded w-full py-2 px-3 focus:outline-none bg-hong-bg'
          id='title'
          type='text'
          defaultValue={title ?? ''}
          ref={inputRef}
        />
      </div>

      <Tiptap editor={editor} />

      <div className='flex justify-between'>
        {!title && !content && (
          <>
            <Link
              className='px-4 py-2 font-bold rounded-md border border-accent-5 hover:border-white transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              href='/'
            >
              取消
            </Link>
            <button
              className='px-4 py-2 font-bold rounded-md border border-accent-5 hover:border-white transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              disabled={disabled}
              onClick={handleCreate}
            >
              發佈
            </button>
          </>
        )}
        {title && content && (
          <>
            <button
              className='px-4 py-2 font-bold rounded-md border border-accent-5 hover:border-white transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              disabled={disabled}
              onClick={handleDelete}
            >
              刪除
            </button>
            <button
              className='px-4 py-2 font-bold rounded-md border border-accent-5 hover:border-white transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              disabled={disabled}
              onClick={handleUpdate}
            >
              更新
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Form
