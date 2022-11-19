import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  link: {
    width: 36,
    height: 34,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.dark[0],
    '&:hover': {
      backgroundColor: theme.colors.dark[5],
    },

    [theme.fn.largerThan('sm')]: {
      width: 50,
      height: 50,
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}))
