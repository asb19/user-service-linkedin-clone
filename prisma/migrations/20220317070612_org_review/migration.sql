-- CreateTable
CREATE TABLE "OrganisationReviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orgId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviewTitle" TEXT NOT NULL,
    "reviewText" TEXT,
    "userDetail" TEXT NOT NULL DEFAULT E'individual',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "OrganisationReviews_pkey" PRIMARY KEY ("id")
);
