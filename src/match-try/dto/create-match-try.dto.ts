import { createZodDto } from "nestjs-zod";

import { MatchTrySchema } from "../schema";

export class CreateMatchTryDto extends createZodDto(MatchTrySchema) {}
