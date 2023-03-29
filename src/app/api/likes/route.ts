import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const POST = async (req: Request) => {
  const { id } = await req.json()

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

  try {
    const like = await prisma.like.findFirst({
      where: {
        postId: id,
        userId: session.user.id,
      },
    })

    if (!like) {
      await prisma.like.upsert({
        where: {
          id,
        },
        create: {
          postId: id,
          userId: session.user.id,
        },
        update: {},
      })

      return new NextResponse(null, { status: 201 })
    }

    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      })

      return new NextResponse(null, { status: 204 })
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create like',
      },
      {
        status: 500,
      }
    )
  }
}

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id')
  const session = await getServerSession(authOptions)

  if (!id) {
    return NextResponse.json(
      {
        error: 'Missing id',
      },
      {
        status: 400,
      }
    )
  }

  const likes = await prisma.like.findMany({
    where: {
      postId: id,
    },
  })

  if (session) {
    const addIsUserLiked = likes.map((like) => {
      return {
        ...like,
        isUserLiked: like.userId === session.user.id,
      }
    })

    return NextResponse.json(addIsUserLiked)
  }

  return NextResponse.json(likes)
}
