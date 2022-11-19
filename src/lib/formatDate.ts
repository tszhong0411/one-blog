import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const formatDate = (date: Date) =>
  dayjs(date).format('DD MMM YYYY[,] hh:mm')
