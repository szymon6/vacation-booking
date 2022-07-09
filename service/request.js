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
      Resolved_by: {
        select: { name: true },
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

async function approve(id, resolvedBy) {
  const request = await get(id)

  const days = getDays(request.vacation_start_date, request.vacation_end_date)
  await subtractVacationDays(request.author, days)

  return await prisma.request.update({
    where: { id },
    data: { status: 1, resolved_by: resolvedBy },
  })
}

async function reject(id, resolvedBy) {
  return await prisma.request.update({
    where: { id },
    data: { status: 3, resolved_by: resolvedBy },
  })
}

async function getOverlappingRequests() {
  function requestsOverlap(request1, request2) {
    return (
      request1.vacation_start_date <= request2.vacation_end_date &&
      request2.vacation_start_date <= request1.vacation_end_date
    )
  }

  function multipleRequestsOverlap(requests) {
    let overlappingRequests = []

    const pushUnique = (request) => {
      if (overlappingRequests.indexOf(request) === -1)
        overlappingRequests.push(request)
    }

    let i = 0,
      j = 0

    for (i = 0; i < requests.length - 1; i += 1) {
      for (j = i + 1; j < requests.length; j += 1) {
        if (requestsOverlap(requests[i], requests[j])) {
          pushUnique(requests[i])
          pushUnique(requests[j])
        }
      }
    }
    return overlappingRequests
  }

  const all = await prisma.request.findMany()
  const overlapping = multipleRequestsOverlap(all)
  return overlapping
}

module.exports = {
  get,
  all,
  newRequest,
  approve,
  reject,
  getOverlappingRequests,
}
