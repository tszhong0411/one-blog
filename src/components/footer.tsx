import { InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'
import * as React from 'react'

type Links = Array<{
  href: string
  icon: React.ReactNode
}>

const Footer = () => {
  const links: Links = [
    {
      href: 'https://twitter.com/tszhong0411',
      icon: <TwitterIcon size={20} />
    },
    {
      href: 'https://www.youtube.com/@tszhong0411',
      icon: <YoutubeIcon size={20} />
    },
    {
      href: 'https://www.instagram.com/tszhong0411/',
      icon: <InstagramIcon size={20} />
    }
  ]

  return (
    <footer className='mx-auto max-w-4xl px-6 py-4'>
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
