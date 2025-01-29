'use server'

import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { flattenValidationErrors } from 'next-safe-action'

import { db } from '@/db'
import { users } from '@/db/schema'
import { authenticatedActionClient } from '@/lib/safe-action'

import { updateUserSchema } from './schema'

export const updateUserAction = authenticatedActionClient
  .schema(updateUserSchema, {
    // eslint-disable-next-line @typescript-eslint/require-await -- required for the shape
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput: { ...data }, ctx: { user } }) => {
    await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(and(eq(users.id, user.id)))

    revalidatePath(`/users/${user.id}`)
  })
