const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { validateToken } = require('../middleware/validation')

const router = express.Router()
const prisma = new PrismaClient()

//protect all routes with jwt
router.use(validateToken)

//get all my requests
router.get('/my', async (req, res) => {
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
    return res.status(400).send(e)
  }
})

module.exports = router
