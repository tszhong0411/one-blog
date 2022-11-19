import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Post } from '@/types'

export const usePostById = (id: string, auth = false) => {
  const { data, error } = useSWR<Post>(
    id ? `/api/post/${id}${auth ? '?type=auth' : ''}` : null,
    fetcher
  )

  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  }
}
