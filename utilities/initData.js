const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const employees = [
  {
    login: 'user1',
    password: 'p1',
    name: 'John',
    vacationDays: 30,
    type: 1,
  },
  {
    login: 'user2',
    password: 'p2',
    name: 'Mike',
    vacationDays: 30,
    type: 2,
  },
  {
    login: 'user3',
    password: 'p3',
    name: 'Adam',
    vacationDays: 30,
    type: 1,
  },
  {
    login: 'user4',
    password: 'p4',
    name: 'Rick',
    vacationDays: 30,
    type: 2,
  },
]

employees.forEach(async (emp) => {
  const hashedPass = await bcrypt.hash(emp.password, 10)

  await prisma.employee.create({
    data: {
      ...emp,
      password: hashedPass,
    },
  })
})
