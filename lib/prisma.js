import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient, using globalThis for hot reloading in development
export const db = globalThis.Prisma || new PrismaClient();

// Check if the environment is not production
if (process.env.NODE_ENV !== "production") {
  // Assign the db instance to globalThis.Prisma to prevent multiple instances during hot reloads
  globalThis.Prisma = db;
}
