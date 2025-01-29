import { and, desc, eq } from 'drizzle-orm'

import { db } from '@/db'
import { posts, users } from '@/db/schema'

export const getUserById = async (id: string) => {
  const result = await db.query.users.findFirst({
    where: eq(users.id, id),
    columns: {
      name: true,
      image: true,
      bio: true
    },
    with: {
      posts: {
        where: and(eq(posts.published, true), eq(posts.visibility, 'public')),
        columns: {
          id: true,
          title: true,
          description: true,
          published: true,
          visibility: true,
          createdAt: true
        },
        orderBy: desc(posts.createdAt),
        with: {
          likes: {
            columns: {
              id: true
            }
          }
        }
      }
    }
  })

  return {
    user: result
  }
}
