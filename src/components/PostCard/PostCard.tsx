import { ActionIcon, Anchor, Avatar, Card, Flex, Text } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconShare } from '@tabler/icons'
import Link from 'next/link'

import { formatDate } from '@/lib/formatDate'

import { useStyles } from './PostCard.styles'
import LikeButton from '../LikeButton'

import { Post } from '@/types'

type PostCardProps = {
  post: Post
}

const PostCard = (props: PostCardProps) => {
  const { post } = props
  const { title, author, publishedAt, id } = post
  const { classes, theme } = useStyles()
  const clipboard = useClipboard()

  const shareHandler = () => {
    clipboard.copy(`https://one-blog.honghong.me/post/${id}`)

    showNotification({
      title: 'Copied',
      message: 'You can now share it with anyone.',
      icon: <IconCheck />,
      color: 'green',
    })
  }

  return (
    <Card withBorder p='lg' radius='md' className={classes.card}>
      <Anchor
        component={Link}
        href={`/post/${id}`}
        underline={false}
        variant='text'
      >
        <Text weight={700} mt='xs'>
          {title}
        </Text>
      </Anchor>
      <Anchor component={Link} variant='text' href={`/user/${author.id}`}>
        <Flex gap={16} mt='lg' align='center'>
          <Avatar
            src={author.image}
            radius='xl'
            alt={author.name}
            imageProps={{
              referrerPolicy: 'no-referrer',
            }}
          />
          <div>
            <Text weight={500}>{author.name}</Text>
            <Text size='xs' color='dimmed'>
              {formatDate(publishedAt)}
            </Text>
          </div>
        </Flex>
      </Anchor>
      <Card.Section className={classes.footer}>
        <Flex justify='end' align='center'>
          <LikeButton id={id} />
          <ActionIcon onClick={shareHandler}>
            <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </Card.Section>
    </Card>
  )
}

export default PostCard
