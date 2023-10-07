import { createZodDto } from "nestjs-zod";

import { LoginAuthSchema } from "../schema";

export class LoginAuthDto extends createZodDto(LoginAuthSchema) {}
