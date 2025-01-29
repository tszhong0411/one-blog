'use client'

import type { Like, User } from '@/db/schema'

import { createId } from '@paralleldrive/cuid2'
import { Button, toast } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { Heart } from 'lucide-react'
import { useOptimisticAction } from 'next-safe-action/hooks'

import { togglePostLikeAction } from '@/actions/toggle-post-like-action'

type LikeButtonProps = {
  likes: Like[]
  user: User | null
  postId: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { likes, user, postId } = props
  const action = useOptimisticAction(togglePostLikeAction, {
    currentState: { likes },
    updateFn: (state) => {
      if (!user) return state
      const existingLike = state.likes.find((like) => like.userId === user.id)

      if (existingLike) {
        return {
          likes: state.likes.filter((like) => like.id !== existingLike.id)
        }
      }

      return {
        likes: [
          ...state.likes,
          {
            id: createId(),
            userId: user.id,
            postId: postId
          }
        ]
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    }
  })

  const isUserLiked = action.optimisticState.likes.some((like) => like.userId === user?.id)

  const handleLike = async () => {
    await action.executeAsync({ postId })
  }

  return (
    <Button
      className={cn('flex items-center gap-2', !user && 'cursor-not-allowed')}
      variant='outline'
      disabled={!user}
      onClick={handleLike}
    >
      <Heart className={cn('size-4', isUserLiked && 'fill-red-500 text-red-500')} />
      {action.optimisticState.likes.length}
    </Button>
  )
}

export default LikeButton
