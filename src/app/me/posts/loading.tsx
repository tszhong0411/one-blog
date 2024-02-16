import { Skeleton } from '@tszhong0411/ui'

import PageHeader from '@/components/page-header'

const Loading = () => {
  return (
    <>
      <PageHeader title='Your posts' className='mb-8' />
      <div className='space-y-4'>
        <Skeleton className='h-24' />
        <Skeleton className='h-24' />
        <Skeleton className='h-24' />
        <Skeleton className='h-24' />
      </div>
    </>
  )
}

export default Loading
