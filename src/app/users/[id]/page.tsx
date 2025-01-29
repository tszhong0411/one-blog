import { Separator } from '@tszhong0411/ui'
import { and, desc, eq } from 'drizzle-orm'
import { FileIcon } from 'lucide-react'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import PostCard from '@/components/post-card'
import UserAvatar from '@/components/user-avatar'
import { db, posts, users } from '@/db'
import { getCurrentUser } from '@/lib/auth'
import { SITE_URL } from '@/lib/constants'

type UserPageProps = {
  params: Promise<{
    id: string
  }>
}

export const generateMetadata = async (props: UserPageProps): Promise<Metadata> => {
  const { id } = await props.params

  const user = await db.query.users.findFirst({
    where: eq(users.id, id)
  })

  if (!user) {
    return {}
  }

  return {
    title: user.name ?? user.id,
    description: user.bio,
    openGraph: {
      title: user.name ?? user.id,
      description: user.bio ?? undefined,
      type: 'profile',
      url: `${SITE_URL}/users/${user.id}`
    }
  }
}

const UserPage = async (props: UserPageProps) => {
  const { id } = await props.params
  const currentUser = await getCurrentUser()
  const user = await db.query.users.findFirst({
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
          },
          user: {
            columns: {
              name: true,
              image: true,
              id: true
            }
          }
        }
      }
    }
  })

  if (!user) {
    notFound()
  }

  return (
    <>
      <div className='flex items-center gap-4'>
        <div className='relative size-14 md:size-20'>
          <UserAvatar fill src={user.image} alt={user.name} userId={id} />
        </div>
        <div className='text-xl font-semibold lg:text-3xl'>{user.name}</div>
      </div>
      {user.bio && <p className='mt-4 text-muted-foreground'>{user.bio}</p>}
      <Separator className='my-4' />
      {user.posts.length > 0 ? (
        <div className='mt-4'>
          {user.posts.map((post) => (
            <PostCard key={post.id} post={post} showAuthor={false} user={currentUser} />
          ))}
        </div>
      ) : (
        <div className='my-24 flex flex-col items-center justify-center gap-3'>
          <div className='flex size-24 items-center justify-center rounded-full bg-muted'>
            <FileIcon size={56} />
          </div>
          <div className='text-2xl font-semibold'>No posts yet</div>
        </div>
      )}
    </>
  )
}

export default UserPage
