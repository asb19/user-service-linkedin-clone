/*
  Warnings:

  - The primary key for the `UserCurriculumDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserHobbies` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserCurriculumDetails" DROP CONSTRAINT "UserCurriculumDetails_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserCurriculumDetails_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserCurriculumDetails_id_seq";

-- AlterTable
ALTER TABLE "UserHobbies" DROP CONSTRAINT "UserHobbies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserHobbies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserHobbies_id_seq";
