import { Separator } from '@tszhong0411/ui'
import { FileIcon } from 'lucide-react'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import PostCard from '@/components/post-card'
import UserAvatar from '@/components/user-avatar'
import { SITE_URL } from '@/lib/constants'
import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

type UserPageProps = {
  params: {
    id: string
  }
}

export const generateMetadata = async (
  props: UserPageProps
): Promise<Metadata> => {
  const { params } = props
  const id = params.id
  const user = await db.user.findUnique({
    where: {
      id
    }
  })

  if (!user) {
    return {}
  }

  return {
    title: user.name || user.id,
    description: user.bio,
    openGraph: {
      title: user.name || user.id,
      description: user.bio || undefined,
      type: 'profile',
      url: `${SITE_URL}/users/${user.id}`
    }
  }
}

const UserPage = async (props: UserPageProps) => {
  const { params } = props
  const { id } = params
  const currentUser = await getCurrentUser()
  const user = await db.user.findUnique({
    where: {
      id
    },
    select: {
      name: true,
      image: true,
      bio: true,
      Post: {
        where: {
          published: true,
          visibility: 'PUBLIC'
        },
        select: {
          id: true,
          title: true,
          description: true,
          published: true,
          visibility: true,
          createdAt: true,
          likes: {
            select: {
              id: true
            }
          },
          author: {
            select: {
              name: true,
              image: true,
              id: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!user) {
    notFound()
  }

  const { name, image, bio, Post } = user

  return (
    <>
      <div className='flex items-center gap-4'>
        <div className='relative size-14 md:size-20'>
          <UserAvatar fill={true} src={image} alt={name} userId={id} />
        </div>
        <div className='text-xl font-semibold lg:text-3xl'>{name}</div>
      </div>
      {bio && <p className='mt-4 text-muted-foreground'>{bio}</p>}
      <Separator className='my-4' />
      {Post.length > 0 ? (
        <div className='mt-4'>
          {Post.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              showAuthor={false}
              user={currentUser}
            />
          ))}
        </div>
      ) : (
        <div className='my-24 flex flex-col items-center justify-center gap-3'>
          <div className='bg-muted flex size-24 items-center justify-center rounded-full'>
            <FileIcon size={56} />
          </div>
          <div className='text-2xl font-semibold'>No posts yet</div>
        </div>
      )}
    </>
  )
}

export default UserPage
