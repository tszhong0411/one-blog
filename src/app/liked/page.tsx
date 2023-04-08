import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import Content from './content'

const LikedPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className='max-w-2xl mx-auto py-12 flex flex-col gap-4'>
      <Content />
    </div>
  )
}

export default LikedPage
