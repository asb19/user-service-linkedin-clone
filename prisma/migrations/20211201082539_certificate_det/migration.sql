-- DropForeignKey
ALTER TABLE "UserCertificateDetails" DROP CONSTRAINT "UserCertificateDetails_professionalId_fkey";

-- AlterTable
ALTER TABLE "UserCertificateDetails" ALTER COLUMN "issuedAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserCertificateDetails" ADD CONSTRAINT "UserCertificateDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
