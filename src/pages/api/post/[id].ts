import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, type } = req.query
  const { title, content } = req.body

  const post = await prisma.post.findUnique({
    where: {
      id: String(id),
    },
    include: {
      author: {
        select: {
          email: true,
        },
      },
    },
  })

  if (!post) {
    return res.status(404).send('Post not found')
  }

  if (req.method === 'GET' && id && !type) {
    const post = await prisma.post.findUnique({
      where: {
        id: String(id),
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
    })

    if (!post.published) return res.status(403).send('Unauthorized')

    return res.status(200).json(post)
  }

  const session = await getSession({ req })

  if (!session || session.user.email !== post.author.email) {
    return res.status(403).send('Unauthorized')
  }

  if (req.method === 'GET' && type === 'auth') {
    return res.status(200).json(post)
  }

  if (req.method === 'DELETE') {
    await prisma.like.deleteMany({
      where: {
        postId: String(id),
      },
    })

    await prisma.post.delete({
      where: { id: String(id) },
    })

    return res.status(204).end()
  }

  if (req.method === 'PUT') {
    await prisma.post.update({
      where: { id: String(id) },
      data: {
        title: String(title),
        content: String(content),
      },
    })

    return res.status(204).end()
  }

  return res.send('Method not allowed.')
}

export default handler
