import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en-US' className='dark'>
      <Head />
      <body className='overflow-x-hidden bg-accent-bg text-accent-fg'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
