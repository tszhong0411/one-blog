'use client'

import { IconPencilPlus } from '@tabler/icons-react'
import { Button } from '@tszhong0411/ui'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-hot-toast'

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
      loading={isPending}
      disabled={isPending}
    >
      <IconPencilPlus size={20} className='mr-2' />
      Write
    </Button>
  )
}

export default NewPostButton
