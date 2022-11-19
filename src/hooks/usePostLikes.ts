import { Like } from '@prisma/client'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

export const usePostLikes = (id: string) => {
  const { data, error } = useSWR<Like[]>(
    id ? `/api/likes/${id}` : null,
    fetcher
  )

  return {
    likes: data,
    isLoading: !error && !data,
    isError: error,
  }
}
