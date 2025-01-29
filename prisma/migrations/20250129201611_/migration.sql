/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `FormData` table. All the data in the column will be lost.
  - You are about to drop the column `jpkajCount` on the `FormData` table. All the data in the column will be lost.
  - You are about to drop the column `jpknCount` on the `FormData` table. All the data in the column will be lost.
  - You are about to drop the column `jpkpCount` on the `FormData` table. All the data in the column will be lost.
  - You are about to drop the column `jpyuCount` on the `FormData` table. All the data in the column will be lost.
  - Added the required column `baptisanBulanIni` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `berkhotbahSabat` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `berkhotbahSabat7` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoBaptisanBulanIni` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoKelompokPeduli` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoKomiteJemaat` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPelatihanKonferens` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPelatihanPendeta` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPelatihanUNI` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPembelajaran` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPenanamanGereja` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPerlawatanJemaat` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPerlawatanPendeta` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoPerlawatannonSDA` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoSeminarKhotbah` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoTamuKelompok` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hadirSabat2` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hadirSabat7` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlahDiakon` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlahKKR` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jumlahPersembahan` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelompokPeduli` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ketuaJemaat` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `komiteJemaat` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pelatihanKonferens` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pelatihanPendeta` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pelatihanUNI` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pembelajaranAlkitab` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penanamanGereja` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perlawatanJemaat` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perlawatanPendeta` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `perlawatannonSDA` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persentaseKehadiranBulan` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `persentasiDiakones` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retreatPendeta` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seminarKhotbah` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tamuKelompokPeduli` to the `FormData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetBaptisan` to the `FormData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormData" DROP COLUMN "imageUrl",
DROP COLUMN "jpkajCount",
DROP COLUMN "jpknCount",
DROP COLUMN "jpkpCount",
DROP COLUMN "jpyuCount",
ADD COLUMN     "baptisanBulanIni" INTEGER NOT NULL,
ADD COLUMN     "berkhotbahSabat" INTEGER NOT NULL,
ADD COLUMN     "berkhotbahSabat7" INTEGER NOT NULL,
ADD COLUMN     "bulan" TEXT NOT NULL,
ADD COLUMN     "fotoBaptisanBulanIni" TEXT NOT NULL,
ADD COLUMN     "fotoKelompokPeduli" TEXT NOT NULL,
ADD COLUMN     "fotoKomiteJemaat" TEXT NOT NULL,
ADD COLUMN     "fotoPelatihanKonferens" TEXT NOT NULL,
ADD COLUMN     "fotoPelatihanPendeta" TEXT NOT NULL,
ADD COLUMN     "fotoPelatihanUNI" TEXT NOT NULL,
ADD COLUMN     "fotoPembelajaran" TEXT NOT NULL,
ADD COLUMN     "fotoPenanamanGereja" TEXT NOT NULL,
ADD COLUMN     "fotoPerlawatanJemaat" TEXT NOT NULL,
ADD COLUMN     "fotoPerlawatanPendeta" TEXT NOT NULL,
ADD COLUMN     "fotoPerlawatannonSDA" TEXT NOT NULL,
ADD COLUMN     "fotoSeminarKhotbah" TEXT NOT NULL,
ADD COLUMN     "fotoTamuKelompok" TEXT NOT NULL,
ADD COLUMN     "hadirSabat2" INTEGER NOT NULL,
ADD COLUMN     "hadirSabat7" INTEGER NOT NULL,
ADD COLUMN     "jumlahDiakon" INTEGER NOT NULL,
ADD COLUMN     "jumlahKKR" INTEGER NOT NULL,
ADD COLUMN     "jumlahPersembahan" INTEGER NOT NULL,
ADD COLUMN     "kelompokPeduli" INTEGER NOT NULL,
ADD COLUMN     "ketuaJemaat" INTEGER NOT NULL,
ADD COLUMN     "komiteJemaat" INTEGER NOT NULL,
ADD COLUMN     "pelatihanKonferens" INTEGER NOT NULL,
ADD COLUMN     "pelatihanPendeta" INTEGER NOT NULL,
ADD COLUMN     "pelatihanUNI" INTEGER NOT NULL,
ADD COLUMN     "pembelajaranAlkitab" INTEGER NOT NULL,
ADD COLUMN     "penanamanGereja" INTEGER NOT NULL,
ADD COLUMN     "perlawatanJemaat" INTEGER NOT NULL,
ADD COLUMN     "perlawatanPendeta" INTEGER NOT NULL,
ADD COLUMN     "perlawatannonSDA" INTEGER NOT NULL,
ADD COLUMN     "persentaseKehadiranBulan" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "persentasiDiakones" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "retreatPendeta" INTEGER NOT NULL,
ADD COLUMN     "seminarKhotbah" INTEGER NOT NULL,
ADD COLUMN     "tamuKelompokPeduli" INTEGER NOT NULL,
ADD COLUMN     "targetBaptisan" INTEGER NOT NULL;
