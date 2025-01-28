import type { Config } from 'tailwindcss'

import sharedConfig from '@tszhong0411/tailwind-config'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@tszhong0411/ui/dist/**/*.js'],
  presets: [sharedConfig]
} satisfies Config
