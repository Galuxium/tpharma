// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Singleton PrismaClient instance
export const prisma = new PrismaClient();