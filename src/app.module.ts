import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CaslModule } from "./casl/casl.module";
import { PrismaModule } from "./prisma";
import { UserModule } from "./user";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    CaslModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
