/*
  Warnings:

  - Changed the type of `demandLevel` on the `IndustryInsights` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DemandLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "IndustryInsights" DROP COLUMN "demandLevel",
ADD COLUMN     "demandLevel" "DemandLevel" NOT NULL;

-- DropEnum
DROP TYPE "DemanLevel";
