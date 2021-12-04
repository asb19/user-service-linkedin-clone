/*
  Warnings:

  - You are about to drop the column `address` on the `Organisation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Organisation" DROP COLUMN "address",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "estaclishedDate" DATE,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "logo" TEXT;
