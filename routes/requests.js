const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { validateToken } = require('../middleware/validation')
const moment = require('moment')
const { getVacationDays } = require('../service/employee')
const { newRequest } = require('../service/request')

const router = express.Router()
const prisma = new PrismaClient()

//protect all routes with jwt
router.use(validateToken)

//get all my requests
router.get('/', async (req, res) => {
  try {
    const status = req.query.status
    console.log(status)
    const myRequests = await prisma.request.findMany({
      where: {
        author: req.headers.userId,
      },
      orderBy: { id: 'asc' },
    })

    res.send(myRequests)
  } catch (e) {
    return res.status(500).send(e)
  }
})

//new request
router.post('/', async (req, res) => {
  const { vacation_start_date, vacation_end_date } = req.body
  const id = req.headers.userId

  let start = moment(vacation_start_date)
  let end = moment(vacation_end_date)

  let days = end.diff(start, 'days')
  const daysLeft = await getVacationDays(id)

  if (days > daysLeft)
    return res
      .status(400)
      .send(
        `you are trying to book ${days} days, but your current limit is ${daysLeft}`
      )

  const request = await newRequest(id, vacation_start_date, vacation_end_date)
  res.send(`request successfully created, request id: ${request.id}`)
})

module.exports = router
