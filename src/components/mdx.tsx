'use client'

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote'

type MDXProps = {
  source: MDXRemoteProps
}

const MDX = (props: MDXProps) => {
  const { source } = props

  return (
    <article className='prose max-w-none px-2 py-6 dark:prose-invert'>
      <MDXRemote {...source} />
    </article>
  )
}

export default MDX
