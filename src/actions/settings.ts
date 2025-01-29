'use server'

import { eq } from 'drizzle-orm'

import { db, users } from '@/db'
import { getCurrentUser } from '@/lib/auth'

import { type Values } from '../app/me/settings/form'

export const saveSettings = async (values: Values) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not logged in')

  try {
    await db.update(users).set(values).where(eq(users.id, user.id))
  } catch {
    throw new Error('Something went wrong. Please try again.')
  }
}

export const deleteAccount = async () => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not logged in')

  try {
    await db.delete(users).where(eq(users.id, user.id))
  } catch {
    throw new Error('Something went wrong. Please try again.')
  }
}
