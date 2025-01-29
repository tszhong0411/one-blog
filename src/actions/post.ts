'use server'

import type { Visibility } from '@/db/schema'

import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db, likes, posts } from '@/db'
import { getCurrentUser } from '@/lib/auth'

const handleError = () => {
  throw new Error('Something went wrong. Please try again.')
}

const NOT_LOGGED_IN_ERROR = 'Not logged in'

export const createNewPost = async (title: string) => {
  const user = await getCurrentUser()

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR)

  try {
    const post = await db
      .insert(posts)
      .values({
        title,
        authorId: user.id
      })
      .returning({
        id: posts.id
      })

    revalidatePath('/me/posts')

    return post[0]?.id
  } catch {
    handleError()

    return
  }
}

export const deletePost = async (id: string) => {
  const user = await getCurrentUser()

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR)

  try {
    await db.delete(posts).where(and(eq(posts.id, id), eq(posts.authorId, user.id)))

    revalidatePath('/me/posts')
  } catch {
    handleError()
  }
}

export const savePost = async (
  id: string,
  title: string,
  content: string | null,
  description: string | null,
  published: boolean
) => {
  const user = await getCurrentUser()

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR)

  try {
    await db
      .update(posts)
      .set({
        title,
        content,
        description,
        published,
        updatedAt: new Date()
      })
      .where(and(eq(posts.id, id), eq(posts.authorId, user.id)))

    revalidatePath(`/posts/${id}`)
  } catch {
    handleError()
  }
}

export const saveVisibility = async (id: string, visibility: Visibility) => {
  const user = await getCurrentUser()

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR)

  try {
    await db
      .update(posts)
      .set({ visibility })
      .where(and(eq(posts.id, id), eq(posts.authorId, user.id)))

    revalidatePath(`/posts/${id}`)
  } catch {
    handleError()
  }
}

export const likePost = async (id: string) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Please log in to like this post.')

  try {
    await db.insert(likes).values({
      postId: id,
      userId: user.id
    })

    revalidatePath(`/posts/${id}`)
  } catch {
    revalidatePath(`/posts/${id}`)
    handleError()
  }
}

export const unlikePost = async (id: string) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Please log in to unlike this post.')

  try {
    const like = await db.query.likes.findFirst({
      columns: {
        id: true
      },
      where: and(eq(likes.postId, id), eq(likes.userId, user.id))
    })

    if (!like) throw new Error('You have not liked this post.')

    await db.delete(likes).where(eq(likes.id, like.id))

    revalidatePath(`/posts/${id}`)
  } catch {
    revalidatePath(`/posts/${id}`)
    handleError()
  }
}
