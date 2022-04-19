-- CreateTable
CREATE TABLE "ConnectionMapping" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'requested',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ConnectionMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageFollowMapping" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "PageFollowMapping_pkey" PRIMARY KEY ("id")
);
