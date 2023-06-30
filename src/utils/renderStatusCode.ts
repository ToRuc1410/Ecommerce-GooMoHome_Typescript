import moment from 'moment'
import { colorStatus, orderStatus } from 'src/constants/purchaseStatus'

export const renderStatusCode = (statusNumber: number) => {
  return orderStatus[statusNumber]
}
export const renderColorStatusCode = (colorStatusNumber: number) => {
  return colorStatus[colorStatusNumber]
}
export const renderDate = (date: string) => {
  const momentDay = moment(date)
  return momentDay.format('HH:mm DD/MM/YYYY')
}
