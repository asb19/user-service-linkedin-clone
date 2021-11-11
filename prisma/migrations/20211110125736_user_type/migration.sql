-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('individual', 'recruiter');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "USER_TYPE" NOT NULL DEFAULT E'individual';
