import { tailwindPreset } from '@tszhong0411/ui'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@tszhong0411/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      height: {
        content: 'calc(100vh - 228px)',
      },
    },
  },
  presets: [tailwindPreset],
  plugins: [require('@tailwindcss/typography')],
}
