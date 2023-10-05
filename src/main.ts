import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as morgan from "morgan";

import { AppModule } from "./app.module";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Dota Trivia")
    .setDescription("The Dota Trivia API description")
    .setVersion("0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.use(morgan("tiny"));

  await app.listen(PORT);
  console.log(`Listening on port http://localhost:${PORT}`);
  console.log(`Listening on port http://127.0.0.1:${PORT}`);
}

bootstrap();
