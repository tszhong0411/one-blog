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

type DateInput = string | Date | number
type Options = {
  relative?: boolean
  thresholdDays?: number
  format?: string
}

export const formatPostDate = (date: DateInput, options: Options = {}): string => {
  const { relative = false, thresholdDays = 7, format = 'MMM D, YYYY' } = options

  const dateObj = dayjs(date)
  const thresholdDate = dayjs().subtract(thresholdDays, 'day')
  const isWithinThreshold = dateObj.isAfter(thresholdDate)

  if (isWithinThreshold && relative) {
    // Relative time
    return dateObj.fromNow()
  }

  return dateObj.format(format)
}
