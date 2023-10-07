import { Role } from "@prisma/client";
import { parse } from "date-fns";
import { z } from "nestjs-zod/z";

export const UserZod = {
  email: z.string().email(),
  username: z.string().min(3).max(32),
  password: z.password().min(8).max(32),
  dateBirth: z
    .dateString()
    .format("date")
    .refine(date => parse(date, "yyyy-MM-dd", new Date()) < new Date())
    .transform(date => parse(date, "yyyy-MM-dd", new Date())),
  avatar: z.string().url(),
  roles: z.array(z.nativeEnum(Role)),
};
