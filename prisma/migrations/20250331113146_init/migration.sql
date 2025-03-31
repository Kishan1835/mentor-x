/*
  Warnings:

  - The `keyTrends` column on the `IndustryInsights` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `CoverLetter` table without a default value. This is not possible if the table is not empty.
  - Made the column `companyName` on table `CoverLetter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoverLetter" ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "companyName" SET NOT NULL;

-- AlterTable
ALTER TABLE "IndustryInsights" DROP COLUMN "keyTrends",
ADD COLUMN     "keyTrends" TEXT[];

-- CreateIndex
CREATE INDEX "CoverLetter_userId_idx" ON "CoverLetter"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_key" ON "Resume"("userId");
