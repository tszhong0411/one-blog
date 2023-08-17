'use client'

import { createId } from '@paralleldrive/cuid2'
import { Like } from '@prisma/client'
import { IconHeart } from '@tabler/icons-react'
import { Button } from '@tszhong0411/ui'
import { cx } from '@tszhong0411/utils'
import { User } from 'next-auth'
import React from 'react'
import { toast } from 'react-hot-toast'

import { likePost, unlikePost } from '@/actions'

type LikeButtonProps = {
  likes: Like[]
  user: User | undefined
  postId: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { likes, user, postId } = props
  const [optimisticLikes, updateOptimisticLike] =
    React.experimental_useOptimistic<Like[], 'CREATE' | 'DELETE'>(
      likes,
      (state, action) => {
        if (action === 'DELETE') {
          return state.filter(
            (like) => like.userId !== user?.id && like.postId !== postId,
          )
        }

        return [
          ...state,
          {
            id: createId(),
            userId: user ? user.id : createId(),
            postId,
          },
        ]
      },
    )

  const isUserLiked = optimisticLikes.some((like) => like.userId === user?.id)

  const handleLike = async () => {
    try {
      if (!isUserLiked) {
        updateOptimisticLike('CREATE')
        await likePost(postId)
      } else if (isUserLiked) {
        updateOptimisticLike('DELETE')
        await unlikePost(postId)
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <Button
      variant='ghost'
      className={cx('flex items-center gap-2', !user && 'cursor-not-allowed')}
      disabled={!user}
      onClick={handleLike}
    >
      <IconHeart
        size={20}
        className={cx(isUserLiked && 'fill-red-500 text-red-500')}
      />
      {optimisticLikes.length}
    </Button>
  )
}

export default LikeButton
