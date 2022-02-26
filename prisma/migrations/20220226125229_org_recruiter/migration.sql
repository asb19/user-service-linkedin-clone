-- CreateTable
CREATE TABLE "OrganisationRecruiters" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orgId" INTEGER NOT NULL,
    "role" TEXT NOT NULL DEFAULT E'ADMIN',
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrganisationRecruiters_pkey" PRIMARY KEY ("id")
);
