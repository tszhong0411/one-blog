import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  navbar: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    display: 'flex',
    backgroundColor: theme.colors.dark[7],
    height: 60,
    alignItems: 'center',
    width: '100%',
    zIndex: 100,
    padding: `${theme.spacing.md}px ${theme.spacing.sm}px`,

    [theme.fn.largerThan('sm')]: {
      height: '100vh',
      width: 80,
      flexDirection: 'column',
      borderRight: `1px solid ${theme.colors.dark[5]}`,
    },

    [theme.fn.smallerThan('sm')]: {
      borderBottom: `1px solid ${theme.colors.dark[5]}`,
    },
  },

  logo: {
    [theme.fn.smallerThan('sm')]: {
      flex: 1,
      justifyContent: 'start',
    },
    [theme.fn.largerThan('sm')]: {
      marginBottom: 50,
    },
  },

  menu: {
    flex: 1,
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
  },
}))
