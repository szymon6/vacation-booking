-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_resolved_by_fkey";

-- DropIndex
DROP INDEX "Employee_login_key";

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "resolved_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_resolved_by_fkey" FOREIGN KEY ("resolved_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
