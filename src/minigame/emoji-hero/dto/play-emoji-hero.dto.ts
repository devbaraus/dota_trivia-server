import { createZodDto } from "nestjs-zod";

import { PlayEmojiHeroSchema } from "../schema/play-emoji-hero.schema";

export class PlayEmojiHeroDto extends createZodDto(PlayEmojiHeroSchema) {}
