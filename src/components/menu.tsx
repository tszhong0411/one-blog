'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@tszhong0411/ui'
import { UserIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type User } from 'next-auth'
import { signOut } from 'next-auth/react'

type MenuProps = {
  user: User | null
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
          <AvatarImage src={image!} alt={name!} />
          <AvatarFallback>
            <UserIcon size={24} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='flex-col items-start' asChild>
          <Link href={`/users/${id}`}>
            <div className='text-sm'>{name}</div>
            <div className='text-xs text-muted-foreground'>{email}</div>
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
