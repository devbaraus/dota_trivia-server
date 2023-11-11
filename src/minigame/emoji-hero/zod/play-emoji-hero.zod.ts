import { EmojiHeroGame, MatchDifficulty } from "@prisma/client";
import { z } from "nestjs-zod/z";

type BaseZod = Pick<EmojiHeroGame, "difficulty">;

export const PlayEmojiHeroZod: Record<keyof BaseZod, any> = {
  difficulty: z.nativeEnum(MatchDifficulty),
};
