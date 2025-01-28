import { type User as DatabaseUser } from '@prisma/client'
import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DatabaseUser & DefaultSession['user']
  }

  type User = DatabaseUser
}
