'use client'

import { Loader2, PenSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui'

import { createNewPost } from '@/actions'

const NewPostButton = () => {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const newPost = () => {
    startTransition(async () => {
      try {
        const postId = await createNewPost('Untitled post')
        router.refresh()
        router.push(`/editor/${postId}`)
      } catch (error) {
        toast.error((error as Error).message)
      }
    })
  }

  return (
    <Button
      variant='ghost'
      className='py-1.5'
      onClick={newPost}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 size={16} className='animate-spin' />
      ) : (
        <PenSquare size={16} className='mr-2' />
      )}
      Write
    </Button>
  )
}

export default NewPostButton
