import { gemini, Inngest } from "inngest";

export const inngest = new Inngest({
    id: "mentorX",
    name: "MentorX",
    credentials: {
        gemini: {
            apiKey: process.env.GEMINI_API_KEY
        }
    }
});