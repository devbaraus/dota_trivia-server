import { MatchTry } from "@prisma/client";
import { z } from "nestjs-zod/z";

type BaseZod = Omit<MatchTry, "id" | "createdAt">;

export const MatchTryZod: Record<keyof BaseZod, any> = {
  heroId: z.number().positive(),
  matchId: z.number().positive(),
  score: z.number().positive(),
};
