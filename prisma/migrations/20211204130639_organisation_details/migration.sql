-- CreateTable
CREATE TABLE "OrgAwardsDetails" (
    "id" TEXT NOT NULL,
    "organisationId" INTEGER,
    "title" TEXT NOT NULL,
    "issuedBy" TEXT NOT NULL,
    "issuedDate" DATE NOT NULL,
    "awardsDescription" TEXT,
    "mediaUrls" TEXT[],

    CONSTRAINT "OrgAwardsDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgTrainingDetails" (
    "id" TEXT NOT NULL,
    "organisationId" INTEGER,
    "title" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "trainingDecs" TEXT,
    "mediaUrls" TEXT[],

    CONSTRAINT "OrgTrainingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgCourseDetails" (
    "id" TEXT NOT NULL,
    "organisationId" INTEGER,
    "title" TEXT NOT NULL,
    "affiliatedTo" TEXT,
    "mediaUrls" TEXT[],

    CONSTRAINT "OrgCourseDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrgAwardsDetails" ADD CONSTRAINT "OrgAwardsDetails_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OrgTrainingDetails" ADD CONSTRAINT "OrgTrainingDetails_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "OrgCourseDetails" ADD CONSTRAINT "OrgCourseDetails_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
