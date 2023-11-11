import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { CaslModule } from "./casl/casl.module";
import { GameModule } from "./game/game.module";
import { HeroModule } from "./hero/hero.module";
import { MatchTryModule } from "./match-try/match-try.module";
import { MatchModule } from "./match/match.module";
import { EmojiHeroModule } from "./minigame/emoji-hero/emoji-hero.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    CaslModule,
    UserModule,
    HeroModule,
    GameModule,
    EmojiHeroModule,
    MatchModule,
    MatchTryModule,
  ],
})
export class AppModule {}
