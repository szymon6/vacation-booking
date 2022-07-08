const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function getVacationDays(id) {
  const v = await prisma.employee.findUnique({
    where: {
      id,
    },
    select: {
      vacationDays: true,
    },
  })
  return v.vacationDays
}

module.exports = { getVacationDays }
