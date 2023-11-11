import { EmojiHeroGame, MatchDifficulty } from "@prisma/client";
import { z } from "nestjs-zod/z";

type BaseZod = Omit<EmojiHeroGame, "id" | "createdAt" | "updatedAt" | "createdById" | "updatedById" | "gameId">;

export const EmojiHeroZod: Record<keyof BaseZod, any> = {
  difficulty: z.nativeEnum(MatchDifficulty),
  heroId: z.number().refine(value => value > 0, { message: "Hero is required" }),
  emojis: z.array(z.string()).refine(value => value.length > 0, { message: "Emojis are required" }),
  // gameId: z.number().refine(value => value > 0, { message: "Game is required" }),
};
