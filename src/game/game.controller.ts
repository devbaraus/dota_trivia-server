import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { JwtGuard } from "../auth/guard";
import { CreateGameDto, UpdateGameDto } from "./dto";
import { GameService } from "./game.service";

@UseGuards(JwtGuard)
@ApiTags("games")
@Controller("games")
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() dto: CreateGameDto) {
    return this.gameService.create(dto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateGameDto) {
    return this.gameService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.gameService.remove(+id);
  }
}
