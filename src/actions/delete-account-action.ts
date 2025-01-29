'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@/db'
import { users } from '@/db/schema'
import { authenticatedActionClient } from '@/lib/safe-action'

export const deleteAccountAction = authenticatedActionClient.action(async ({ ctx: { user } }) => {
  await db.delete(users).where(eq(users.id, user.id))

  revalidatePath(`/users/${user.id}`)
})
