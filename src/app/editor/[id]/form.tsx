'use client'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { GlobeIcon, Loader2Icon, LockIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

import { updatePostAction } from '@/actions/update-post-action'
import Editor from '@/components/editor'
import { type Post, Visibility } from '@/db/schema'
import { capitalize } from '@/utils/capitalize'

type FormProps = {
  post: Post
}

const Form = (props: FormProps) => {
  const { post } = props
  const [title, setTitle] = useState(post.title)
  const [description, setDescription] = useState(post.description)
  const [content, setContent] = useState(post.content)
  const [visibility, setVisibility] = useState<Visibility>(post.visibility as Visibility)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const action = useAction(updatePostAction, {
    onSuccess: ({ input }) => {
      if (input.visibility) {
        toast.success(`Visibility set to ${input.visibility}`)
        setIsOpen(false)
        return
      }

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
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant='outline'>
                {visibility === Visibility.Public ? (
                  <GlobeIcon className='mr-2 size-4' />
                ) : (
                  <LockIcon className='mr-2 size-4' />
                )}
                {capitalize(visibility)}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change visibility</DialogTitle>
                <DialogDescription>
                  Keep this post private or make it publicly accessible.
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-1.5'>
                <Label htmlFor='visibility'>Visibility</Label>
                <Select
                  value={visibility}
                  onValueChange={(value) => {
                    setVisibility(value as Visibility)
                  }}
                >
                  <SelectTrigger id='visibility' className='w-[180px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Visibility.Public}>Public</SelectItem>
                    <SelectItem value={Visibility.Private}>Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button disabled={action.isExecuting} onClick={handleVisibilityChange}>
                  {action.isExecuting ? <Loader2Icon className='mr-2 size-4 animate-spin' /> : null}
                  Save
                </Button>
              </DialogFooter>
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
          options={{ content }}
          onChange={(editor) => {
            setContent(editor.getHTML())
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
