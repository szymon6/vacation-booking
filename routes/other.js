const express = require('express')
const { validateToken } = require('../middleware/validation')
const { getVacationDays } = require('../service/employee')

const router = express.Router()

//protect all routes with jwt
router.use(validateToken)

//get my remaining vacation days
router.get('/days-left', async (req, res) => {
  try {
    const daysLeft = await getVacationDays(req.headers.userId)
    res.send(daysLeft.toString())
  } catch (e) {
    return res.status(500).send(e)
  }
})

module.exports = router
