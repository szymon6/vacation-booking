const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function newRequest(author, vacation_start_date, vacation_end_date) {
  return await prisma.request.create({
    data: {
      author,
      vacation_start_date,
      vacation_end_date,
      status: 1,
    },
  })
}
module.exports = { newRequest }
