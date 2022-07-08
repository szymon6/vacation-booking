const express = require('express')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
var jwt = require('jsonwebtoken')

const router = express.Router()
const prisma = new PrismaClient()

//login - send jwt
router.post('/login', async (req, res) => {
  const { login, password } = req.body

  try {
    const employee = await prisma.employee.findFirst({
      where: { login },
    })

    if (!employee || !(await bcrypt.compare(password, employee.password)))
      return res.status(401).send() //bad login or password

    const token = jwt.sign({ userId: employee.id }, 'testkey')
    delete employee.password

    res.send({ user: employee, token })
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
