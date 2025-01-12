import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years'
  }
})

export const formatPostDate = (date: string | Date) => {
  const sevenDaysAgo = dayjs().subtract(7, 'day')
  const isMoreThan7DaysAgo = dayjs(date).isBefore(sevenDaysAgo)
  const currentYear = dayjs().year()
  const targetYear = dayjs(date).year()
  const isInCurrentYear = targetYear === currentYear

  if (isMoreThan7DaysAgo && isInCurrentYear) return dayjs(date).format('MMM D')
  if (!isInCurrentYear) return dayjs(date).format('MMM D, YYYY')

  return dayjs(date).fromNow()
}
