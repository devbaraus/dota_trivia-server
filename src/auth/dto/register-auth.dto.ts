import { createZodDto } from "nestjs-zod";

import { RegisterAuthSchema } from "../schema";

export class RegisterAuthDto extends createZodDto(RegisterAuthSchema) {}
