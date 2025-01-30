'use client'

import type { User } from '@/db/schema'
import type { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast
} from '@tszhong0411/ui'
import { Loader2Icon, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'

import { updateUserSchema } from '@/actions/schema'
import { updateUserAction } from '@/actions/update-user-action'

type SettingsFormProps = {
  user: User
}

const SettingsForm = (props: SettingsFormProps) => {
  const { user } = props
  const { name, image, bio } = user
  const router = useRouter()
  const action = useAction(updateUserAction, {
    onSuccess: () => {
      toast.success('Settings saved')
      router.refresh()
    },
    onError: ({ error }) => {
      toast.error(
        error.serverError ??
          error.validationErrors?.name?.[0] ??
          error.validationErrors?.image?.[0] ??
          error.validationErrors?.bio?.[0]
      )
    }
  })

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: name,
      image: image ?? '',
      bio: bio ?? ''
    }
  })

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    await action.executeAsync(values)
  }

  return (
    <Form {...form}>
      <form className='space-y-4 rounded-lg border p-4' onSubmit={form.handleSubmit(onSubmit)}>
        <h4 className='mb-6 text-xl font-semibold'>Account</h4>
        <Avatar className='size-24'>
          <AvatarImage src={image!} width={96} height={96} alt={name} />
          <AvatarFallback>
            <UserIcon className='size-10' />
          </AvatarFallback>
        </Avatar>

        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type='url' id='image' placeholder='Image' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type='text' id='name' placeholder='Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input type='text' id='bio' placeholder='Bio' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={action.isExecuting} className='ml-auto'>
          {action.isExecuting && <Loader2Icon className='mr-2 size-4 animate-spin' />}
          Save
        </Button>
      </form>
    </Form>
  )
}

export default SettingsForm
