import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { posts } from '@/db/schema'

export const getPostMetadataById = async (id: string) => {
  const result = await db.query.posts.findFirst({
    where: eq(posts.id, id),
    columns: {
      title: true,
      description: true,
      authorId: true,
      updatedAt: true,
      createdAt: true
    }
  })

  return {
    post: result
  }
}
