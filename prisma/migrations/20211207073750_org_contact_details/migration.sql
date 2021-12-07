-- CreateTable
CREATE TABLE "OrgContactDetails" (
    "id" TEXT NOT NULL,
    "organisationId" INTEGER,
    "emailId" TEXT NOT NULL,
    "altEmailId" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "altContactNum" TEXT NOT NULL,

    CONSTRAINT "OrgContactDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrgContactDetails_organisationId_key" ON "OrgContactDetails"("organisationId");

-- AddForeignKey
ALTER TABLE "OrgContactDetails" ADD CONSTRAINT "OrgContactDetails_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
