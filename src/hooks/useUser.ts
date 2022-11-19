import { User } from '@prisma/client'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

export const useUser = (id: string) => {
  const { data, error } = useSWR<
    Omit<User, 'email' | 'emailVerified' | 'createdAt' | 'updatedAt'>
  >(id ? `/api/user/${id}` : null, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}
