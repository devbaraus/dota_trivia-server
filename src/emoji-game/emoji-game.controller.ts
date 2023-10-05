import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { CreateEmojiGameDto } from "./dto/create-emoji-game.dto";
import { UpdateEmojiGameDto } from "./dto/update-emoji-game.dto";
import { EmojiGameService } from "./emoji-game.service";

@Controller("emoji-game")
export class EmojiGameController {
  constructor(private readonly emojiGameService: EmojiGameService) {}

  @Post()
  create(@Body() createEmojiGameDto: CreateEmojiGameDto) {
    return this.emojiGameService.create(createEmojiGameDto);
  }

  @Get()
  findAll() {
    return this.emojiGameService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.emojiGameService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEmojiGameDto: UpdateEmojiGameDto) {
    return this.emojiGameService.update(+id, updateEmojiGameDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.emojiGameService.remove(+id);
  }
}
