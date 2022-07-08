const express = require('express')
const { getDays } = require('../functions')
const {
  validateToken,
  ensureManager,
  validateId,
  ensurePending,
} = require('../middleware/validation')
const { getVacationDays } = require('../service/employee')
const requestService = require('../service/request')

const router = express.Router()

//protect all routes with jwt
router.use(validateToken)

//validate and parse id to number
router.param('id', validateId)

//get all my requests
router.get('/', async (req, res) => {
  try {
    const myRequests = await requestService.all(
      req.headers.userId, //injected by middleware
      req.query.status
    )
    res.send(myRequests)
  } catch (e) {
    return res.status(500).send(e)
  }
})

//new request
router.post('/', async (req, res) => {
  const { vacation_start_date, vacation_end_date } = req.body
  const id = req.headers.userId

  const daysLeft = await getVacationDays(id)
  const days = getDays(vacation_start_date, vacation_end_date)

  if (days > daysLeft)
    return res
      .status(400)
      .send(
        `you are trying to book ${days} days, but your current limit is ${daysLeft}`
      )

  const request = await requestService.newRequest(
    id,
    vacation_start_date,
    vacation_end_date
  )
  res.send(`request successfully created, request id: ${request.id}`)
})

//get all requests
router.get('/all', ensureManager, async (req, res) => {
  try {
    const allRequests = await requestService.all(
      req.query.author,
      req.query.status
    )
    res.send(allRequests)
  } catch (e) {
    return res.status(500).send(e)
  }
})

//approve
router.post('/approve/:id', ensureManager, ensurePending, async (req, res) => {
  try {
    const approvedRequest = await requestService.approve(req.params.id)
    res.send(`request ${approvedRequest.id} approved`)
  } catch (e) {
    return res.status(500).send(e)
  }
})

//approve
router.post('/reject/:id', ensureManager, ensurePending, async (req, res) => {
  try {
    const approvedRequest = await requestService.reject(req.params.id)
    res.send(`request ${approvedRequest.id} rejected`)
  } catch (e) {
    return res.status(500).send(e)
  }
})

module.exports = router
