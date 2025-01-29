import { ImageResponse } from 'next/og'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export const GET = (req: Request) => {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title')

  if (!title) {
    return NextResponse.json(
      {
        error: 'Missing title'
      },
      {
        status: 400
      }
    )
  }

  return new ImageResponse(
    (
      /* eslint-disable @eslint-react/dom/no-unknown-property -- custom attribute */
      <div tw='bg-black flex w-full h-full justify-between flex-col text-white p-24'>
        <div tw='flex flex-col'>
          <div tw='flex items-center'>
            <svg
              width='120'
              height='120'
              viewBox='0 0 120 120'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              aria-label='Book'
            >
              <g clipPath='url(#clip0_54_56)'>
                <path
                  d='M88 0H32C14.3269 0 0 14.3269 0 32V88C0 105.673 14.3269 120 32 120H88C105.673 120 120 105.673 120 88V32C120 14.3269 105.673 0 88 0Z'
                  fill='#F1F1F1'
                />
                <path
                  d='M89.1673 26.667V93.3337H39.1673C36.9572 93.3337 34.8376 92.4557 33.2748 90.8929C31.712 89.3301 30.834 87.2105 30.834 85.0003V35.0003C30.834 32.7902 31.712 30.6706 33.2748 29.1078C34.8376 27.545 36.9572 26.667 39.1673 26.667H89.1673Z'
                  stroke='black'
                  strokeWidth='5.33'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M89.1673 76.667H39.1673C36.9572 76.667 34.8376 77.545 33.2748 79.1078C31.712 80.6706 30.834 82.7902 30.834 85.0003'
                  stroke='black'
                  strokeWidth='5.33'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M47.5 43.333H72.5'
                  stroke='black'
                  strokeWidth='5.33'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
              <defs>
                <clipPath id='clip0_54_56'>
                  <rect width='120' height='120' fill='white' />
                </clipPath>
              </defs>
            </svg>
            <div tw='ml-8 text-6xl font-bold'>One Blog</div>
          </div>
          <div tw='mt-20 text-5xl font-semibold'>{title}</div>
        </div>
        <div tw='flex justify-end text-3xl font-bold'>one-blog.honghong.me</div>
      </div>
    ),
    /* eslint-enable @eslint-react/dom/no-unknown-property -- custom attribute */
    {
      width: 1200,
      height: 630
    }
  )
}
