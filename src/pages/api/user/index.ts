import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'
import { ProfileSchema } from '@/lib/schema'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(403).send('Unauthorized')
  }

  if (req.method === 'POST') {
    try {
      const { image, name, bio } = ProfileSchema.parse(req.body)

      const user = await prisma.user.update({
        where: {
          id: session?.user.id,
        },
        data: {
          image,
          name,
          bio,
        },
      })

      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  return res.send('Method not allowed.')
}

export default handler
