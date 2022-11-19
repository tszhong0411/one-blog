import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Post } from '@/types'

export const useDrafts = () => {
  const { data, error } = useSWR<Post[]>(`/api/post?type=drafts`, fetcher)

  return {
    drafts: data,
    isLoading: !error && !data,
    isError: error,
  }
}
