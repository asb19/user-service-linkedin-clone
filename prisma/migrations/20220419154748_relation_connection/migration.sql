/*
  Warnings:

  - Changed the type of `orgId` on the `PageFollowMapping` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PageFollowMapping" DROP COLUMN "orgId",
ADD COLUMN     "orgId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ConnectionMapping" ADD CONSTRAINT "ConnectionMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionMapping" ADD CONSTRAINT "ConnectionMapping_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageFollowMapping" ADD CONSTRAINT "PageFollowMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageFollowMapping" ADD CONSTRAINT "PageFollowMapping_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
