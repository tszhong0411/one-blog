import { IconHeart } from '@tabler/icons-react'
import { Button } from '@tszhong0411/ui'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-hot-toast'

import { auth, firestore } from '@/lib/firebase/app'

import { Post } from '@/types'

type LikeButtonProps = {
  id: string
  authorId: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { id, authorId } = props
  const [post, setPost] = React.useState<Post>()
  const [liked, setLiked] = React.useState<boolean>()
  const [user] = useAuthState(auth)

  React.useEffect(() => {
    const likesDocRef = doc(firestore, 'users', authorId, 'posts', id)
    const unsubscribe = onSnapshot(likesDocRef, (doc) => {
      if (doc.exists()) {
        setPost(doc.data() as Post)

        if (user) {
          setLiked(!!doc.data().likes[user.uid])
        }
      }
    })

    return () => unsubscribe()
  }, [authorId, id, user])

  const handleLike = async () => {
    if (user && typeof liked !== 'undefined') {
      try {
        const postDocRef = doc(firestore, 'users', authorId, 'posts', id)
        const docSnap = await getDoc(postDocRef)

        await updateDoc(postDocRef, {
          likes: {
            ...(docSnap.data() as Post).likes,
            [user.uid]: !liked,
          },
        })
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong. Please try again later.')
      }
    }
  }

  const getLikesCount = (): number => {
    if (post?.likes) {
      return Object.values(post.likes).reduce(
        (count, liked) => count + (liked ? 1 : 0),
        0
      )
    } else {
      return 0
    }
  }

  return (
    <Button
      className='gap-2 p-1'
      variant='outline'
      onClick={() => handleLike()}
      disabled={typeof liked === 'undefined' || !user}
      type='button'
    >
      <IconHeart
        size={20}
        fill={liked ? 'red' : 'currentColor'}
        color={liked ? 'red' : 'currentColor'}
      />
      {getLikesCount()}
    </Button>
  )
}

export default LikeButton
