import { INestApplication } from "@nestjs/common";

import { PrismaService } from "../src/prisma/prisma.service";

export const UserTest = (app: INestApplication, prisma: PrismaService, pactum: any) =>
  describe("User Controller (e2e)", () => {
    const usermock = {
      email: "mock@mock.com",
      password: "MOCKpassword1234#",
      username: "mockuser",
    };

    describe("GET /users", () => {
      it("Should throw if not authenticated", async () => {
        return pactum.spec().get("/users").expectStatus(401).toss();
      });
    });
  });
