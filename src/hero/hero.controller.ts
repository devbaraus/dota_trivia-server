import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { CreateHeroDto, UpdateHeroDto } from "./dto";
import { HeroService } from "./hero.service";

@Controller("hero")
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.heroService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroService.update(+id, updateHeroDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.heroService.remove(+id);
  }
}
