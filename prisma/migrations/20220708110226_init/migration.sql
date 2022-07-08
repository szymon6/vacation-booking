-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "vacationDays" INTEGER NOT NULL,

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_status" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "request_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "request_created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "request_updated_at" DATE NOT NULL,
    "author" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "resolved_by" INTEGER NOT NULL,
    "vacation_start_date" DATE NOT NULL,
    "vacation_end_date" DATE NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "request_status_value_key" ON "request_status"("value");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_author_fkey" FOREIGN KEY ("author") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_resolved_by_fkey" FOREIGN KEY ("resolved_by") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_status_fkey" FOREIGN KEY ("status") REFERENCES "request_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
