'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  buttonVariants,
  Input,
  Label,
  toast
} from '@tszhong0411/ui'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'

import { deleteAccountAction } from '@/actions/delete-account-action'

const Danger = () => {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const action = useAction(deleteAccountAction, {
    onSuccess: () => {
      toast.success('Your account has been deleted')
      router.push('/')
      router.refresh()
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    }
  })
  const router = useRouter()

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (value !== 'delete my account') {
      toast.error('Please type "delete my account" to continue')
      return
    }

    await action.executeAsync()
  }

  return (
    <div className='rounded-lg border border-red-500/50'>
      <div className='space-y-4 p-4'>
        <h4 className='text-xl font-semibold'>Delete my account</h4>
        <p className='text-muted-foreground text-sm'>
          This action will permanently remove all your posts, data, and personal information
          associated with your account. This action is irreversible and cannot be undone.
        </p>
      </div>
      <div className='rounded-b-lg border-t border-red-500/50 bg-red-500/20 px-4 py-2.5'>
        <AlertDialog open={isOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant='destructive'
              onClick={() => {
                setIsOpen(true)
              }}
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent asChild>
            <form onSubmit={handleDeleteAccount}>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className='my-4 flex flex-col gap-2'>
                <Label htmlFor='confirm' className='text-muted-foreground'>
                  Type{' '}
                  <span className='text-secondary-foreground font-semibold'>delete my account</span>{' '}
                  to continue:
                </Label>
                <Input
                  type='text'
                  id='confirm'
                  onChange={(e) => {
                    setValue(e.target.value)
                  }}
                  required
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setIsOpen(false)
                    setValue('')
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({
                    variant: 'destructive'
                  })}
                  type='submit'
                  disabled={value !== 'delete my account' || action.isExecuting}
                >
                  {action.isExecuting ? <Loader2Icon className='mr-2 size-4 animate-spin' /> : null}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default Danger
