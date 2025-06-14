import { env } from '@/env'

export const SITE_URL =
  env.NODE_ENV === 'production' ? 'https://one-blog.nelsonlai.me' : 'http://localhost:3000'

export const SITE_NAME = 'One Blog'
export const SITE_TITLE = 'One Blog'
export const SITE_DESCRIPTION =
  'Welcome to our blog! Here, you can publish your own articles, interact with other users, and like your favorite posts. Additionally, you can easily edit your profile, including your avatar and bio, to showcase more information about yourself. Join our community today and share your thoughts and experiences!'
