import moment from 'moment'

export default class Format {
  static numeric = (number) => (number || 0).toLocaleString(
    undefined, { minimumFractionDigits: 0 }
  )

  static DATE = {
    SHORT_DATE: 'YYYY-MM-DD'
  }

  static date = (date, format) => (date ? moment(date).format(format) : '')

  static time = (time, format) => (time ? moment(time, 'HH:mm:ss').format(format || 'HH:mm') : '')
}
