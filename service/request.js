const { PrismaClient } = require('@prisma/client')
const { getDays } = require('../functions')
const { subtractVacationDays } = require('./employee')
const prisma = new PrismaClient()

async function get(id) {
  return await prisma.request.findUnique({
    where: { id },
  })
}

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

async function approve(id) {
  const request = await get(id)

  const days = getDays(request.vacation_start_date, request.vacation_end_date)
  await subtractVacationDays(request.author, days)

  return await prisma.request.update({
    where: { id },
    data: { status: 1 },
  })
}

async function reject(id) {
  return await prisma.request.update({
    where: { id },
    data: { status: 3 },
  })
}

module.exports = { get, all, newRequest, approve, reject }
