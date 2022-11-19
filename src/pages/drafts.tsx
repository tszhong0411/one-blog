import {
  Anchor,
  Avatar,
  Card,
  Container,
  Flex,
  Tabs,
  Text,
} from '@mantine/core'
import { IconPencil } from '@tabler/icons'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { formatDate } from '@/lib/formatDate'
import { useDrafts } from '@/hooks/useDrafts'
import { usePublished } from '@/hooks/usePublished'

import ErrorText from '@/components/ErrorText'
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'

const DraftsPage = () => {
  const {
    drafts,
    isLoading: isDraftsLoading,
    isError: isDraftsError,
  } = useDrafts()
  const {
    published,
    isLoading: isPublishedLoading,
    isError: isPublishedError,
  } = usePublished()

  const { status } = useSession()

  if (
    status === 'loading' ||
    isPublishedLoading ||
    isDraftsLoading ||
    isDraftsError ||
    isPublishedError
  ) {
    return <Loader />
  }

  if (status === 'unauthenticated') {
    return <ErrorText />
  }

  return (
    <Layout
      seo={{
        title: 'Drafts',
      }}
    >
      <Container size={1000} px='xl'>
        <Tabs variant='outline' defaultValue='drafts'>
          <Tabs.List>
            <Tabs.Tab value='drafts' icon={<IconPencil size={14} />}>
              Drafts {drafts.length}
            </Tabs.Tab>
            <Tabs.Tab value='published' icon={<IconPencil size={14} />}>
              Published {published.length}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value='drafts'>
            {drafts.length !== 0 && (
              <Flex
                direction='column'
                gap={40}
                w='100%'
                px='xl'
                maw={1000}
                mx='auto'
                py={20}
              >
                {drafts.map((draft) => {
                  const { title, createdAt, id, author } = draft

                  return (
                    <Card
                      component={Link}
                      href={`/edit/${id}`}
                      key={draft.id}
                      withBorder
                      p='lg'
                      radius='md'
                    >
                      <Flex gap={8} align='center' mb={8}>
                        <Avatar
                          src={author.image}
                          alt={author.name}
                          radius='xl'
                          imageProps={{
                            referrerPolicy: 'no-referrer',
                          }}
                        />
                        <Text>{author.name}</Text>
                      </Flex>
                      <Text size={24} weight={700}>
                        {title}
                      </Text>
                      <Text size='sm' color='dimmed'>
                        Created at: {formatDate(createdAt)}
                      </Text>
                    </Card>
                  )
                })}
              </Flex>
            )}
            {drafts.length === 0 && (
              <Flex py={120} justify='center' align='center' direction='column'>
                <Text weight={700} align='center' size={24}>
                  You have no drafts.
                </Text>
                <Text align='center'>
                  <Anchor component={Link} href='/edit'>
                    Create
                  </Anchor>{' '}
                  a post now.
                </Text>
              </Flex>
            )}
          </Tabs.Panel>

          <Tabs.Panel value='published'>
            {published.length !== 0 && (
              <Flex
                direction='column'
                gap={40}
                w='100%'
                px='xl'
                maw={1000}
                mx='auto'
                py={20}
              >
                {published.map((published) => {
                  const { title, publishedAt, id, author } = published

                  return (
                    <Card
                      component={Link}
                      href={`/post/${id}`}
                      key={published.id}
                      withBorder
                      p='lg'
                      radius='md'
                    >
                      <Flex gap={8} align='center' mb={8}>
                        <Avatar
                          src={author.image}
                          alt={author.name}
                          radius='xl'
                          imageProps={{
                            referrerPolicy: 'no-referrer',
                          }}
                        />
                        <Text>{author.name}</Text>
                      </Flex>
                      <Text size={24} weight={700}>
                        {title}
                      </Text>
                      <Text size='sm' color='dimmed'>
                        Published at: {formatDate(publishedAt)}
                      </Text>
                    </Card>
                  )
                })}
              </Flex>
            )}
            {published.length === 0 && (
              <Flex py={120} justify='center' align='center' direction='column'>
                <Text weight={700} align='center' size={24}>
                  You have no published posts.
                </Text>
                <Text align='center'>
                  <Anchor component={Link} href='/edit'>
                    Create
                  </Anchor>{' '}
                  a post now.
                </Text>
              </Flex>
            )}
          </Tabs.Panel>
        </Tabs>
      </Container>
    </Layout>
  )
}

export default DraftsPage
