import { Inter, Noto_Sans_TC } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import AuthModal from './auth-modal'
import Footer from './footer'
import Header from './header'

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
          className: '!bg-accent-1 !text-accent-fg !border !border-accent-2',
        }}
      />
      <Footer />
      <AuthModal />
    </div>
  )
}
export default Layout
