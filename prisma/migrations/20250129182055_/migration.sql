/*
  Warnings:

  - You are about to drop the column `perlawatanCount` on the `FormData` table. All the data in the column will be lost.
  - Added the required column `jpkajCount` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jpknCount` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jpkpCount` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jpyuCount` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FormData" DROP COLUMN "perlawatanCount",
ADD COLUMN     "jpkajCount" INTEGER NOT NULL,
ADD COLUMN     "jpknCount" INTEGER NOT NULL,
ADD COLUMN     "jpkpCount" INTEGER NOT NULL,
ADD COLUMN     "jpyuCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
