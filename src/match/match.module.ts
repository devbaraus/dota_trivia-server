import { Module } from "@nestjs/common";

import { MatchTryModule } from "../match-try/match-try.module";
import { MatchTryRepository } from "../match-try/match-try.repository";
import { MatchTryService } from "../match-try/match-try.service";
import { MatchController } from "./match.controller";
import { MatchRepository } from "./match.repository";
import { MatchService } from "./match.service";

@Module({
  imports: [MatchTryModule],
  controllers: [MatchController],
  providers: [MatchService, MatchRepository, MatchTryService, MatchTryRepository],
})
export class MatchModule {}
