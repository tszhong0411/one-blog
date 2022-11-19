import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
    })

    if (!user) {
      return res.status(404).send('User not found')
    }

    return res.status(200).json({
      name: user.name,
      image: user.image,
      bio: user.bio,
    })
  }

  return res.send('Method not allowed.')
}

export default handler
