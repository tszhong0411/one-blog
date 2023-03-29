/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'hong-fg': 'var(--hong-fg)',
        'hong-bg': 'var(--hong-bg)',
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
        'accent-4': 'var(--accent-4)',
        'accent-5': 'var(--accent-5)',
        'accent-6': 'var(--accent-6)',
        'accent-7': 'var(--accent-7)',
        'accent-8': 'var(--accent-8)',
      },
      fontFamily: {
        default: ['var(--font-inter)', 'var(--font-noto-sans-tc)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
