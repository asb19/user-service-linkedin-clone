/*
  Warnings:

  - A unique constraint covering the columns `[contactNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "altContactNo" TEXT,
ADD COLUMN     "altEmail" TEXT,
ADD COLUMN     "contactNo" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_contactNo_key" ON "User"("contactNo");
