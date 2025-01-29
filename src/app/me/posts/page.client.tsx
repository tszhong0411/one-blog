'use client'

import type { User } from '@/db/schema'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tszhong0411/ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import PostCard, { type PostCardProps } from '@/components/post-card'

type ContentProps = {
  posts: Array<PostCardProps['post']>
  user: User
}

const PostsClient = (props: ContentProps) => {
  const { posts, user } = props

  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get('tab') ?? 'drafts'
  const [activeTab, setActiveTab] = useState(tab)

  const drafts = posts.filter((post) => !post.published)
  const published = posts.filter((post) => post.published)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/me/posts?tab=${value}`)
  }

  return (
    <Tabs defaultValue='drafts' value={activeTab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value='drafts'>
          Drafts {drafts.length > 0 && <>({drafts.length})</>}
        </TabsTrigger>
        <TabsTrigger value='published'>
          Published {published.length > 0 && <>({published.length})</>}
        </TabsTrigger>
      </TabsList>
      <TabsContent value='drafts'>
        {drafts.length === 0 && (
          <div className='py-8 text-center'>You don&apos;t have any drafts yet.</div>
        )}
        {drafts.map((post) => (
          <PostCard key={post.id} post={post} user={user} showAuthor={false} />
        ))}
      </TabsContent>
      <TabsContent value='published'>
        {published.length === 0 && (
          <div className='py-8 text-center'>You haven&apos;t published any posts yet.</div>
        )}
        {published.map((post) => (
          <PostCard key={post.id} post={post} user={user} showAuthor={false} />
        ))}
      </TabsContent>
    </Tabs>
  )
}

export default PostsClient
