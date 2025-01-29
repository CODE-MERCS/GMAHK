/*
  Warnings:

  - You are about to drop the column `jemaatCount` on the `FormData` table. All the data in the column will be lost.
  - You are about to drop the column `pendetaCount` on the `FormData` table. All the data in the column will be lost.
  - Added the required column `perlawatanCount` to the `FormData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormData" DROP COLUMN "jemaatCount",
DROP COLUMN "pendetaCount",
ADD COLUMN     "perlawatanCount" INTEGER NOT NULL;
