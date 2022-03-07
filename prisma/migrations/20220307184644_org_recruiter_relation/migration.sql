/*
  Warnings:

  - You are about to drop the column `organisationId` on the `UserProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_organisationId_fkey";

-- DropIndex
DROP INDEX "UserProfile_organisationId_key";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "organisationId";

-- AddForeignKey
ALTER TABLE "OrganisationRecruiters" ADD CONSTRAINT "OrganisationRecruiters_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
