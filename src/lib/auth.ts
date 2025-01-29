import type { InferSelectModel } from 'drizzle-orm'
import type { DefaultSession, NextAuthConfig } from 'next-auth'

import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { cache } from 'react'

import { db } from '@/db'
import { accounts, sessions, users, verificationTokens } from '@/db/schema'
import { env } from '@/env'
import { getDefaultImage } from '@/utils/get-default-image'

declare module 'next-auth' {
  interface Session extends Omit<DefaultSession, 'user'> {
    user: InferSelectModel<typeof users>
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- extend interface
  interface User extends InferSelectModel<typeof users> {}
}

const config: NextAuthConfig = {
  secret: env.AUTH_SECRET,
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          bio: user.bio
        }
      }
    }
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth(config)

export const getCurrentUser = cache(async () => {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  const defaultImage = getDefaultImage(session.user.id)

  return {
    ...session.user,
    name: session.user.name,
    image: session.user.image ?? defaultImage
  }
})
