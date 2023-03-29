import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const GET = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 403,
      }
    )
  }

  const posts = await prisma.like.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      Post: {
        select: {
          createdAt: true,
          title: true,
          id: true,
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

  const simplifiedPosts = posts.map((post) => post.Post)

  return NextResponse.json(simplifiedPosts)
}
