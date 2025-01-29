import { desc, eq } from 'drizzle-orm'

import { db } from '@/db'
import { posts } from '@/db/schema'

export const getPostsByUserId = async (userId: string) => {
  const result = await db.query.posts.findMany({
    where: eq(posts.authorId, userId),
    columns: {
      id: true,
      title: true,
      description: true,
      published: true,
      createdAt: true
    },
    orderBy: desc(posts.createdAt),
    with: {
      likes: {
        columns: {
          id: true
        }
      },
      user: {
        columns: {
          name: true,
          image: true,
          id: true
        }
      }
    }
  })

  return {
    posts: result
  }
}
