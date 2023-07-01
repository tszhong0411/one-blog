import { IconShare } from '@tabler/icons-react'
import { Button } from '@tszhong0411/ui'
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

    toast.success('Copied the link to clipboard')
  }

  return (
    <Button
      // className='flex h-[34px] w-[34px] items-center justify-center gap-2 rounded-md border border-accent-2 p-1 transition-colors duration-150 hover:border-white'
      variant={'outline'}
      onClick={handleShare}
      type='button'
    >
      <IconShare size={20} />
    </Button>
  )
}

export default ShareButton
