import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { postId } = req.query
  const { id } = req.body

  if (req.method === 'GET') {
    const likes = await prisma.like.findMany({
      where: {
        postId: String(postId),
      },
    })

    return res.status(200).json(likes)
  }

  const session = await getSession({ req })

  if (!session) {
    return res.status(403).send('Unauthorized')
  }

  if (req.method === 'POST') {
    const like = await prisma.like.findFirst({
      where: {
        postId: String(postId),
        userId: session?.user.id,
      },
    })

    if (!like) {
      await prisma.like.upsert({
        where: {
          id: id || 0,
        },
        create: {
          postId: String(postId),
          userId: session?.user.id,
        },
        update: {},
      })

      return res.status(201).end()
    }

    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      })
      return res.status(204).end()
    }
  }

  return res.send('Method not allowed.')
}

export default handler
