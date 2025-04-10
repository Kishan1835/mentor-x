"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAIInsights = async (industry) => {
    console.log('Generating insights for industry:', industry);
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

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const parsedInsights = JSON.parse(cleanedText);

    console.log('Generated insights:', parsedInsights);
    return parsedInsights;
};

export async function getIndustryInsights() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserid: userId },
        include: {
            industryInsight: true,
        },
    });

    if (!user) throw new Error("User not found");
    if (!user.industry) throw new Error("Please select an industry first");

    // Check if insights need to be updated (older than 24 hours or don't exist)
    const needsUpdate = !user.industryInsight ||
        (user.industryInsight.nextUpdate && new Date() > new Date(user.industryInsight.nextUpdate));

    if (needsUpdate) {
        console.log('Generating new insights due to update needed');
        const insights = await generateAIInsights(user.industry);

        const industryInsight = await db.industryInsights.upsert({
            where: {
                industry: user.industry
            },
            update: {
                salaryrange: insights.salaryrange,
                growthRate: insights.growthRate,
                demandLevel: insights.demandLevel.toUpperCase(),
                topskills: insights.topskills,
                marketOutlook: insights.marketOutlook,
                keyTrends: insights.keyTrends,
                recommendedSkills: insights.recommendedSkills,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Update every 24 hours
            },
            create: {
                industry: user.industry,
                salaryrange: insights.salaryrange,
                growthRate: insights.growthRate,
                demandLevel: insights.demandLevel.toUpperCase(),
                topskills: insights.topskills,
                marketOutlook: insights.marketOutlook,
                keyTrends: insights.keyTrends,
                recommendedSkills: insights.recommendedSkills,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),            },
        });

        return industryInsight;
    }

    return user.industryInsight;
}