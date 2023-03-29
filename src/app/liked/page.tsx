'use client'

import { Post } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import PostCard, { Loader } from '@/components/PostCard'

type Query = ({
  author: {
    name: string
    image: string
  }
} & Post)[]

const LikedPage = () => {
  const { data, isLoading } = useQuery<Query>({
    queryKey: ['liked'],
    queryFn: () =>
      fetch('/api/posts/liked', {
        cache: 'no-store',
      }).then((res) => res.json()),
  })

  return (
    <div className='max-w-2xl mx-auto py-12 flex flex-col gap-4'>
      {!data || isLoading ? (
        <Loader />
      ) : (
        <>
          {data?.length > 0 ? (
            <>
              {data?.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </>
          ) : (
            <div className='text-center text-xl font-bold min-h-[calc(100vh-224px)] flex justify-center items-center'>
              <p>沒有已讚好的文章</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default LikedPage
