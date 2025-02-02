import { SiGithub, SiInstagram, SiX } from '@icons-pack/react-simple-icons'

type Links = Array<{
  href: string
  icon: React.ReactNode
}>

const Footer = () => {
  const links: Links = [
    {
      href: 'https://twitter.com/tszhong0411',
      icon: <SiX className='size-4' />
    },
    {
      href: 'https://github.com/@tszhong0411',
      icon: <SiGithub className='size-4' />
    },
    {
      href: 'https://www.instagram.com/tszhong0411/',
      icon: <SiInstagram className='size-4' />
    }
  ]

  return (
    <footer className='mx-auto max-w-4xl px-6'>
      <div className='h-footer flex items-center justify-between'>
        <p className='text-sm'>© {new Date().getFullYear()} Hong</p>

        <div className='flex items-center gap-4'>
          {links.map((link) => (
            <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer'>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
