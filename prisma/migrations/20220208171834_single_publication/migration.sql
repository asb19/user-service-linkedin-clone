/*
  Warnings:

  - A unique constraint covering the columns `[professionalId]` on the table `UserPublicationDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPublicationDetails_professionalId_key" ON "UserPublicationDetails"("professionalId");
