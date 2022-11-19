import { Tooltip, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { useStyles } from './NavbarLink.styles'

export type NavbarLinkProps = {
  icon: React.ReactNode
  label: string
  url?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NavbarLink = (props: NavbarLinkProps) => {
  const { icon, label, url, onClick } = props
  const { classes, cx } = useStyles()
  const { pathname } = useRouter()

  return (
    <Tooltip label={label} position='right' transitionDuration={0}>
      <UnstyledButton
        component={url ? Link : 'button'}
        className={cx(classes.link, { [classes.active]: pathname === url })}
        href={url ?? null}
        onClick={onClick}
      >
        {icon}
      </UnstyledButton>
    </Tooltip>
  )
}

export default NavbarLink
