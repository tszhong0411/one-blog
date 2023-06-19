import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react'

type Links = {
  href: string
  icon: JSX.Element
}[]

const Footer = () => {
  const links: Links = [
    {
      href: 'https://twitter.com/TszhongLai0411',
      icon: <IconBrandTwitter size={22} stroke={2} />,
    },
    {
      href: 'https://www.youtube.com/@tszhong0411',
      icon: <IconBrandYoutube size={22} stroke={2} />,
    },
    {
      href: 'https://www.instagram.com/tszhong0411/',
      icon: <IconBrandInstagram size={22} stroke={2} />,
    },
  ]

  return (
    <footer className='mx-auto max-w-4xl py-4 px-6'>
      <div className='flex items-center justify-between'>
        <p className='mb-4 text-sm'>© {new Date().getFullYear()} Hong</p>

        <div className='flex items-center gap-4'>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
