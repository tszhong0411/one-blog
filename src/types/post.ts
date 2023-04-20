export type Post = {
  id: string
  authorId: string
  title: string
  content: string
  createdAt: number
  likes: Record<string, boolean>
}
