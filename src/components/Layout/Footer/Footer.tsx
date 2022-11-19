import { ActionIcon, Flex, Footer as MantineFooter, Text } from '@mantine/core'
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCopyright,
} from '@tabler/icons'
import Link from 'next/link'

type Link = {
  url: string
  icon: React.ReactNode
}

const Footer = () => {
  const links: Link[] = [
    {
      url: 'https://twitter.com/TszhongLai0411',
      icon: <IconBrandTwitter size={18} stroke={1.5} />,
    },
    {
      url: 'https://www.youtube.com/@tszhong0411',
      icon: <IconBrandYoutube size={18} stroke={1.5} />,
    },
    {
      url: 'https://www.instagram.com/tszhong0411/',
      icon: <IconBrandInstagram size={18} stroke={1.5} />,
    },
  ]

  return (
    <MantineFooter
      height={60}
      ml={{
        sm: 80,
      }}
    >
      <Flex
        w='100%'
        h='100%'
        justify='space-between'
        align='center'
        px='xl'
        maw={1000}
        mx='auto'
      >
        <Text>
          <IconCopyright size={14} /> {new Date().getFullYear()} 小康
        </Text>
        <Flex justify='end' wrap='nowrap'>
          {links.map(({ url, icon }) => (
            <ActionIcon
              key={url}
              component={Link}
              target='_blank'
              rel='noreferrer noopener'
              href={url}
              size='lg'
            >
              {icon}
            </ActionIcon>
          ))}
        </Flex>
      </Flex>
    </MantineFooter>
  )
}

export default Footer
