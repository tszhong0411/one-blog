import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id
  const { title, content } = req.body

  const session = await getSession({ req })

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

  if (!session || session.user.email !== post.author.email) {
    return res.status(403).send('Unauthorized')
  }

  if (req.method === 'PUT') {
    await prisma.post.update({
      where: { id: String(id) },
      data: {
        title,
        content,
        published: true,
        ...(!post.published && {
          publishedAt: new Date(),
        }),
      },
    })

    return res.status(204).end()
  }

  return res.send('Method not allowed.')
}

export default handler
