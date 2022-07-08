const moment = require('moment')

function getDays(start_date, end_date) {
  const start = moment(start_date)
  const end = moment(end_date)
  return end.diff(start, 'days')
}

module.exports = { getDays }
