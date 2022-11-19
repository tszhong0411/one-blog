import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Post } from '@/types'

export const usePostsByUser = (id: string) => {
  const { data, error } = useSWR<Post[]>(
    id ? `/api/post?userId=${id}` : null,
    fetcher
  )

  return {
    posts: data,
    isLoading: !error && !data,
    isError: error,
  }
}
