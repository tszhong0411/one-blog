'use client'

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
  toast
} from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { Loader2Icon, SettingsIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

import { updatePostAction } from '@/actions/update-post-action'
import Editor from '@/components/editor'
import { type Post, Visibility } from '@/db/schema'

type FormProps = {
  post: Post
}

const Form = (props: FormProps) => {
  const { post } = props
  const [title, setTitle] = useState(post.title)
  const [description, setDescription] = useState(post.description)
  const [content, setContent] = useState(post.content)
  const [visibility, setVisibility] = useState<Visibility>(post.visibility as Visibility)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const action = useAction(updatePostAction, {
    onSuccess: ({ input }) => {
      if (input.published) {
        toast.success('Post published')
        router.push(`/posts/${post.id}`)
        return
      }

      toast.success('Post saved')
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    }
  })

  const handleUpdatePost = async (published = false) => {
    await action.executeAsync({
      postId: post.id,
      title,
      content,
      description,
      published
    })
  }

  const handleVisibilityChange = async () => {
    await action.executeAsync({
      postId: post.id,
      visibility
    })
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        {post.published && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon'>
                <SettingsIcon className='size-4' />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className='mb-1.5 text-sm font-medium leading-none'>Visibility</div>
              <Select
                value={visibility}
                onValueChange={(value) => {
                  setVisibility(value as Visibility)
                }}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Visibility.Public}>Public</SelectItem>
                  <SelectItem value={Visibility.Private}>Private</SelectItem>
                </SelectContent>
              </Select>
              <div className='flex justify-end'>
                <Button onClick={handleVisibilityChange}>Save</Button>
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
            content
          }}
          onChange={(editor) => {
            setContent(editor.storage.markdown.getMarkdown() as string)
          }}
        />
        <div className={cn('flex', post.published ? 'justify-end' : 'justify-between')}>
          {!post.published && (
            <Button onClick={() => handleUpdatePost()} disabled={action.isExecuting}>
              {action.isExecuting && <Loader2Icon className='mr-2 size-4 animate-spin' />}
              Save as draft
            </Button>
          )}
          <Button onClick={() => handleUpdatePost(true)} disabled={action.isExecuting}>
            {action.isExecuting && <Loader2Icon className='mr-2 size-4 animate-spin' />}
            Publish
          </Button>
        </div>
      </div>
    </>
  )
}

export default Form
