import { inngest } from "./client";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
    { name: "Generate Industry Insights" },
    { cron: "0 0 * * 0" },
    async ({ step }) => {
        const industries = await step.run("Fetch industries", async () => {
            return await db.IndustryInsights.findMany({
                select: { industry: true }
            });
        });

        for (const { industry } of industries) {
            const prompt = `
          Analyze the current state of the ${industry} industry and provide detailed, data-driven insights in ONLY the following JSON format without any additional notes or explanations.
          Focus on CURRENT market conditions and provide REALISTIC, VARIED data:
          {
            "salaryrange": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number, // Must be specific to ${industry}, based on latest market research
            "demandLevel": "High" | "Medium" | "Low", // Must reflect current ${industry} job market
            "topskills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          CRITICAL REQUIREMENTS:
          - Growth rate MUST be specific to ${industry} and vary between industries
          - Use actual market research data for the ${industry} sector
          - Growth rates should realistically range from -20% to +50% depending on industry conditions
          - Each response must be freshly generated with current data
          - Do not use placeholder or default values
          - Consider current economic conditions and industry-specific factors
        `;

            const res = await step.ai.wrap(
                "gemini",
                async (p) => {
                    const result = await model.generateContent(p);
                    if (!result || !result.response || !result.response.candidates || !result.response.candidates[0]) {
                        throw new Error('Invalid response from Gemini');
                    }
                    return result;
                },
                prompt
            );

            try {
                const text = res.response.candidates[0].content.parts[0].text;
                if (!text) {
                    throw new Error('Empty response from Gemini');
                }

                const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
                let insights;
                try {
                    insights = JSON.parse(cleanedText);
                } catch (e) {
                    console.error(`Failed to parse JSON for ${industry}:`, cleanedText);
                    throw new Error(`Invalid JSON response for ${industry}`);
                }

                // Validate required fields
                if (!insights.salaryrange || !insights.growthRate || !insights.demandLevel ||
                    !insights.topskills || !insights.marketOutlook || !insights.keyTrends ||
                    !insights.recommendedSkills) {
                    throw new Error(`Missing required fields in response for ${industry}`);
                }

                await step.run(`Update ${industry} insights`, async () => {
                    await db.IndustryInsights.update({
                        where: { industry },
                        data: {
                            ...insights,
                            lastUpdated: new Date(),
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        },
                    });
                });
            } catch (error) {
                console.error(`Error processing ${industry}:`, error);
                // You might want to add some error reporting here
                // Continue with the next industry instead of failing completely
                continue;
            }
        }
    }
);