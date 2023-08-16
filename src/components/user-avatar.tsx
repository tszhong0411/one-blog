import { cx } from '@tszhong0411/utils'
import Image, { ImageProps } from 'next/image'

type UserAvatarProps = {
  userId: string
  src: string | null
  alt: string | null
} & Omit<ImageProps, 'src' | 'alt'>

const UserAvatar = (props: UserAvatarProps) => {
  const { userId, src, alt, className, ...rest } = props

  return (
    <Image
      src={src ?? `https://robohash.org/${userId}`}
      alt={alt ?? `${userId}'s avatar`}
      className={cx('rounded-full', className)}
      quality={100}
      {...rest}
    />
  )
}

export default UserAvatar
