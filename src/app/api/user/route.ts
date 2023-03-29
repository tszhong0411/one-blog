import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const POST = async (req: Request) => {
  const { imageUrl, displayName, bio } = await req.json()
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      {
        error: 'You must be signed in to perform this action',
      },
      {
        status: 403,
      }
    )
  }

  if (!imageUrl || !displayName) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      image: imageUrl,
      name: displayName,
      bio,
    },
  })

  return NextResponse.json({ error: null })
}
