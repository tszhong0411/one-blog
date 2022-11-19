import { ActionIcon, Skeleton, Text, useMantineTheme } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconHeart, IconX } from '@tabler/icons'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useSWRConfig } from 'swr'

import { likeHandler } from '@/lib/handler'
import { usePostLikes } from '@/hooks/usePostLikes'

type LikeButtonProps = {
  id: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { id } = props
  const {
    likes,
    isLoading: isLikesLoading,
    isError: isLikesError,
  } = usePostLikes(id)
  const { data: session, status } = useSession()
  const [disabled, setDisabled] = React.useState(false)
  const { mutate } = useSWRConfig()

  const { colors } = useMantineTheme()

  if (isLikesLoading || isLikesError) {
    return (
      <ActionIcon>
        <Skeleton width={18} height={18} />
      </ActionIcon>
    )
  }

  const isUserLiked = likes.some((like) => like.userId === session?.user.id)

  const action = () => {
    if (status === 'unauthenticated') {
      showNotification({
        title: 'Error',
        message: 'Please login first.',
        icon: <IconX />,
      })
    }

    setDisabled(true)

    likeHandler({
      postId: id,
      callback: async () => {
        await mutate(`/api/likes/${id}`)
        setDisabled(false)
      },
    })
  }

  return (
    <ActionIcon w={50} onClick={action} disabled={disabled}>
      <IconHeart
        size={18}
        color={colors.red[6]}
        fill={isUserLiked ? 'red' : null}
        stroke={1.5}
      />
      <Text ml={2} size='xs'>
        {likes.length}
      </Text>
    </ActionIcon>
  )
}

export default LikeButton
