'use client'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { site } from '@/config/site'

type FormProps = {
  session: Session
}

type Inputs = {
  imageUrl: string
  displayName: string
  bio: string
}

const Form = (props: FormProps) => {
  const { session } = props
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      imageUrl:
        session.user.image || `${site.url}/static/images/default-user.png`,
      displayName: session.user.name || '',
      bio: session.user.bio || '',
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const { imageUrl, displayName, bio } = values

    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl,
        displayName,
        bio,
      }),
    })

    if (!res.ok) {
      toast.error('更新失敗')

      return
    }

    toast.success('更新成功')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label className='text-sm font-bold mb-2' htmlFor='imageUrl'>
          頭像 URL
        </label>
        <input
          {...register('imageUrl', {
            required: true,
          })}
          className='appearance-none border border-accent-2 rounded w-full py-2 px-3 focus:outline-none bg-hong-bg'
          id='imageUrl'
          type='text'
          placeholder='https://example.com/avatar.png'
        />
        {errors.imageUrl?.type === 'required' && (
          <p className='text-red-500 text-sm font-bold my-1 italic'>
            頭像 URL 不能為空
          </p>
        )}
      </div>

      <hr className='my-2 border-accent-2' />

      <div className='mb-4'>
        <label className='text-sm font-bold mb-2' htmlFor='displayName'>
          暱稱
        </label>
        <input
          {...register('displayName', {
            required: true,
          })}
          className='appearance-none border border-accent-2 rounded w-full py-2 px-3 focus:outline-none bg-hong-bg'
          id='displayName'
          type='text'
          placeholder='John Doe'
        />
        {errors.displayName?.type === 'required' && (
          <p className='text-red-500 text-sm font-bold my-1 italic'>
            暱稱不能為空
          </p>
        )}
      </div>

      <div className='mb-4'>
        <label className='text-sm font-bold mb-2' htmlFor='bio'>
          Bio
        </label>
        <input
          {...register('bio')}
          className='appearance-none border border-accent-2 rounded w-full py-2 px-3 focus:outline-none bg-hong-bg'
          id='bio'
          type='text'
        />
      </div>

      <button
        type='submit'
        className='px-4 py-2 font-bold rounded-md border border-accent-5 hover:border-white transition-colors duration-150'
      >
        更新
      </button>
    </form>
  )
}

export default Form
