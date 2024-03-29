'use server'

import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

import { type Values } from '../app/me/settings/form'

export const saveSettings = async (values: Values) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not logged in')

  try {
    await db.user.update({
      where: {
        id: user.id
      },
      data: {
        ...values
      }
    })
  } catch {
    throw new Error('Something went wrong. Please try again.')
  }
}

export const deleteAccount = async () => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not logged in')

  try {
    await db.user.delete({
      where: {
        id: user.id
      }
    })
  } catch {
    throw new Error('Something went wrong. Please try again.')
  }
}
