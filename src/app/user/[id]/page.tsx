import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import PostCard from '@/components/PostCard'

type UserPageProps = {
  params: {
    [key: string]: string
  }
}

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          likes: true,
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  })

  return user
}

const UserPage = async (props: UserPageProps) => {
  const {
    params: { id },
  } = props

  const session = await getServerSession(authOptions)

  const user = await getUserById(id)

  if (!user) {
    notFound()
  }

  const { name, image, bio, posts } = user

  return (
    <div className='flex flex-col max-w-xl mx-auto py-24 gap-4 items-center'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image || '/static/images/default-user.png'}
        width={150}
        height={150}
        className='rounded-full'
        referrerPolicy='no-referrer'
        alt={`Avatar of ${name}`}
      />

      <div className='text-lg font-extrabold sm:text-2xl'>{name}</div>

      {bio && <div className='sm:text-xl text-accent-6'>{bio}</div>}

      {id === session?.user?.id && (
        <Link
          href='/settings'
          className='px-4 py-2 font-bold rounded-md border border-accent-5 hover:border-white transition-colors duration-150'
        >
          編輯個人資料
        </Link>
      )}

      {posts.length > 0 && <h2 className='text-3xl font-bold mt-8'>文章</h2>}

      <div className='space-y-4 mt-4 w-full flex flex-col gap-4 px-2'>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}

export default UserPage
