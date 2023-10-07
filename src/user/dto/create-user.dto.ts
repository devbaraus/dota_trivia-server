import { createZodDto } from "nestjs-zod";

import { CreateUserSchema } from "../schema/create-user.schema";

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
