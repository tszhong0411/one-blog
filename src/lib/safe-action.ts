import { createSafeActionClient } from 'next-safe-action'

import { getCurrentUser } from './auth'

class ActionError extends Error {}

const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message
    }

    return 'Something went wrong. Please try again.'
  }
})

export const authenticatedActionClient = actionClient.use(async ({ next }) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    throw new ActionError('Not logged in')
  }

  return next({ ctx: { user: currentUser } })
})
