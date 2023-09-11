import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

import Form from './form'

type EditorPageProps = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Editor'
}

const EditorPage = async (props: EditorPageProps) => {
  const { params } = props
  const { id } = params

  const user = await getCurrentUser()

  if (!user) {
    redirect(`/login?redirect=/editor/${id}`)
  }

  const post = await db.post.findUnique({
    where: {
      id,
      authorId: user.id
    }
  })

  if (!post) {
    notFound()
  }

  return <Form post={post} />
}

export default EditorPage
