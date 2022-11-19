import Script from 'next/script'

const Analytics = () => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <Script
        async
        defer
        data-website-id='63558dfe-d5c2-4eb5-8b1a-ec7bf5b82a56'
        src='https://umami.honghong.me/umami.js'
      />
    )
  }

  return null
}

export default Analytics
