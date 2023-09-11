'use client'

import { MoreVertical, Pencil, Share2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { User } from 'next-auth'
import React from 'react'
import toast from 'react-hot-toast'

import { deletePost } from '@/actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Button,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui'
import { site } from '@/config/site'
import { copyUrl } from '@/utils/copy-url'

type ControlsProps = {
  id: string
  user: User | null | undefined
  authorId: string
  postTitle: string
}

const Controls = (props: ControlsProps) => {
  const { id, user, authorId, postTitle } = props
  const [open, setOpen] = React.useState(false)

  const handleDelete = async () => {
    try {
      await deletePost(id)
      toast.success('Post deleted')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='px-2'>
            <MoreVertical size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => copyUrl(`${site.url}/posts/${id}`)}>
            <Share2 size={16} className='mr-2.5' />
            Share
          </DropdownMenuItem>
          {user && user.id === authorId && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/editor/${id}`}>
                  <Pencil size={16} className='mr-2.5' />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash2 size={16} className='mr-2.5' />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            &quot;{postTitle}&quot; will be permanently deleted. This action
            cannot be undone.
          </AlertDialogDescription>
          <div className='flex justify-between'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className={buttonVariants({
                variant: 'destructive'
              })}
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Controls
