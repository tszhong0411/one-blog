'use client'

import { IconUser } from '@tabler/icons-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tszhong0411/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'

type MenuProps = {
  user: User | undefined
}

const Menu = (props: MenuProps) => {
  const { user } = props
  const pathname = usePathname()

  if (!user) {
    return (
      <Link href={`/login?redirect=${pathname}`} className={buttonVariants()}>
        Log in
      </Link>
    )
  }

  const { name, image, email, id } = user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image as string} alt={name as string} />
          <AvatarFallback>
            <IconUser width={24} height={24} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='flex-col items-start' asChild>
          <Link href={`/users/${id}`}>
            <div className='text-sm'>{name}</div>
            <div className='text-xs text-accent-5'>{email}</div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/me/posts'>Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/me/settings'>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
