import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Role } from "@prisma/client";

import { Roles } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { CreateHeroDto, UpdateHeroDto } from "./dto";
import { HeroService } from "./hero.service";

@UseGuards(JwtGuard)
@ApiTags("heroes")
@Controller("heroes")
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateHeroDto) {
    return this.heroService.create(dto);
  }

  @Get()
  findAll() {
    return this.heroService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.heroService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateHeroDto) {
    return this.heroService.update(+id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.heroService.remove(+id);
  }
}
