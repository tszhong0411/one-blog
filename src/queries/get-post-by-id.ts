import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { posts } from '@/db/schema'

export const getPostById = async (id: string) => {
  const result = await db.query.posts.findFirst({
    where: and(eq(posts.id, id), eq(posts.published, true)),
    columns: {
      id: true,
      title: true,
      description: true,
      content: true,
      createdAt: true
    },
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          image: true
        }
      },
      likes: {
        columns: {
          id: true,
          userId: true,
          postId: true
        }
      }
    }
  })

  return {
    post: result
  }
}
