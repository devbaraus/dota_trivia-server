import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { JwtGuard } from "../auth/guard";
import { CreateMatchTryDto } from "../match-try/dto";
import { MatchService } from "./match.service";

@UseGuards(JwtGuard)
@ApiTags("matches")
@Controller("matches")
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post(":id/try")
  async try(@Param("id") id: string, @Body() dto: CreateMatchTryDto) {
    const match = await this.matchService.findOne(+id);

    if (!match) {
      throw new NotFoundException("Game not found");
    }

    if (match.emojiHeroGameId !== null) {
      return this.matchService.createEmojiHeroGameTry(+id, dto);
    }

    throw new NotFoundException("Game not found");
  }

  @Get(":id/emoji-hero")
  async findEmojiHero(@Param("id") id: string) {
    return this.matchService.findOneWithEmojiHeroGame(+id);
  }

  // @Post()
  // create(@Body() dto: CreateMatchDto) {
  //   return this.emojiHeroGameService.create(dto);
  // }
  //
  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  //
  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.emojiHeroGameService.findOne(+id);
  // }
  //
  // @Patch(":id")
  // update(@Param("id") id: string, @Body() dto: UpdateMatchDto) {
  //   return this.emojiHeroGameService.update(+id, dto);
  // }
  //
  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.emojiHeroGameService.remove(+id);
  // }
}
