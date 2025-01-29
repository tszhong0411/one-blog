import { z } from 'zod'

import { Visibility } from '@/db/schema'

export const createPostSchema = z.object({
  title: z.string().min(1).max(100)
})

export const deletePostSchema = z.object({
  postId: z.string()
})

export const togglePostLikeSchema = z.object({
  postId: z.string()
})

export const updatePostSchema = z.object({
  postId: z.string(),
  title: z.string().min(1).max(100).optional(),
  content: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  published: z.boolean().optional(),
  visibility: z.nativeEnum(Visibility).optional()
})

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100),
  image: z.string(),
  bio: z.string()
})
