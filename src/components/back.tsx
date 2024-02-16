'use client'

import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

type BackProps = React.ComponentPropsWithoutRef<'button'>

const Back = (props: BackProps) => {
  const router = useRouter()

  return (
    <button
      className='group flex items-center'
      onClick={() => router.back()}
      type='button'
      {...props}
    >
      <ArrowLeftIcon
        size={20}
        className='mr-2 transition-transform duration-300 group-hover:-translate-x-1'
      />
      Back
    </button>
  )
}

export default Back
