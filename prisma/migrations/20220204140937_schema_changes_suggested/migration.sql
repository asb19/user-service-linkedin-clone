/*
  Warnings:

  - You are about to drop the column `issuedAt` on the `UserCertificateDetails` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrls` on the `UserPublicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `publicationDecs` on the `UserPublicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `publicationUrl` on the `UserPublicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `UserPublicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `UserPublicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `statusCode` on the `UserPublicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `UserPublicationDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserCertificateDetails" DROP COLUMN "issuedAt",
ADD COLUMN     "endDate" DATE,
ADD COLUMN     "startDate" DATE;

-- AlterTable
ALTER TABLE "UserExperience" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "UserPatentDetails" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "isApproved" BOOLEAN;

-- AlterTable
ALTER TABLE "UserPublicationDetails" DROP COLUMN "mediaUrls",
DROP COLUMN "publicationDecs",
DROP COLUMN "publicationUrl",
DROP COLUMN "publishedAt",
DROP COLUMN "publisher",
DROP COLUMN "statusCode",
DROP COLUMN "title",
ADD COLUMN     "gScholarUrl" TEXT,
ADD COLUMN     "sciUrl" TEXT,
ADD COLUMN     "scopusUrl" TEXT;
