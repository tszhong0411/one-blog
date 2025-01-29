'use client'

import { Button, toast } from '@tszhong0411/ui'
import { Loader2Icon, PenSquareIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'

import { createPostAction } from '@/actions/create-post-action'

const NewPostButton = () => {
  const router = useRouter()
  const action = useAction(createPostAction, {
    onSuccess: ({ data }) => {
      if (!data?.postId) {
        toast.error('Failed to create new post')
        return
      }
      router.refresh()
      router.push(`/editor/${data.postId}`)
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    }
  })

  const newPost = async () => {
    await action.executeAsync({ title: 'Untitled post' })
  }

  return (
    <Button variant='ghost' className='py-1.5' onClick={newPost} disabled={action.isExecuting}>
      {action.isExecuting ? (
        <Loader2Icon className='mr-2 size-4 animate-spin' />
      ) : (
        <PenSquareIcon className='mr-2 size-4' />
      )}
      Write
    </Button>
  )
}

export default NewPostButton
