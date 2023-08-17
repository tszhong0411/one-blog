'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { IconUser } from '@tabler/icons-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Label,
} from '@tszhong0411/ui'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { saveSettings } from '@/actions'
import { settingsSchema } from '@/schemas'

type FormProps = {
  user: User
}

export type Values = {
  image: string
  name: string
  bio: string | undefined
}

const Form = (props: FormProps) => {
  const { user } = props
  const { name, image, bio } = user
  const router = useRouter()
  const [saving, setSaving] = React.useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      image: image as string,
      name: name as string,
      bio: bio || undefined,
    },
  })

  const onSubmit = async (values: Values) => {
    setSaving(true)

    try {
      await saveSettings(values)
      toast.success('Settings saved.')
      setSaving(false)

      router.refresh()
    } catch (error) {
      toast.error((error as Error).message)
      setSaving(false)
    }
  }

  return (
    <form
      className='space-y-4 rounded-lg border border-accent-2 bg-accent-1 p-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className='mb-6 text-2xl font-semibold'>Account</h4>
      <Avatar className='h-24 w-24'>
        <AvatarImage
          src={image as string}
          width={96}
          height={96}
          alt={name as string}
        />
        <AvatarFallback>
          <IconUser width={40} height={40} />
        </AvatarFallback>
      </Avatar>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='image'>Image</Label>
        <Input
          type='url'
          id='image'
          placeholder='Image'
          {...register('image')}
        />
        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' id='name' placeholder='Name' {...register('name')} />
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>

      <div className='flex flex-col gap-2'>
        <Label htmlFor='bio'>Bio</Label>
        <Input type='text' id='bio' placeholder='Bio' {...register('bio')} />
        {errors.bio && <p className='text-red-500'>{errors.bio.message}</p>}
      </div>

      <Button
        type='submit'
        loading={saving}
        disabled={saving}
        className='ml-auto'
      >
        Save
      </Button>
    </form>
  )
}

export default Form