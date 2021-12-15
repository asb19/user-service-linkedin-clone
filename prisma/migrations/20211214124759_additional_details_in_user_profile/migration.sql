-- AlterTable
ALTER TABLE "UserAwardsDetails" ADD COLUMN     "statusCode" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "UserCertificateDetails" ADD COLUMN     "statusCode" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "UserExperience" ADD COLUMN     "statusCode" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "UserTrainingDetails" ADD COLUMN     "statusCode" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "UserPublicationDetails" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL DEFAULT 1,
    "publisher" TEXT,
    "publishedAt" DATE,
    "publicationUrl" TEXT,
    "publicationDecs" TEXT,
    "mediaUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserPublicationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPatentDetails" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "IPRTitle" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT,
    "patentDecs" TEXT,
    "validCountries" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserPatentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHobbies" (
    "id" SERIAL NOT NULL,
    "professionalId" TEXT NOT NULL,
    "hobbies" TEXT[],
    "mediaUrls" TEXT[],
    "statusCode" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserHobbies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCurriculumDetails" (
    "id" SERIAL NOT NULL,
    "professionalId" TEXT NOT NULL,
    "activities" TEXT[],
    "mediaUrls" TEXT[],
    "statusCode" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserCurriculumDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserScholarshipDetails" (
    "id" SERIAL NOT NULL,
    "professionalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scholarshipDecs" TEXT,
    "amount" TEXT NOT NULL,
    "issuedBy" TEXT,
    "statusCode" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserScholarshipDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGoogleCertificationDetails" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issuedAt" DATE,
    "certificateURL" TEXT,
    "statusCode" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserGoogleCertificationDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserScopusDetails" (
    "id" SERIAL NOT NULL,
    "professionalId" TEXT NOT NULL,
    "paperTitle" TEXT NOT NULL,
    "issuedAt" DATE,
    "scopusUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "statusCode" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserScopusDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHindexDetails" (
    "id" SERIAL NOT NULL,
    "professionalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issuedAt" DATE,
    "indexUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "statusCode" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserHindexDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserHobbies_professionalId_key" ON "UserHobbies"("professionalId");

-- CreateIndex
CREATE UNIQUE INDEX "UserCurriculumDetails_professionalId_key" ON "UserCurriculumDetails"("professionalId");

-- AddForeignKey
ALTER TABLE "UserPublicationDetails" ADD CONSTRAINT "UserPublicationDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserPatentDetails" ADD CONSTRAINT "UserPatentDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserHobbies" ADD CONSTRAINT "UserHobbies_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserCurriculumDetails" ADD CONSTRAINT "UserCurriculumDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserScholarshipDetails" ADD CONSTRAINT "UserScholarshipDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserGoogleCertificationDetails" ADD CONSTRAINT "UserGoogleCertificationDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserScopusDetails" ADD CONSTRAINT "UserScopusDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserHindexDetails" ADD CONSTRAINT "UserHindexDetails_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
