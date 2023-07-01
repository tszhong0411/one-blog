import { Button, Input, Label } from '@tszhong0411/ui'
import { User } from 'firebase/auth'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { auth, firestore } from '@/lib/firebase/app'

import Spinner from '@/components/spinner'

type FormProps = {
  user: User
}

type Inputs = {
  photoURL: string
  displayName: string
  bio: string
}

const Form = (props: FormProps) => {
  const { user } = props

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<Inputs>()

  React.useEffect(() => {
    const userDocRef = doc(firestore, 'users', user.uid)

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setValue('displayName', doc.data().displayName)
        setValue('photoURL', doc.data().photoURL)
        setValue('bio', doc.data().bio)
      }
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const userDocRef = doc(firestore, 'users', user.uid)

    try {
      await setDoc(userDocRef, {
        ...values,
      })

      toast.success('Successfully updated')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4 flex flex-col gap-1.5'>
        <Label htmlFor='photoURL'>Avatar URL</Label>
        <Input
          {...register('photoURL', {
            required: true,
          })}
          id='photoURL'
          type='text'
          placeholder='https://example.com/avatar.png'
        />
        {errors.photoURL?.type === 'required' && (
          <p className='my-1 text-sm font-bold italic text-red-500'>
            Avatar URL cannot be empty
          </p>
        )}
      </div>

      <div className='mb-4 flex flex-col gap-1.5'>
        <Label htmlFor='displayName'>Display name</Label>
        <Input
          {...register('displayName', {
            required: true,
          })}
          id='displayName'
          type='text'
          placeholder='John Doe'
        />
        {errors.displayName?.type === 'required' && (
          <p className='my-1 text-sm font-bold italic text-red-500'>
            Display name cannot be empty
          </p>
        )}
      </div>

      <div className='mb-4 flex flex-col gap-1.5'>
        <Label htmlFor='bio'>Bio</Label>
        <Input {...register('bio')} id='bio' type='text' />
      </div>

      <Button type='submit' variant='outline'>
        Update
      </Button>
    </form>
  )
}

const SettingsPage = () => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  if (loading) {
    return <Spinner className='h-content' />
  }

  if (!user) {
    router.push('/')

    return
  }

  const { displayName, photoURL } = user

  return (
    <>
      <NextSeo title='Settings' />
      <div className='mx-auto flex max-w-md flex-col gap-4 py-24'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoURL || '/static/images/default-user.png'}
          width={120}
          height={120}
          referrerPolicy='no-referrer'
          className='rounded-full'
          alt={`Avatar of ${displayName}`}
        />

        <Form user={user} />
      </div>
    </>
  )
}

export default SettingsPage
