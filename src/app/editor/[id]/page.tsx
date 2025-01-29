import type { Metadata } from 'next'

import { and, eq } from 'drizzle-orm'
import { notFound, redirect } from 'next/navigation'

import { db } from '@/db'
import { posts } from '@/db/schema'
import { getCurrentUser } from '@/lib/auth'

import Form from './form'

type EditorPageProps = {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: 'Editor'
}

const EditorPage = async (props: EditorPageProps) => {
  const { id } = await props.params

  const user = await getCurrentUser()

  if (!user) {
    redirect(`/login?redirect=/editor/${id}`)
  }

  const post = await db.query.posts.findFirst({
    where: and(eq(posts.id, id), eq(posts.authorId, user.id))
  })

  if (!post) {
    notFound()
  }

  return <Form post={post} />
}

export default EditorPage
