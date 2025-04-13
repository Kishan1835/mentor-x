import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
    { name: "Generate Industry Insights" },
    { cron: "0 0 * * 0" }, // Run every Sunday at midnight
    async ({ event, step }) => {
        const industries = await step.run("Fetch industries", async () => {
            return await db.industryInsights.findMany({
                select: { industry: true },
            });
        });

        for (const { industry } of industries) {
            const prompt = `
Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "HIGH" | "MEDIUM" | "LOW",
  "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
  "recommendedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"]
}

IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
Ensure salaryRanges includes at least 5 common roles with realistic salary figures.
`;

            const res = await step.ai.wrap(
                "gemini",
                async (p) => {
                    return await model.generateContent(p);
                },
                prompt
            );

            const parts = res?.response?.candidates?.[0]?.content?.parts;
            const rawText = parts?.[0]?.text || "";
            const cleanedText = rawText.replace(/```(?:json)?\n?/g, "").trim();

            let insights;
            try {
                insights = JSON.parse(cleanedText);
            } catch (error) {
                console.error(`❌ Failed to parse JSON for ${industry}:`, cleanedText);
                continue;
            }

            // Enum validation
            const validDemandLevels = ["HIGH", "MEDIUM", "LOW"];
            const validOutlooks = ["POSITIVE", "NEUTRAL", "NEGATIVE"];

            if (
                !validDemandLevels.includes(insights.demandLevel) ||
                !validOutlooks.includes(insights.marketOutlook)
            ) {
                console.warn(`⚠️ Invalid enum values for ${industry}`);
                continue;
            }

            const updateResult = await step.run(`Update ${industry} insights`, async () => {
                return await db.industryInsights.update({
                    where: { industry },
                    data: {
                        salaryrange: insights.salaryRanges,
                        growthRate: insights.growthRate,
                        demandLevel: insights.demandLevel,
                        topskills: insights.topSkills,
                        marketOutlook: insights.marketOutlook,
                        keyTrends: insights.keyTrends,
                        recommendedSkills: insights.recommendedSkills,
                        lastUpdated: new Date(),
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week later
                    },
                });
            });

            console.log(`✅ Successfully updated insights for ${industry}`, updateResult);
        }
    }
);
