const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const employeeTypes = [
  {
    id: 1,
    value: 'worker',
  },
  {
    id: 2,
    value: 'manager',
  },
]

employeeTypes.forEach(async (empType) => {
  await prisma.employee_type.create({
    data: {
      ...empType,
    },
  })
})

const requestStatus = [
  {
    id: 1,
    value: 'approved',
  },
  {
    id: 2,
    value: 'pending',
  },
  {
    id: 3,
    value: 'rejected',
  },
]

requestStatus.forEach(async (rs) => {
  await prisma.request_status.create({
    data: {
      ...rs,
    },
  })
})

const employees = [
  {
    id: 1,
    login: 'user1',
    password: 'p1',
    name: 'John',
    vacationDays: 30,
    type: 1,
  },
  {
    id: 2,
    login: 'user2',
    password: 'p2',
    name: 'Mike',
    vacationDays: 30,
    type: 2,
  },
  {
    id: 3,
    login: 'user3',
    password: 'p3',
    name: 'Adam',
    vacationDays: 30,
    type: 1,
  },
  {
    id: 4,
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
