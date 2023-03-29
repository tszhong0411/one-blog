import { IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

import { isProduction } from '@/lib/constants'

type Site = {
  url: string
  title: string
  name: string
  titleTemplate: string
  description: string
  favicons: IconDescriptor[]
}

export const site: Site = {
  url: isProduction ? 'https://one-blog.honghong.me' : 'http://localhost:3000',
  title: 'One Blog',
  name: '小康',
  titleTemplate: '- One Blog',
  description:
    '歡迎來到我們的部落格！在此，您可以發佈自己的文章，與其他用戶互動並點讚喜愛的文章。此外，您還可以輕鬆編輯您的個人資料，包括頭像和簡介，以展示更多關於自己的資訊。快來加入我們的社群，並分享您的想法和經驗！',
  favicons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/static/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/static/favicon/favicon-32x32.png',
    },
  ],
}
