import { PartialType } from "@nestjs/mapped-types";

import { CreateEmojiHeroDto } from "./create-emoji-hero.dto";

export class UpdateEmojiHeroDto extends PartialType(CreateEmojiHeroDto) {}
