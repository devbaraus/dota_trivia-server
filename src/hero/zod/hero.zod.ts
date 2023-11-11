import { Hero, HeroAttackType, HeroAttr, HeroRole } from "@prisma/client";
import { z } from "nestjs-zod/z";

type BaseZod = Omit<Hero, "id" | "createdAt" | "updatedAt">;

export const HeroZod: Record<keyof BaseZod, any> = {
  name: z.string(),
  dotaId: z.number(),
  dotaName: z.string(),
  primaryAttr: z.nativeEnum(HeroAttr),
  attackType: z.nativeEnum(HeroAttackType),
  roles: z.array(z.nativeEnum(HeroRole)),
  avatar: z.string().url(),
};
