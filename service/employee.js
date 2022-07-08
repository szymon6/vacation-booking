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

async function subtractVacationDays(id, n) {
  const current = await getVacationDays(id)
  await prisma.employee.update({
    where: { id },
    data: { vacationDays: current - n },
  })
}

module.exports = { getVacationDays, subtractVacationDays }
