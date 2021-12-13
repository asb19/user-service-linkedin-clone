-- AlterTable
ALTER TABLE "OrgAwardsDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "OrgContactDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "OrgCourseDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "OrgTrainingDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "UserAwardsDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "UserCertificateDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "UserEducation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "UserExperience" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "UserProfessionalDetail" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- AlterTable
ALTER TABLE "UserTrainingDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" DATE;

-- CreateTable
CREATE TABLE "OrgEventDetails" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organisationId" INTEGER,
    "date" DATE NOT NULL,
    "desc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE,
    "eventUrl" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "OrgEventDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrgEventDetails" ADD CONSTRAINT "OrgEventDetails_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
