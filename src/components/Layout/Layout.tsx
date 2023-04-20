import { Analytics } from '@vercel/analytics/react'
import { Inter, Noto_Sans_TC } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import Footer from './Footer'
import Header from './Header'
import AuthModal from '../AuthModal'

type LayoutProps = {
  children: React.ReactNode
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <div
      style={{
        fontFamily: `${inter.style.fontFamily}, ${notoSansTC.style.fontFamily}`,
      }}
    >
      <Header />
      <main className='px-3.5 pt-[60px]'>{children}</main>
      <Toaster
        position='bottom-right'
        toastOptions={{
          className: '!bg-accent-1 !text-hong-fg !border !border-accent-2',
        }}
      />
      <Footer />
      <Analytics />
      <AuthModal />
    </div>
  )
}
export default Layout
