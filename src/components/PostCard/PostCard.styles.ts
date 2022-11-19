import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[7],
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colors.dark[5]}`,
  },
}))
