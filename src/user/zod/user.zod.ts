import { z } from "nestjs-zod/z";

import { Role } from "@/auth/enum";

export const UserZod = {
  email: z.string().email(),
  username: z.string().min(8).max(32),
  password: z.password().min(8).max(32),
  dateBirth: z.dateString(),
  avatar: z.string(),
  roles: z.array(z.nativeEnum(Role)),
};
