const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var jwt = require('jsonwebtoken')
const requestService = require('../service/request')

const validateToken = async (req, res, next) => {
  const token = req.headers.token

  await jwt.verify(token, 'testkey', async (err, decoded) => {
    if (err) return res.status(403).send('bad jwt') //not authorized

    const employee = await prisma.employee.findUnique({
      where: { id: decoded.userId },
    })
    req.headers.userId = employee.id
    req.headers.userType = employee.type
    next()
  })
}

const ensureManager = async (req, res, next) => {
  if (req.headers.userType != 2)
    return res.status(403).send("you don't have sufficient rights")
  next()
}

//validate :id param
const validateId = (req, res, next) => {
  const { id } = req.params
  const num = Number(id)
  if (!Number.isInteger(num)) return res.status(400).send()
  req.params.id = num
  next()
}

const ensurePending = async (req, res, next) => {
  const request = await requestService.get(req.params.id)
  if (request.status != 2)
    return res.status(400).send('request is not pending anymore')

  next()
}

module.exports = { validateToken, ensureManager, validateId, ensurePending }
