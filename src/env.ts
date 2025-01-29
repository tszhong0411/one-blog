import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development')
  },
  server: {
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    AUTH_SECRET: z.string().min(1)
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV
  },
  emptyStringAsUndefined: true
})
