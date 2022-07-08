const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
  const token = req.headers.token

  await jwt.verify(token, 'testkey', async (err, decoded) => {
    if (err) return res.status(403).send() //not authorized (bad jwt)

    const employee = await prisma.employee.findUnique({
      select: { id: true, login: true },
      where: { id: decoded.userId },
    })
    req.headers.userId = employee.id
    console.log('authorized')
    next()
  })
}

module.exports = { validateToken }
