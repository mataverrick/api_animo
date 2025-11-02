/*
  Warnings:

  - You are about to drop the column `emoion` on the `Estado` table. All the data in the column will be lost.
  - Added the required column `emocion` to the `Estado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Estado" DROP COLUMN "emoion",
ADD COLUMN     "emocion" "Emociones" NOT NULL;
