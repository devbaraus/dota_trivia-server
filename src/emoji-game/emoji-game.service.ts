import { Injectable } from "@nestjs/common";

import { CreateEmojiGameDto } from "./dto/create-emoji-game.dto";
import { UpdateEmojiGameDto } from "./dto/update-emoji-game.dto";

@Injectable()
export class EmojiGameService {
  create(createEmojiGameDto: CreateEmojiGameDto) {
    return "This action adds a new emojiGame";
  }

  findAll() {
    return `This action returns all emojiGame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emojiGame`;
  }

  update(id: number, updateEmojiGameDto: UpdateEmojiGameDto) {
    return `This action updates a #${id} emojiGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} emojiGame`;
  }
}
