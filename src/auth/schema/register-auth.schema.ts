import { z } from "nestjs-zod/z";

import { UserZod } from "../../user/zod";

export const RegisterAuthSchema = z.object({
  email: UserZod.email,
  username: UserZod.username,
  password: UserZod.password,
  birthDate: UserZod.birthDate.optional(),
  avatar: UserZod.avatar.optional(),
});
