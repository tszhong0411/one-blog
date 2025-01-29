import { createId } from '@paralleldrive/cuid2'
import { type InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'

import { users } from './auth'
import { posts } from './post'

export const likes = pgTable('like', {
  id: text('id').notNull().primaryKey().$defaultFn(createId),
  postId: text('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
})

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id]
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id]
  })
}))

export type Like = InferSelectModel<typeof likes>
