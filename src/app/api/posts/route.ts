import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const POST = async (req: Request) => {
  const { title, content } = await req.json()

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
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            email: session.user.email as string,
          },
        },
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create post',
      },
      {
        status: 500,
      }
    )
  }
}

export const DELETE = async (req: Request) => {
  const { id } = await req.json()

  const session = await getServerSession(authOptions)

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  })

  if (!post) {
    return NextResponse.json(
      {
        error: 'Post not found',
      },
      {
        status: 404,
      }
    )
  }

  if (!session || post.authorId !== session.user.id) {
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
    await prisma.post.delete({
      where: {
        id,
      },
    })

    return new NextResponse(null, {
      status: 204,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to delete post',
      },
      {
        status: 500,
      }
    )
  }
}

export const PUT = async (req: Request) => {
  const { id, title, content } = await req.json()

  const session = await getServerSession(authOptions)

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  })

  if (!post) {
    return NextResponse.json(
      {
        error: 'Post not found',
      },
      {
        status: 404,
      }
    )
  }

  if (!session || post.authorId !== session.user.id) {
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
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    })

    return new NextResponse(null, {
      status: 204,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to update post',
      },
      {
        status: 500,
      }
    )
  }
}
