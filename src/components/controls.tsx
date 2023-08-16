'use client'

import {
  IconDotsVertical,
  IconPencil,
  IconShare,
  IconTrash,
} from '@tabler/icons-react'
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
  DropdownMenuTrigger,
} from '@tszhong0411/ui'
import Link from 'next/link'
import { User } from 'next-auth'
import { title } from 'process'
import React from 'react'
import toast from 'react-hot-toast'

import { deletePost } from '@/actions'
import { site } from '@/config/site'
import { copyUrl } from '@/utils/copy-url'

type ControlsProps = {
  id: string
  user: User | null | undefined
  authorId: string
}

const Controls = (props: ControlsProps) => {
  const { id, user, authorId } = props
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
            <IconDotsVertical width={20} height={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => copyUrl(`${site.url}/posts/${id}`)}>
            <IconShare width={20} height={20} className='mr-2' />
            Share
          </DropdownMenuItem>
          {user && user.id === authorId && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/editor/${id}`}>
                  <IconPencil width={20} height={20} className='mr-2' />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <IconTrash width={20} height={20} className='mr-2' />
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
            "{title}" will be permanently deleted. This action cannot be undone.
          </AlertDialogDescription>
          <div className='flex justify-between'>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className={buttonVariants({
                variant: 'danger',
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
