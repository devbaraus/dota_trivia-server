import { Match, MatchStatus } from "@prisma/client";
import { z } from "nestjs-zod/z";

type BaseZod = Omit<Match, "id" | "createdAt" | "updatedAt" | "score" | "createdById">;

export const MatchZod: Record<keyof BaseZod, any> = {
  emojiHeroGameId: z.number().positive(),
  quoteHeroGameId: z.number().positive(),
  // Admin fields
  userId: z.number().positive().optional(),
  attemptMax: z.number().positive().optional(),
  attemptPerTime: z.number().positive().optional(),
  attemptPerScore: z.number().positive().optional(),
  attemptTimeMax: z.number().positive().optional(),
  attemptPerScoreDecrement: z.number().positive().optional(),
  status: z.nativeEnum(MatchStatus).optional(),
};
