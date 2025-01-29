'use server'

import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@/db'
import { posts } from '@/db/schema'
import { authenticatedActionClient } from '@/lib/safe-action'

import { deletePostSchema } from './schema'

export const deletePostAction = authenticatedActionClient
  .schema(deletePostSchema)
  .action(async ({ parsedInput: { postId }, ctx: { user } }) => {
    await db.delete(posts).where(and(eq(posts.id, postId), eq(posts.authorId, user.id)))

    revalidatePath('/me/posts')
  })
