import { z } from 'zod'

export const ProfileSchema = z.object({
  image: z.string().url(),
  name: z.string().min(3).max(20),
  bio: z.string().max(150),
})
