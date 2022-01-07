/*
  Warnings:

  - A unique constraint covering the columns `[organisationId]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "organisationId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_organisationId_key" ON "UserProfile"("organisationId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
