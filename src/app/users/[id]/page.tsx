import { Separator } from '@tszhong0411/ui'
import { FileIcon } from 'lucide-react'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import PostCard from '@/components/post-card'
import UserAvatar from '@/components/user-avatar'
import { getCurrentUser } from '@/lib/auth'
import { SITE_URL } from '@/lib/constants'
import { getUserById } from '@/queries/get-user-by-id'

type UserPageProps = {
  params: Promise<{
    id: string
  }>
}

export const generateMetadata = async (props: UserPageProps): Promise<Metadata> => {
  const { id } = await props.params

  const { user } = await getUserById(id)

  if (!user) {
    return {}
  }

  return {
    title: user.name,
    description: user.bio,
    openGraph: {
      title: user.name,
      description: user.bio ?? undefined,
      type: 'profile',
      url: `${SITE_URL}/users/${id}`
    }
  }
}

const UserPage = async (props: UserPageProps) => {
  const { id } = await props.params
  const currentUser = await getCurrentUser()
  const { user } = await getUserById(id)

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
      {user.bio && <p className='text-muted-foreground mt-4'>{user.bio}</p>}
      <Separator className='my-4' />
      {user.posts.length > 0 ? (
        <div className='mt-4'>
          {user.posts.map((post) => (
            <PostCard
              key={post.id}
              post={{ ...post, user: { ...user, id } }}
              showAuthor={false}
              user={currentUser}
            />
          ))}
        </div>
      ) : (
        <div className='my-24 flex flex-col items-center justify-center gap-3'>
          <div className='bg-muted flex size-24 items-center justify-center rounded-full'>
            <FileIcon className='size-14' />
          </div>
          <div className='text-2xl font-semibold'>No posts yet</div>
        </div>
      )}
    </>
  )
}

export default UserPage
