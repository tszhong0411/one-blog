import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Post } from '@/types'

export const usePosts = () => {
  const { data, error } = useSWR<Post[]>(`/api/post?type=all`, fetcher)

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  }
}
