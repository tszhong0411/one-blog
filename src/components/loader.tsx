import { Skeleton } from '@tszhong0411/ui'

export const Loader = () => {
  return (
    <>
      {Array.from(Array(10).keys()).map((i) => (
        <Skeleton
          key={i}
          className='block h-32 w-full rounded-t border border-accent-2 p-4 transition-colors duration-150 hover:border-white'
        />
      ))}
    </>
  )
}
