import { createZodDto } from "nestjs-zod";

import { GameSchema } from "../schema";

export class CreateGameDto extends createZodDto(GameSchema) {}
