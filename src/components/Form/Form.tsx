'use client'

import { JSONContent } from '@tiptap/react'
import { User } from 'firebase/auth'
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { firestore } from '@/lib/firebase/app'
import { useEditor } from '@/hooks'

import Tiptap from '@/components/Tiptap'

import { Post } from '@/types'

type FormProps = { user: User } & Partial<Post>

const Form = (props: FormProps) => {
  const { title, content, id, user } = props

  const editor = useEditor({
    options: {
      content: content ? (JSON.parse(content) as JSONContent) : null,
    },
  })
  const inputRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [disabled, setDisabled] = React.useState(false)

  const handleCreate = async () => {
    if (!inputRef.current?.value) return toast.error('Title cannot be empty')

    setDisabled(true)

    try {
      const id = uuidv4()

      const userPostsCollection = collection(
        firestore,
        `users/${user.uid}/posts`
      )

      const post: Post = {
        id,
        authorId: user.uid,
        title: inputRef.current?.value,
        content: JSON.stringify(editor?.getJSON()),
        createdAt: Date.now(),
        likes: {},
      }

      const newPostRef = doc(userPostsCollection, id)

      await setDoc(newPostRef, post)

      setDisabled(false)

      toast.success('Successfully created post')

      router.push(`/post/${id}`)
    } catch (error) {
      console.log(error)
      toast.error('Create post failed')
    }

    return
  }

  const handleDelete = async () => {
    if (!id) return

    const confirmed = confirm('Are you sure you want to delete the post?')

    if (!confirmed) return

    setDisabled(true)

    try {
      const postDocRef = doc(firestore, `users/${user.uid}/posts/${id}`)

      await deleteDoc(postDocRef)

      setDisabled(false)
      toast.success('Successfully deleted post')
      router.push('/')
    } catch (error) {
      setDisabled(false)
      console.log(error)
      toast.error('Delete post failed')
    }
  }

  const handleUpdate = async () => {
    if (!id) return

    if (!inputRef.current?.value) return toast.error('Title cannot be empty')

    setDisabled(true)

    try {
      const postDocRef = doc(firestore, `users/${user.uid}/posts/${id}`)

      await updateDoc(postDocRef, {
        title: inputRef.current?.value,
        content: JSON.stringify(editor?.getJSON()),
      })

      setDisabled(false)

      toast.success('Successfully updated post')
      router.push(`/post/${id}`)
    } catch (error) {
      setDisabled(false)
      console.log(error)
      toast.error('Update post failed')
    }

    return
  }

  return (
    <div className='w-full space-y-4'>
      <div>
        <label className='mb-2 text-sm font-bold' htmlFor='title'>
          Title
        </label>
        <input
          className='w-full appearance-none rounded border border-accent-2 bg-hong-bg py-2 px-3 focus:outline-none'
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
              className='rounded-md border border-accent-5 px-4 py-2 font-bold transition-colors duration-150 hover:border-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              href='/'
            >
              Cancel
            </Link>
            <button
              className='rounded-md border border-accent-5 px-4 py-2 font-bold transition-colors duration-150 hover:border-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              disabled={disabled}
              onClick={handleCreate}
              type='button'
            >
              Publish
            </button>
          </>
        )}
        {title && content && (
          <>
            <button
              className='rounded-md border border-accent-5 px-4 py-2 font-bold transition-colors duration-150 hover:border-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              disabled={disabled}
              onClick={handleDelete}
              type='button'
            >
              Delete
            </button>
            <button
              className='rounded-md border border-accent-5 px-4 py-2 font-bold transition-colors duration-150 hover:border-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
              disabled={disabled}
              onClick={handleUpdate}
              type='button'
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Form
