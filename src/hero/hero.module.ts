import { Module } from "@nestjs/common";

import { HeroController } from "./hero.controller";
import { HeroRepository } from "./hero.repository";
import { HeroService } from "./hero.service";

@Module({
  controllers: [HeroController],
  providers: [HeroService, HeroRepository],
})
export class HeroModule {}
