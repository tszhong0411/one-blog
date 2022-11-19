import { Post as PrismaPost, User } from '@prisma/client'

export type Post = { author: User } & PrismaPost
