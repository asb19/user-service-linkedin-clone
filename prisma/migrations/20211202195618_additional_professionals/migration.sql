-- CreateTable
CREATE TABLE "UserCertificateDetails" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "certificateName" TEXT NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "licenceNumber" TEXT NOT NULL,
    "issuedAt" DATE,
    "certificateURL" TEXT NOT NULL,

    CONSTRAINT "UserCertificateDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAwardsDetails" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "issuedDate" DATE NOT NULL,
    "awardsDescription" TEXT,
    "mediaUrls" TEXT[],

    CONSTRAINT "UserAwardsDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTrainingDetails" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "trainingDecs" TEXT,
    "mediaUrls" TEXT[],

    CONSTRAINT "UserTrainingDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCertificateDetails" ADD CONSTRAINT "UserCertificateDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAwardsDetails" ADD CONSTRAINT "UserAwardsDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserTrainingDetails" ADD CONSTRAINT "UserTrainingDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
