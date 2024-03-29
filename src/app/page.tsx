import * as React from 'react'

import PostPlaceholder from '@/components/post-placeholder'

import Posts from './posts'

const HomePage = () => {
  return (
    <React.Suspense
      fallback={[...Array.from({ length: 5 }).keys()].map((i) => (
        <PostPlaceholder key={i} />
      ))}
    >
      <Posts />
    </React.Suspense>
  )
}

export default HomePage
