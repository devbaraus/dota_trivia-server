import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { JwtGuard } from "../../auth/guard";
import { CreateEmojiHeroDto, UpdateEmojiHeroDto } from "./dto";
import { EmojiHeroService } from "./emoji-hero.service";

@UseGuards(JwtGuard)
@ApiTags("emoji-hero-games")
@Controller("emoji-hero-games")
export class EmojiHeroController {
  constructor(private readonly emojiHeroGameService: EmojiHeroService) {}

  @Post("match")
  createMatch() {
    return this.emojiHeroGameService.createRandomMatch();
  }

  @Post()
  create(@Body() dto: CreateEmojiHeroDto) {
    return this.emojiHeroGameService.create(dto);
  }

  @Get()
  findAll() {
    return this.emojiHeroGameService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.emojiHeroGameService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateEmojiHeroDto) {
    return this.emojiHeroGameService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.emojiHeroGameService.remove(+id);
  }
}
