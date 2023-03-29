import React from 'react'

import Skeleton from '../Skeleton'

export const Loader = () => {
  return (
    <>
      {Array.from(Array(10).keys()).map((i) => (
        <Skeleton
          key={i}
          className='p-4 border border-accent-2 rounded-t w-full block hover:border-white transition-colors duration-150 h-32'
        />
      ))}
    </>
  )
}
