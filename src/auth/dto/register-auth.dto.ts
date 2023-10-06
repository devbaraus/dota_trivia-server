import { createZodDto } from "nestjs-zod";

import { RegisterAuthSchema } from "@/auth/schema/register-auth.schema";

export class RegisterAuthDto extends createZodDto(RegisterAuthSchema) {}
