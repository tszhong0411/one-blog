import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Post } from '@/types'

export const usePublished = () => {
  const { data, error } = useSWR<Post[]>(`/api/post?type=published`, fetcher)

  return {
    published: data,
    isLoading: !error && !data,
    isError: error,
  }
}
