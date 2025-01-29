'use server'

import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@/db'
import { likes } from '@/db/schema'
import { authenticatedActionClient } from '@/lib/safe-action'

import { togglePostLikeSchema } from './schema'

export const togglePostLikeAction = authenticatedActionClient
  .schema(togglePostLikeSchema)
  .action(async ({ parsedInput: { postId }, ctx: { user } }) => {
    const existingLike = await db.query.likes.findFirst({
      columns: {
        id: true
      },
      where: and(eq(likes.postId, postId), eq(likes.userId, user.id))
    })

    await (existingLike
      ? db.delete(likes).where(and(eq(likes.id, existingLike.id), eq(likes.userId, user.id)))
      : db.insert(likes).values({
          postId,
          userId: user.id
        }))

    revalidatePath(`/posts/${postId}`)
  })
