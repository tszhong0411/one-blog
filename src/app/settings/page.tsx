import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import Form from './form'

const SettingsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  const { name, image } = session.user

  return (
    <div className='flex flex-col max-w-md mx-auto py-24 gap-4'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image || '/static/images/default-user.png'}
        width={120}
        height={120}
        referrerPolicy='no-referrer'
        className='rounded-full'
        alt={`Avatar of ${name}`}
      />

      <Form session={session} />
    </div>
  )
}

export default SettingsPage
