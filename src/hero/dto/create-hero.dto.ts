import { createZodDto } from "nestjs-zod";

import { HeroSchema } from "../schema";

export class CreateHeroDto extends createZodDto(HeroSchema) {}
