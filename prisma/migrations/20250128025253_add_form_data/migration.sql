-- CreateTable
CREATE TABLE "FormData" (
    "id" SERIAL NOT NULL,
    "pendetaCount" INTEGER NOT NULL,
    "jemaatCount" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormData_pkey" PRIMARY KEY ("id")
);
