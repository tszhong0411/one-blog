import { Center, Flex, Menu } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import {
  IconArticle,
  IconHeart,
  IconHome,
  IconLogin,
  IconLogout,
  IconMenu2,
  IconSettings,
  IconSquarePlus,
  IconUser,
  IconX,
} from '@tabler/icons'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

import { useStyles } from './Navbar.styles'
import NavbarLink from './NavbarLink'
import { NavbarLinkProps } from './NavbarLink'
import User from './User'

const Navbar = () => {
  const { status } = useSession()
  const { classes, theme } = useStyles()
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`)
  const { data: session } = useSession()

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (status === 'unauthenticated') {
      e.preventDefault()

      showNotification({
        title: 'Error',
        message: 'Please login first.',
        icon: <IconX />,
      })
    }
  }

  const links: NavbarLinkProps[] = [
    {
      label: 'Home',
      url: '/',
      icon: <IconHome stroke={1.5} />,
    },
    {
      label: 'New post',
      url: '/edit',
      icon: <IconSquarePlus stroke={1.5} />,
      onClick: loginHandler,
    },
    {
      label: 'Drafts',
      url: '/drafts',
      icon: <IconArticle stroke={1.5} />,
      onClick: loginHandler,
    },
  ]

  return (
    <div className={classes.navbar}>
      <Center className={classes.logo}>
        <User />
      </Center>

      <Flex
        direction={{
          base: 'row',
          sm: 'column',
        }}
        justify='center'
        gap={8}
      >
        {links.map((link, i) => (
          <NavbarLink key={i} {...link} />
        ))}
      </Flex>

      <div className={classes.menu}>
        <Menu width={200} position={matches ? 'top-start' : 'bottom-end'}>
          <Menu.Target>
            <div>
              <NavbarLink label='Menu' icon={<IconMenu2 stroke={1.5} />} />
            </div>
          </Menu.Target>

          <Menu.Dropdown>
            {status === 'authenticated' && (
              <>
                <Menu.Item
                  component={Link}
                  href={`/user/${session?.user.id}`}
                  icon={<IconUser size={14} />}
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  component={Link}
                  href='/liked'
                  icon={<IconHeart size={14} />}
                >
                  Liked posts
                </Menu.Item>
                <Menu.Item
                  component={Link}
                  href='/settings'
                  icon={<IconSettings size={14} />}
                >
                  Settings
                </Menu.Item>
                <Menu.Item
                  icon={<IconLogout size={14} />}
                  onClick={() => signOut()}
                >
                  Logout
                </Menu.Item>
              </>
            )}
            {status === 'unauthenticated' && (
              <Menu.Item
                component={Link}
                href={`/login?callbackUrl=${window?.location.pathname}`}
                icon={<IconLogin size={14} />}
              >
                Login
              </Menu.Item>
            )}
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  )
}

export default Navbar
