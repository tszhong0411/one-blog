'use client'

import { IconArrowLeft } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type BackProps = React.ComponentPropsWithoutRef<'button'>

const Back = (props: BackProps) => {
  const router = useRouter()

  return (
    <button
      className='group flex items-center'
      onClick={() => router.back()}
      {...props}
    >
      <IconArrowLeft
        width={20}
        height={20}
        className='mr-2 transition-transform duration-300 group-hover:-translate-x-1'
      />
      Back
    </button>
  )
}

export default Back
