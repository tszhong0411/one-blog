'use client'

import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'

type MDXProps = {
  source: MDXRemoteProps
}

const MDX = (props: MDXProps) => {
  const { source } = props

  return (
    <article className='prose prose-invert max-w-none px-2 py-6'>
      <MDXRemote {...source} />
    </article>
  )
}

export default MDX
