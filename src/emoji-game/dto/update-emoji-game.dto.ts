import { PartialType } from "@nestjs/mapped-types";

import { CreateEmojiGameDto } from "./create-emoji-game.dto";

export class UpdateEmojiGameDto extends PartialType(CreateEmojiGameDto) {}
