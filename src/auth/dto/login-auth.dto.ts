import { createZodDto } from "nestjs-zod";

import { LoginAuthSchema } from "@/auth/schema";

export class LoginAuthDto extends createZodDto(LoginAuthSchema) {}
