/*
  Warnings:

  - You are about to drop the `Manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Worker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_author_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_resolved_by_fkey";

-- DropTable
DROP TABLE "Manager";

-- DropTable
DROP TABLE "Worker";

-- CreateTable
CREATE TABLE "employee_type" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "employee_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vacationDays" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_type_fkey" FOREIGN KEY ("type") REFERENCES "employee_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_author_fkey" FOREIGN KEY ("author") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_resolved_by_fkey" FOREIGN KEY ("resolved_by") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
