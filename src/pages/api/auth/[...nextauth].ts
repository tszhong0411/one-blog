import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { User } from '@prisma/client'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, user }) {
      session.user = user as User

      return session
    },
  },
}

export default NextAuth(authOptions)
