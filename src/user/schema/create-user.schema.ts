import { z } from "nestjs-zod/z";
import { UserZod } from "src/user/zod";

export const CreateUserSchema = z.object({
  email: UserZod.email,
  username: UserZod.username,
  password: UserZod.password,
  dateBirth: UserZod.dateBirth,
  avatar: UserZod.avatar,
  roles: UserZod.roles,
});
