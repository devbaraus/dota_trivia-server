import { Game, GameStatus, GameType } from "@prisma/client";
import { z } from "nestjs-zod/z";

type BaseZod = Omit<Game, "id" | "createdAt" | "updatedAt" | "createdById" | "updatedById">;

export const GameZod: Record<keyof BaseZod, any> = {
  name: z.string(),
  description: z.string(),
  type: z.nativeEnum(GameType),
  status: z.nativeEnum(GameStatus),
};
