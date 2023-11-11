import { createZodDto } from "nestjs-zod";

import { EmojiHeroSchema } from "../schema";

export class CreateEmojiHeroDto extends createZodDto(EmojiHeroSchema) {}
