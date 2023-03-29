import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import Form from '@/components/Form'

type EditPageProps = {
  params: {
    [key: string]: string
  }
}

const getPostById = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  })

  return post
}

const EditPage = async (props: EditPageProps) => {
  const { params } = props
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  const post = await getPostById(params.id)

  if (!post) {
    return notFound()
  }

  if (post?.authorId !== session.user.id) {
    return <div>你沒有權限編輯這篇文章</div>
  }

  const { title, content, id } = post

  return (
    <div className='flex flex-col gap-4 items-center max-w-3xl mx-auto my-24'>
      <h1 className='text-3xl font-bold'>編輯文章</h1>

      <Form title={title} content={content} id={id} />
    </div>
  )
}

export default EditPage
