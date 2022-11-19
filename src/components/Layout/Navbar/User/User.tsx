import { Anchor, Avatar } from '@mantine/core'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const User = () => {
  const { data: session, status } = useSession()

  return (
    <Anchor component={Link} href='/' underline={false}>
      <Avatar
        src={
          status === 'authenticated'
            ? session.user.image
            : '/static/images/logo.png'
        }
        alt='One Blog'
        radius='xl'
        imageProps={{
          referrerPolicy: 'no-referrer',
        }}
      />
    </Anchor>
  )
}

export default User
