import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ZodValidationPipe } from "nestjs-zod";
import * as pactum from "pactum";

import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { AuthTest } from "./auth.test";
import { UserTest } from "./user.test";

describe("E2E Test", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ZodValidationPipe());

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.clearDatabase();

    pactum.request.setBaseUrl("http://localhost:3333");
  });

  afterAll(async () => {
    await app.close();
  });

  AuthTest(app, prisma, pactum);
  UserTest(app, prisma, pactum);
});
