import { z } from "nestjs-zod/z";

import { UserZod } from "../zod";

export const CreateUserSchema = z.object({
  email: UserZod.email,
  username: UserZod.username,
  password: UserZod.password,
  birthDate: UserZod.birthDate,
  avatar: UserZod.avatar,
  roles: UserZod.roles,
});
