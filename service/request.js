const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function all(author, status) {
  if (author) author = Number(author)
  return await prisma.request.findMany({
    where: {
      author,
      Status: {
        value: status,
      },
    },
    include: {
      Author: {
        select: { name: true },
      },
      Status: {
        select: { value: true },
      },
    },

    orderBy: { id: 'asc' },
  })
}

async function newRequest(author, vacation_start_date, vacation_end_date) {
  if (author) author = Number(author)
  return await prisma.request.create({
    data: {
      author,
      vacation_start_date,
      vacation_end_date,
      status: 2,
    },
  })
}
module.exports = { all, newRequest }
