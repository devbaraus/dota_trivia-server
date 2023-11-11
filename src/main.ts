import { NestFactory } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as morgan from "morgan";
import { patchNestJsSwagger, ZodValidationPipe } from "nestjs-zod";

import { AppModule } from "./app.module";
import { InjectUserInterceptor } from "./injector/user.injector";
import { PrismaService } from "./prisma/prisma.service";

patchNestJsSwagger();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle("Dota Trivia").setDescription("The Dota Trivia API description").setVersion("0.1").addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("", app, document, {
    jsonDocumentUrl: "/api-json",
  });

  app.enableCors();
  app.use(morgan("tiny"));

  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalInterceptors(
    new InjectUserInterceptor(
      new JwtService({
        secret: process.env.JWT_SECRET,
      }),
      new PrismaService(),
    ),
  );

  await app.listen(PORT);
  console.log(`Listening on port http://localhost:${PORT}`);
  console.log(`Listening on port http://127.0.0.1:${PORT}`);
}

bootstrap();
