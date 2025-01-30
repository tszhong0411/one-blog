import { and, desc, eq } from 'drizzle-orm'

import { db } from '@/db'
import { posts } from '@/db/schema'

export const getPosts = async () => {
  const result = await db.query.posts.findMany({
    where: and(eq(posts.published, true), eq(posts.visibility, 'public')),
    columns: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      published: true
    },
    with: {
      user: {
        columns: {
          name: true,
          image: true,
          id: true
        }
      },
      likes: {
        columns: {
          id: true
        }
      }
    },
    orderBy: desc(posts.createdAt)
  })

  return {
    posts: result
  }
}
