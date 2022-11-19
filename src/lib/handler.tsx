import { Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { User } from '@prisma/client'
import { IconCircleCheck, IconX } from '@tabler/icons'

import { Post } from '@/types'

type ErrorProps = {
  message: string
}

type PublishProps = {
  body: {
    title: string
    content: string
    id: string
  }
  callback?: () => void
}

type UpdateProps = {
  body: {
    id: string
  } & Partial<Omit<Post, 'id'>>
  callback?: () => void
}

type CreateProps = {
  body: {
    title: string
    content: string
    published: boolean
  }
  callback?: (data: Promise<Post>) => void
}

type DeleteProps = {
  id: string
  callback?: () => void
}

type LikeProps = {
  postId: string
  callback?: () => void
}

type updateProfileProps = {
  body: Partial<User>
  callback?: (user: User) => void
}

const errorHandler = (props: ErrorProps) => {
  const { message } = props

  return showNotification({
    message: message ?? 'Unknown error',
    icon: <IconX />,
  })
}

export const publishHandler = async (props: PublishProps) => {
  const { body, callback } = props

  try {
    const handler = await fetch(`/api/publish/${body.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (handler.ok) {
      showNotification({
        title: 'Success',
        message: 'Published',
        icon: <IconCircleCheck />,
        color: 'green',
      })

      typeof callback === 'function' && callback()
    } else {
      errorHandler({
        message: handler.statusText,
      })
    }
  } catch (error) {
    errorHandler({
      message: String(error),
    })
  }
}

export const updateHandler = async (props: UpdateProps) => {
  const { body, callback } = props

  try {
    const handler = await fetch(`/api/post/${body.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (handler.ok) {
      showNotification({
        title: 'Success',
        message: 'Updated',
        icon: <IconCircleCheck />,
        color: 'green',
      })

      typeof callback === 'function' && callback()
    } else {
      errorHandler({
        message: handler.statusText,
      })
    }
  } catch (error) {
    errorHandler({
      message: 'Title / content should not be empty',
    })
  }
}

export const createHandler = async (props: CreateProps) => {
  const { body, callback } = props

  try {
    const handler = await fetch(`/api/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (handler.ok) {
      showNotification({
        title: 'Success',
        message: 'Created',
        icon: <IconCircleCheck />,
        color: 'green',
      })

      typeof callback === 'function' && callback(await handler.json())
    } else {
      errorHandler({
        message: handler.statusText,
      })
    }
  } catch (error) {
    errorHandler({
      message: String(error),
    })
  }
}

export const deleteHandler = (props: DeleteProps) => {
  const { id, callback } = props

  openConfirmModal({
    title: 'DELETE YOUR POST',
    centered: true,
    overlayBlur: 3,
    children: <Text size='sm'>Are you sure you want to delete this post?</Text>,
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onConfirm: async () => {
      try {
        const handler = await fetch(`/api/post/${id}`, {
          method: 'DELETE',
        })

        if (handler.ok) {
          showNotification({
            title: 'Success',
            message: 'Deleted',
            icon: <IconCircleCheck />,
            color: 'green',
          })

          typeof callback === 'function' && callback()
        } else {
          errorHandler({
            message: handler.statusText,
          })
        }
      } catch (error) {
        errorHandler({
          message: String(error),
        })
      }
    },
  })
}

export const likeHandler = async (props: LikeProps) => {
  const { postId, callback } = props

  try {
    await fetch(`/api/likes/${postId}`, {
      method: 'POST',
    })

    typeof callback === 'function' && callback()
  } catch (error) {
    errorHandler({
      message: String(error),
    })
  }
}

export const updateProfileHandler = async (props: updateProfileProps) => {
  const { body, callback } = props

  try {
    const handler = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (handler.ok) {
      showNotification({
        title: 'Success',
        message: 'Updated',
        icon: <IconCircleCheck />,
        color: 'green',
      })

      typeof callback === 'function' && callback(await handler.json())
    } else {
      errorHandler({
        message: handler.statusText,
      })
    }
  } catch (error) {
    errorHandler({
      message: String(error),
    })
  }
}
