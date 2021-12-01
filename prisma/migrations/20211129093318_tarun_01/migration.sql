-- CreateTable
CREATE TABLE "UserCertificateDetails" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "certificateName" TEXT NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "licenceNumber" TEXT NOT NULL,
    "issuedAt" DATE NOT NULL,
    "certificateURL" TEXT NOT NULL,

    CONSTRAINT "UserCertificateDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCertificateDetails" ADD CONSTRAINT "UserCertificateDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
