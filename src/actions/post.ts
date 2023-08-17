'use server'

import { Visibility } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

const handleError = (error: unknown) => {
  console.log(error)

  throw new Error('Something went wrong. Please try again.')
}

export const createNewPost = async (title: string) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not logged in')

  try {
    const post = await db.post.create({
      data: {
        title,
        authorId: user.id,
      },
      select: {
        id: true,
      },
    })

    revalidatePath('/me/posts')

    return post.id
  } catch (error) {
    handleError(error)

    return
  }
}

export const deletePost = async (id: string) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not logged in')

  try {
    await db.post.delete({
      where: {
        id,
        authorId: user.id,
      },
    })

    revalidatePath('/me/posts')
  } catch (error) {
    handleError(error)
  }
}

export const savePost = async (
  id: string,
  title: string,
  content: string | null,
  description: string | null,
  published: boolean,
) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not logged in')

  try {
    await db.post.update({
      where: {
        id,
        authorId: user.id,
      },
      data: {
        title,
        content,
        description,
        published,
        updatedAt: new Date(),
      },
    })

    revalidatePath(`/posts/${id}`)
  } catch (error) {
    handleError(error)
  }
}

export const saveVisibility = async (id: string, visibility: Visibility) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Not logged in')

  try {
    await db.post.update({
      where: {
        id,
        authorId: user.id,
      },
      data: {
        visibility,
      },
    })

    revalidatePath(`/posts/${id}`)
  } catch (error) {
    handleError(error)
  }
}

export const likePost = async (id: string) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Please log in to like this post.')

  try {
    await db.like.create({
      data: {
        postId: id,
        userId: user.id,
      },
    })

    revalidatePath(`/posts/${id}`)
  } catch (error) {
    revalidatePath(`/posts/${id}`)
    handleError(error)
  }
}

export const unlikePost = async (id: string) => {
  const user = await getCurrentUser()

  if (!user) throw new Error('Please log in to unlike this post.')

  try {
    const like = await db.like.findFirst({
      where: {
        postId: id,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })

    if (!like) throw new Error('You have not liked this post.')

    await db.like.delete({
      where: {
        id: like?.id,
      },
    })

    revalidatePath(`/posts/${id}`)
  } catch (error) {
    revalidatePath(`/posts/${id}`)
    handleError(error)
  }
}
