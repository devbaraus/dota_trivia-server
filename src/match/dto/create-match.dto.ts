import { createZodDto } from "nestjs-zod";

import { MatchSchema } from "../schema";

export class CreateMatchDto extends createZodDto(MatchSchema) {}
