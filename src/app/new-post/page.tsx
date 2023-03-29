import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import Form from '@/components/Form'

const NewPostPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className='flex flex-col gap-4 items-center max-w-3xl mx-auto my-24'>
      <h1 className='text-3xl font-bold'>新文章</h1>

      <Form />
    </div>
  )
}

export default NewPostPage
