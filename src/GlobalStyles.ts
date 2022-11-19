import { CSSObject, MantineThemeBase } from '@mantine/core'

const GlobalStyles: (theme: MantineThemeBase) => CSSObject = () => ({
  html: {
    scrollBehavior: 'smooth',
  },

  'img, video': {
    maxWidth: '100%',
    height: 'auto',
  },

  '::selection': {
    background: 'rgb(249, 6, 6, 0.05)',
    color: '#f90606',
  },

  '::-webkit-scrollbar': {
    width: 7,
    height: 5,
  },

  '::-webkit-scrollbar-thumb': {
    background: '#ef4444',
    transition: '0.25s',
    borderRadius: 2,
  },

  '::-webkit-scrollbar-track': {
    background: '0 0',
  },

  'input:-webkit-autofill, input:-webkit-autofill:focus': {
    transition: 'backgroundColor 600000s 0s, color 600000s 0s',
  },
})

export default GlobalStyles
