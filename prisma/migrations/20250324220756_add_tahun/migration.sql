/*
  Warnings:

  - Added the required column `tahun` to the `FormData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormData" ADD COLUMN     "tahun" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Draft" (
    "id" SERIAL NOT NULL,
    "tahun" INTEGER NOT NULL,
    "bulan" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "hadirSabat2" INTEGER NOT NULL,
    "hadirSabat7" INTEGER NOT NULL,
    "persentaseKehadiranBulan" DOUBLE PRECISION NOT NULL,
    "perlawatanJemaat" INTEGER NOT NULL,
    "perlawatannonSDA" INTEGER NOT NULL,
    "perlawatanPendeta" INTEGER NOT NULL,
    "pelatihanUNI" INTEGER,
    "pelatihanKonferens" INTEGER,
    "pelatihanPendeta" INTEGER,
    "kelompokPeduli" INTEGER,
    "tamuKelompokPeduli" INTEGER,
    "pembelajaranAlkitab" INTEGER,
    "jumlahKKR" INTEGER NOT NULL,
    "targetBaptisan" INTEGER NOT NULL,
    "baptisanBulanIni" INTEGER NOT NULL,
    "seminarKhotbah" INTEGER,
    "retreatPendeta" INTEGER NOT NULL,
    "penanamanGereja" INTEGER,
    "ketuaJemaat" INTEGER NOT NULL,
    "jumlahDiakon" INTEGER NOT NULL,
    "berkhotbahSabat" INTEGER NOT NULL,
    "berkhotbahSabat7" INTEGER NOT NULL,
    "persentasiDiakones" DOUBLE PRECISION NOT NULL,
    "jumlahPersembahan" INTEGER NOT NULL,
    "komiteJemaat" INTEGER NOT NULL,
    "fotoPerlawatanJemaat" TEXT NOT NULL,
    "fotoPerlawatannonSDA" TEXT NOT NULL,
    "fotoPerlawatanPendeta" TEXT NOT NULL,
    "fotoPelatihanUNI" TEXT,
    "fotoPelatihanKonferens" TEXT,
    "fotoPelatihanPendeta" TEXT,
    "fotoKelompokPeduli" TEXT,
    "fotoTamuKelompok" TEXT,
    "fotoPembelajaran" TEXT,
    "fotoBaptisanBulanIni" TEXT NOT NULL,
    "fotoSeminarKhotbah" TEXT,
    "fotoPenanamanGereja" TEXT,
    "fotoKomiteJemaat" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Draft_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Draft" ADD CONSTRAINT "Draft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
