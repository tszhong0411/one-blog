import { serialize } from 'next-mdx-remote/serialize'

export const getMdxSource = async (content: string | null) => {
  const mdxSource = await serialize(content || '')

  return mdxSource
}
