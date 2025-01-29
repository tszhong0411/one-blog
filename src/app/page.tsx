import { Suspense } from 'react'

import PostPlaceholder from '@/components/post-placeholder'

import Posts from './posts'

const HomePage = () => {
  return (
    <Suspense
      fallback={[...Array.from({ length: 5 }).keys()].map((i) => (
        <PostPlaceholder key={i} />
      ))}
    >
      <Posts />
    </Suspense>
  )
}

export default HomePage
