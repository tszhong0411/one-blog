import sharedConfig from '@tszhong0411/tailwind-config'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tszhong0411/ui/dist/**/*.js'
  ],
  presets: [sharedConfig]
} satisfies Config
