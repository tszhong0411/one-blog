'use client'

import { IconShare } from '@tabler/icons-react'
import { toast } from 'react-hot-toast'
import { useCopyToClipboard } from 'react-use'

import { site } from '@/config/site'

type ShareButtonProps = {
  id: string
}

const ShareButton = (props: ShareButtonProps) => {
  const { id } = props
  const [, copyToClipboard] = useCopyToClipboard()

  const handleShare = () => {
    copyToClipboard(`${site.url}/post/${id}`)

    toast.success('已複製連結')
  }

  return (
    <button
      className='flex gap-2 items-center justify-center border border-accent-2 rounded-md p-1 hover:border-white w-[34px] h-[34px] transition-colors duration-150'
      onClick={handleShare}
    >
      <IconShare size={20} />
    </button>
  )
}

export default ShareButton
