-- AlterTable
ALTER TABLE "UserEducation" ADD COLUMN     "instituteId" INTEGER;

-- CreateTable
CREATE TABLE "UserProfessionalDetail" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT,
    "keySkills" TEXT[],

    CONSTRAINT "UserProfessionalDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExperience" (
    "id" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "organisationId" INTEGER,
    "industry" TEXT NOT NULL,
    "fromTime" DATE,
    "endTime" DATE,
    "mediaUrls" TEXT[],
    "isCurrent" BOOLEAN NOT NULL,

    CONSTRAINT "UserExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organisation" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT,
    "cityId" INTEGER,
    "zipcode" TEXT,
    "affiliation" TEXT,
    "isInstitute" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfessionalDetail_userId_key" ON "UserProfessionalDetail"("userId");

-- AddForeignKey
ALTER TABLE "UserEducation" ADD CONSTRAINT "UserEducation_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfessionalDetail" ADD CONSTRAINT "UserProfessionalDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExperience" ADD CONSTRAINT "UserExperience_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "UserProfessionalDetail"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
