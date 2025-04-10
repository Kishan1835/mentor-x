/*
  Warnings:

  - You are about to drop the `IndustryInsight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_industry_fkey";

-- DropTable
DROP TABLE "IndustryInsight";

-- CreateTable
CREATE TABLE "IndustryInsights" (
    "id" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "salaryrange" JSONB[],
    "growthRate" DOUBLE PRECISION NOT NULL,
    "demandLevel" "DemandLevel" NOT NULL,
    "topskills" TEXT[],
    "marketOutlook" "MarketOutlook" NOT NULL,
    "keyTrends" TEXT[],
    "recommendedSkills" TEXT[],
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextUpdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndustryInsights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IndustryInsights_industry_key" ON "IndustryInsights"("industry");

-- CreateIndex
CREATE INDEX "IndustryInsights_industry_idx" ON "IndustryInsights"("industry");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_industry_fkey" FOREIGN KEY ("industry") REFERENCES "IndustryInsights"("industry") ON DELETE SET NULL ON UPDATE CASCADE;
