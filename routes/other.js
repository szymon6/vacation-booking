const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { validateToken } = require('../middleware/validation')

const router = express.Router()
const prisma = new PrismaClient()

//protect all routes with jwt
router.use(validateToken)

//get my remaining vacation days
router.get('/days-left', async (req, res) => {
  try {
    const daysLeft = await prisma.employee.findMany({
      where: {
        id: req.headers.userId,
      },
      select: {
        vacationDays: true,
      },
    })

    res.send(daysLeft)
  } catch (e) {
    return res.status(400).send(e)
  }
})

module.exports = router
