import { serialize } from 'next-mdx-remote/serialize'

export const getMdxSource = async (content: string | null) => {
  return await serialize(content ?? '')
}
