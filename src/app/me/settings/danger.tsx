'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  buttonVariants,
  Input,
  Label
} from '@tszhong0411/ui'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'react-hot-toast'

import { deleteAccount } from '@/actions'

const Danger = () => {
  const [value, setValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const handleDeleteMyAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (value !== 'delete my account') {
      return toast.error('Please type "delete my account" to continue.')
    }

    try {
      await deleteAccount()
      toast.success('Your account has been deleted.')
      router.push('/')
      return router.refresh()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <div className='rounded-lg border border-red-500/50 bg-zinc-900/60'>
      <div className='p-4'>
        <h4 className='mb-6 text-2xl font-semibold'>Delete my account</h4>
        <p className='mb-4 text-sm'>
          This action will permanently remove all your posts, data, and personal
          information associated with your account. This action is irreversible
          and cannot be undone.
        </p>
      </div>
      <div className='border-t border-red-500/50 bg-red-900/30 px-4 py-2'>
        <AlertDialog open={open}>
          <AlertDialogTrigger asChild>
            <Button
              variant='destructive'
              className='ml-auto'
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent asChild>
            <form onSubmit={handleDeleteMyAccount}>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our database.
                  <div className='my-8 flex flex-col gap-2'>
                    <Label htmlFor='confirm'>
                      Type{' '}
                      <span className='text-secondary-foreground font-bold'>
                        delete my account
                      </span>{' '}
                      to continue:
                    </Label>
                    <Input
                      type='text'
                      id='confirm'
                      onChange={(e) => setValue(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </AlertDialogDescription>
              <div className='flex justify-between'>
                <AlertDialogCancel
                  onClick={() => {
                    setOpen(false)
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
                  disabled={value !== 'delete my account'}
                >
                  Delete
                </AlertDialogAction>
              </div>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default Danger
