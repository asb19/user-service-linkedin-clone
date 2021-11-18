-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "UserProfile" (
    "userId" TEXT NOT NULL,
    "photoUrl" TEXT,
    "dob" DATE,
    "gender" "GENDER" NOT NULL,
    "adhaarNo" TEXT,
    "passportNo" TEXT,
    "passportValidity" DATE,
    "passportPlaceAndCountryOfIssue" TEXT,
    "currentLocationId" INTEGER,
    "homeLocationId" INTEGER,
    "preferredLocations" INTEGER[],
    "mediaUrls" TEXT[],

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserEducation" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "degreeOrDiploma" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "fromTime" DATE,
    "endTime" DATE,
    "description" TEXT NOT NULL,
    "mediaUrls" TEXT[],
    "statusId" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserEducation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_currentLocationId_fkey" FOREIGN KEY ("currentLocationId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_homeLocationId_fkey" FOREIGN KEY ("homeLocationId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEducation" ADD CONSTRAINT "UserEducation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserProfile"("userId") ON DELETE CASCADE ON UPDATE NO ACTION;
