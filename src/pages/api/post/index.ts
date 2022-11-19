import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content, published } = req.body
  const { type, userId } = req.query

  if (req.method === 'GET' && type === 'all') {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    })

    return res.status(200).json(posts)
  }

  if (req.method === 'GET' && userId) {
    const posts = await prisma.post.findMany({
      where: {
        authorId: String(userId),
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    })

    return res.status(200).json(posts)
  }
  const session = await getSession({ req })

  if (!session) {
    return res.status(403).send('Unauthorized')
  }

  if (req.method === 'GET' && type === 'liked') {
    const posts = await prisma.like.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        Post: {
          select: {
            title: true,
            publishedAt: true,
            author: {
              select: {
                name: true,
                id: true,
                image: true,
              },
            },
            id: true,
          },
        },
      },
    })

    return res.status(200).json(posts)
  }

  if (req.method === 'GET' && (type === 'drafts' || type === 'published')) {
    const isDrafts = type === 'drafts'

    const drafts = await prisma.post.findMany({
      where: {
        published: isDrafts ? false : true,
        author: {
          email: session.user.email,
        },
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })

    return res.status(200).json(drafts)
  }

  if (req.method === 'POST') {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: session?.user?.email } },
        published: published ?? false,
        ...(published && {
          publishedAt: new Date(),
        }),
      },
    })

    return res.status(200).send(post)
  }

  return res.send('Method not allowed.')
}

export default handler
