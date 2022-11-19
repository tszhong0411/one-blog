import { Like } from '@prisma/client'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Post } from '@/types'

type LikedPost = {
  Post: Post
} & Like

export const useLikedPosts = () => {
  const { data, error } = useSWR<LikedPost[]>(`/api/post?type=liked`, fetcher)

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  }
}
