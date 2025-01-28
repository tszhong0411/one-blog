import type { NextAuthOptions } from 'next-auth'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env'

import db from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      session.user.name = user.name
      session.user.image = user.image
      session.user.createdAt = user.createdAt
      session.user.updatedAt = user.updatedAt
      session.user.bio = user.bio

      return session
    }
  }
}
