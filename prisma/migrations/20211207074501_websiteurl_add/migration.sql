/*
  Warnings:

  - Added the required column `websiteUrl` to the `OrgContactDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrgContactDetails" ADD COLUMN     "websiteUrl" TEXT NOT NULL;
