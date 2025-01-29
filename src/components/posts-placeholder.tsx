import { Skeleton } from '@tszhong0411/ui'
import { MoreVerticalIcon } from 'lucide-react'

const PostsPlaceholder = () => (
  <div className='flex items-start justify-between border-b px-1 py-4'>
    <div className='flex w-full flex-col gap-2'>
      <div className='flex items-center gap-1'>
        <Skeleton className='h-6 w-40' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-7 w-full max-w-[280px]' />
        <Skeleton className='h-12 w-full max-w-[320px]' />
      </div>
      <Skeleton className='mt-4 h-5 w-11' />
    </div>
    <MoreVerticalIcon />
  </div>
)

export default PostsPlaceholder
