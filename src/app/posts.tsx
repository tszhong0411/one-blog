import { and, desc, eq } from 'drizzle-orm'

import PostCard from '@/components/post-card'
import { db, posts } from '@/db'
import { getCurrentUser } from '@/lib/auth'

const Posts = async () => {
  const user = await getCurrentUser()
  const _posts = await db.query.posts.findMany({
    columns: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      published: true
    },
    where: and(eq(posts.published, true), eq(posts.visibility, 'public')),
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

  if (_posts.length === 0) {
    return <div className='text-center'>No posts yet.</div>
  }

  return (
    <div>
      {_posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  )
}

export default Posts
