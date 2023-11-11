import { Module } from "@nestjs/common";

import { MatchTryRepository } from "./match-try.repository";
import { MatchTryService } from "./match-try.service";

@Module({
  providers: [MatchTryService, MatchTryRepository],
})
export class MatchTryModule {}
