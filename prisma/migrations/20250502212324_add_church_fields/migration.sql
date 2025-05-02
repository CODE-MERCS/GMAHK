/*
  Warnings:

  - Added the required column `jemaat` to the `Draft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ketuaJemaatName` to the `Draft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wilayah` to the `Draft` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jemaat` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ketuaJemaatName` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wilayah` to the `FormData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Draft" ADD COLUMN     "jemaat" TEXT NOT NULL,
ADD COLUMN     "ketuaJemaatName" TEXT NOT NULL,
ADD COLUMN     "wilayah" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FormData" ADD COLUMN     "jemaat" TEXT NOT NULL,
ADD COLUMN     "ketuaJemaatName" TEXT NOT NULL,
ADD COLUMN     "wilayah" TEXT NOT NULL;
