import { createZodDto } from "nestjs-zod";

import { CreateUserSchema } from "@/user/schema/create-user.schema";

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
