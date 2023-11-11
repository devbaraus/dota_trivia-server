import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Role } from "@prisma/client";
import { ZodValidationPipe } from "nestjs-zod";
import * as pactum from "pactum";

import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { AuthSpec } from "./auth.spec";
import { HeroesSpec } from "./heroes.spec";
import { UserSpec } from "./user.spec";

describe("E2E Test", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const users = {
    admin: {
      username: process.env.APP_ADMIN_USERNAME,
      email: process.env.APP_ADMIN_EMAIL,
      password: process.env.APP_ADMIN_PASSWORD,
    },
    player: {
      username: process.env.APP_PLAYER_USERNAME,
      email: process.env.APP_PLAYER_EMAIL,
      password: process.env.APP_PLAYER_PASSWORD,
    },
    guest: {
      username: process.env.APP_GUEST_USERNAME,
      email: process.env.APP_GUEST_EMAIL,
      password: process.env.APP_GUEST_PASSWORD,
    },
  };

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

  it("Should login as admin", async () => {
    return pactum.spec().post("/auth/login").withJson(users.admin).expectStatus(200).stores("accessAdmin", "accessToken").toss();
  });

  it("Should login as player", async () => {
    return pactum.spec().post("/auth/login").withJson(users.player).expectStatus(200).stores("accessPlayer", "accessToken").toss();
  });

  it("Should login as guest", async () => {
    return pactum.spec().post("/auth/login").withJson(users.guest).expectStatus(200).stores("accessGuest", "accessToken").toss();
  });

  // AuthSpec(app, prisma, pactum);
  HeroesSpec(app, prisma, pactum);
  // UserSpec(app, prisma, pactum);
});
