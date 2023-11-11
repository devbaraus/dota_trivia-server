import { Module } from "@nestjs/common";

import { GameModule } from "../../game/game.module";
import { GameRepository } from "../../game/game.repository";
import { GameService } from "../../game/game.service";
import { MatchTryModule } from "../../match-try/match-try.module";
import { MatchTryRepository } from "../../match-try/match-try.repository";
import { MatchTryService } from "../../match-try/match-try.service";
import { MatchModule } from "../../match/match.module";
import { MatchRepository } from "../../match/match.repository";
import { MatchService } from "../../match/match.service";
import { EmojiHeroController } from "./emoji-hero.controller";
import { EmojiHeroRepository } from "./emoji-hero.repository";
import { EmojiHeroService } from "./emoji-hero.service";

@Module({
  imports: [MatchModule, MatchTryModule, GameModule],
  controllers: [EmojiHeroController],
  providers: [EmojiHeroService, EmojiHeroRepository, MatchService, MatchRepository, MatchTryService, MatchTryRepository, GameService, GameRepository],
})
export class EmojiHeroModule {}
