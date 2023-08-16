'use client'

import { Post, Visibility } from '@prisma/client'
import { IconSettings } from '@tabler/icons-react'
import { JSONContent } from '@tiptap/react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@tszhong0411/ui'
import { cx } from '@tszhong0411/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-hot-toast'

import Back from '@/components/back'
import Editor from '@/components/editor'

import { savePost, saveVisibility } from '@/actions'

type FormProps = {
  post: Post
}

const Form = (props: FormProps) => {
  const { post } = props
  const [title, setTitle] = React.useState(post.title)
  const [description, setDescription] = React.useState(post.description)
  const [content, setContent] = React.useState<JSONContent>(
    post.content as JSONContent,
  )
  const [visibility, setVisibility] = React.useState<Visibility>(
    post.visibility,
  )
  const [saving, setSaving] = React.useState(false)
  const [publishing, setPublishing] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const handleSave = async () => {
    if (!title) {
      return toast.error('Title cannot be empty')
    }

    setSaving(true)

    try {
      await savePost(
        post.id,
        title,
        JSON.stringify(content),
        description,
        false,
      )
      toast.success('Post saved')
      setSaving(false)
    } catch (error) {
      toast.error((error as Error).message)
      setSaving(false)
    }

    return
  }

  const handleSaveSettings = async () => {
    try {
      await saveVisibility(post.id, visibility)
      toast.success('Post saved')
      setOpen(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handlePublish = async () => {
    if (!title) {
      return toast.error('Title cannot be empty')
    }

    setPublishing(true)

    try {
      await savePost(post.id, title, JSON.stringify(content), description, true)
      toast.success('Post published')
      setPublishing(false)
      router.push(`/posts/${post.id}`)
    } catch (error) {
      toast.error((error as Error).message)
      setPublishing(false)
    }

    return
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Back />
        {post.published && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <IconSettings width={20} height={20} />
            </DialogTrigger>
            <DialogContent>
              <div className='mb-1.5 text-sm font-medium leading-none'>
                Visibility
              </div>
              <Select
                value={visibility}
                onValueChange={(value) => setVisibility(value as Visibility)}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Visibility.PUBLIC}>Public</SelectItem>
                  <SelectItem value={Visibility.PRIVATE}>Private</SelectItem>
                </SelectContent>
              </Select>
              <div className='flex justify-end'>
                <Button onClick={handleSaveSettings}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className='my-8 space-y-6'>
        <div className='flex flex-col gap-1.5'>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='text'
            id='title'
            placeholder='Title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
        </div>
        <div className='flex w-full flex-col gap-1.5'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            placeholder='Description'
            id='description'
            value={description ?? undefined}
            onChange={(e) => {
              setDescription(e.target.value)
            }}
          />
        </div>
        <Editor
          options={{
            content,
          }}
          onChange={(editor) => {
            setContent(editor.getJSON())
          }}
        />
        <div
          className={cx(
            'flex',
            post.published ? 'justify-end' : 'justify-between',
          )}
        >
          {!post.published && (
            <Button onClick={handleSave} disabled={saving} loading={saving}>
              Save as draft
            </Button>
          )}
          <Button
            onClick={handlePublish}
            disabled={publishing}
            loading={publishing}
          >
            Publish
          </Button>
        </div>
      </div>
    </>
  )
}

export default Form
