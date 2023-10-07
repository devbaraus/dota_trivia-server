import { z } from "nestjs-zod/z";

import { UserZod } from "../../user/zod";

export const LoginAuthSchema = z.object({
  username: UserZod.username,
  password: UserZod.password,
});
