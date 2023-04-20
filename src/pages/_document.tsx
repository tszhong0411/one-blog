import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en-US'>
      <Head />
      <body className='overflow-x-hidden bg-hong-bg text-hong-fg'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
