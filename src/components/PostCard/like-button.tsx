'use client'

import { Like } from '@prisma/client'
import { IconHeart } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import React from 'react'

type LikeButtonProps = {
  id: string
}

type Query = ({
  isUserLiked: boolean | undefined
} & Like)[]

const LikeButton = (props: LikeButtonProps) => {
  const { id } = props
  const queryClient = useQueryClient()
  const pathname = usePathname()

  const { data, isFetching } = useQuery<Query>({
    queryKey: ['likes', id],
    queryFn: () =>
      fetch(`/api/likes?id=${id}`, {
        cache: 'no-store',
      }).then((res) => res.json()),
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await fetch(`/api/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })

      queryClient.invalidateQueries({ queryKey: ['likes', id] })

      if (pathname === '/liked') {
        queryClient.invalidateQueries({ queryKey: ['liked'] })
      }
    },
  })

  const isUserLiked = data?.some((like) => like.isUserLiked)

  return (
    <button
      className='flex gap-2 items-center justify-center border border-accent-2 rounded-md p-1 hover:border-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-accent-5'
      onClick={() => mutate()}
      disabled={isLoading || isFetching}
    >
      <IconHeart
        size={20}
        fill={isUserLiked ? 'red' : 'currentColor'}
        color={isUserLiked ? 'red' : 'currentColor'}
      />
      {data?.length}
    </button>
  )
}

export default LikeButton
