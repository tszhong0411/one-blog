'use client'

import { Like } from '@prisma/client'
import { IconHeart } from '@tabler/icons-react'
import { Button } from '@tszhong0411/ui'
import { cx } from '@tszhong0411/utils'
import { User } from 'next-auth'
import { toast } from 'react-hot-toast'

import { likePost, unlikePost } from '@/actions'

type LikeButtonProps = {
  likes: Pick<Like, 'id' | 'userId'>[]
  user: User | undefined
  postId: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { likes, user, postId } = props

  const isUserLiked = likes.some((like) => like.userId === user?.id)

  const handleLike = async () => {
    try {
      !isUserLiked && (await likePost(postId))
      isUserLiked && (await unlikePost(postId))
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
        width={20}
        height={20}
        className={cx(isUserLiked && 'fill-red-500 text-red-500')}
      />
      {likes.length}
    </Button>
  )
}

export default LikeButton
