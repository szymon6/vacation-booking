const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const dictionary_data = {
  request_status: [
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
  ],
  employee_type: [
    {
      id: 1,
      value: 'worker',
    },
    {
      id: 2,
      value: 'manager',
    },
  ],
}

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

;(async function generate() {
  for (const tableName in dictionary_data)
    for (const record of dictionary_data[tableName])
      await prisma[tableName].create({ data: record })

  for (const emp of employees) {
    const hashedPass = await bcrypt.hash(emp.password, 10)

    await prisma.employee.create({
      data: {
        ...emp,
        password: hashedPass,
      },
    })
  }
})()
