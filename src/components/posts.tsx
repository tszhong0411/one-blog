import PostCard from '@/components/post-card'
import { getCurrentUser } from '@/lib/auth'
import { getPosts } from '@/queries/get-posts'

const Posts = async () => {
  const user = await getCurrentUser()
  const { posts } = await getPosts()

  if (posts.length === 0) {
    return <div className='text-center'>No posts yet.</div>
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  )
}

export default Posts
