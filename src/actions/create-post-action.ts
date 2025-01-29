'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/db'
import { posts } from '@/db/schema'
import { authenticatedActionClient } from '@/lib/safe-action'

import { createPostSchema } from './schema'

export const createPostAction = authenticatedActionClient
  .schema(createPostSchema)
  .action(async ({ parsedInput: { title }, ctx: { user } }) => {
    const [post] = await db
      .insert(posts)
      .values({
        title,
        authorId: user.id
      })
      .returning({
        id: posts.id
      })

    revalidatePath('/me/posts')

    return {
      postId: post?.id
    }
  })
