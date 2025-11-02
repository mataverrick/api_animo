-- CreateEnum
CREATE TYPE "Emociones" AS ENUM ('Mal', 'Normal', 'Bien');

-- CreateTable
CREATE TABLE "Estado" (
    "id" SERIAL NOT NULL,
    "fecha" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emoion" "Emociones" NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("id")
);
