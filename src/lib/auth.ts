import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email as string },
      })

      session.user.id = user?.id as string
      session.user.name = user?.name as string
      session.user.image = user?.image as string
      session.user.bio = user?.bio as string

      return session
    },
  },

  pages: {
    signIn: '/auth/signin',
  },

  session: {
    strategy: 'jwt',
  },
}
