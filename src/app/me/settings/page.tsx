import type { Metadata } from 'next'

import { redirect } from 'next/navigation'

import PageHeader from '@/components/page-header'
import { getCurrentUser } from '@/lib/auth'

import Danger from './danger'
import SettingsForm from './settings-form'

const title = 'Settings'
const description = 'Manage your account settings'

export const metadata: Metadata = {
  title,
  description
}

const SettingsPage = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login?redirect=/me/settings')
  }

  return (
    <>
      <PageHeader title={title} description={description} />
      <div className='my-8 space-y-12'>
        <SettingsForm user={user} />
        <Danger />
      </div>
    </>
  )
}

export default SettingsPage
