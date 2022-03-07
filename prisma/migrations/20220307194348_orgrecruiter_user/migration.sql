-- CreateTable
CREATE TABLE "OrganisationInvites" (
    "id" SERIAL NOT NULL,
    "orgId" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "OrganisationInvites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrganisationRecruiters" ADD CONSTRAINT "OrganisationRecruiters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
