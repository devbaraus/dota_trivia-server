import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { HeroAttackType, HeroAttr, HeroRole } from "@prisma/client";

import { CreateHeroDto } from "../src/hero/dto";
import { PrismaService } from "../src/prisma/prisma.service";

export const HeroesSpec = (app: INestApplication, prisma: PrismaService, pactum: any) =>
  describe("Hero Controller (e2e)", () => {
    const HeroFactory = (): CreateHeroDto => ({
      dotaId: faker.number.int({ min: 1, max: 1000 }),
      dotaName: faker.person.firstName(),
      name: faker.person.firstName(),
      avatar: faker.image.avatar(),
      roles: [faker.helpers.arrayElement(Array.from(Object.values(HeroRole)))],
      attackType: faker.helpers.arrayElement(Array.from(Object.values(HeroAttackType))),
      primaryAttr: faker.helpers.arrayElement(Array.from(Object.values(HeroAttr))),
    });

    const hero = HeroFactory();

    describe("GET /heroes", () => {
      it("Should throw if not authenticated", async () => {
        return pactum.spec().get("/heroes").expectStatus(401).toss();
      });

      describe("As ADMIN", () => {
        it("Should get heroes", async () => {
          return pactum
            .spec()
            .get("/heroes")
            .withHeaders({
              Authorization: "Bearer $S{accessAdmin}",
            })
            .expectStatus(200)
            .toss();
        });
      });

      describe("As PLAYER", () => {
        it("Should get heroes", async () => {
          return pactum
            .spec()
            .get("/heroes")
            .withHeaders({
              Authorization: "Bearer $S{accessPlayer}",
            })
            .expectStatus(200)
            .toss();
        });
      });

      describe("As GUEST", () => {
        it("Should get heroes", async () => {
          return pactum
            .spec()
            .get("/heroes")
            .withHeaders({
              Authorization: "Bearer $S{accessPlayer}",
            })
            .expectStatus(200)
            .toss();
        });
      });
    });

    describe("POST /heroes", () => {
      it("Should throw if not authenticated", async () => {
        return pactum.spec().post("/heroes").withJson(HeroFactory()).expectStatus(401).toss();
      });

      describe("As GUEST", () => {
        it("Should throw forbidden", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson(hero)
            .withHeaders({
              Authorization: "Bearer $S{accessGuest}",
            })
            .expectStatus(403)
            .toss();
        });
      });

      describe("As PLAYER", () => {
        it("Should throw forbidden", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson(hero)
            .withHeaders({
              Authorization: "Bearer $S{accessPlayer}",
            })
            .expectStatus(403)
            .toss();
        });
      });

      describe("As ADMIN", () => {
        it("Should throw if no name", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson({
              ...HeroFactory(),
              name: undefined,
            })
            .withHeaders({
              Authorization: "Bearer $S{accessAdmin}",
            })
            .expectStatus(400)
            .toss();
        });

        it("Should throw if no dotaId", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson({
              ...HeroFactory(),
              dotaId: undefined,
            })
            .withHeaders({
              Authorization: "Bearer $S{accessAdmin}",
            })
            .expectStatus(400)
            .toss();
        });

        it("Should throw if no dotaName", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson({
              ...HeroFactory(),
              dotaName: undefined,
            })
            .withHeaders({
              Authorization: "Bearer $S{accessAdmin}",
            })
            .expectStatus(400)
            .toss();
        });

        it("Should throw if no primaryAttr", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson({
              ...HeroFactory(),
              primaryAttr: undefined,
            })
            .withHeaders({
              Authorization: "Bearer $S{accessAdmin}",
            })
            .expectStatus(400)
            .toss();
        });

        it("Should throw if no attackType", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson({
              ...HeroFactory(),
              attackType: undefined,
            })
            .withHeaders({
              Authorization: "Bearer $S{accessAdmin}",
            })
            .expectStatus(400)
            .toss();
        });

        it("Should throw if no roles", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson({
              ...HeroFactory(),
              roles: undefined,
            })
            .withHeaders({
              Authorization: "Bearer $S{accessAdmin}",
            })
            .expectStatus(400)
            .toss();
        });

        it("Should throw if no avatar", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson({
              ...HeroFactory(),
              avatar: undefined,
            })
            .withHeaders({
              Authorization: "Bearer $S{accessAdmin}",
            })
            .expectStatus(400)
            .toss();
        });

        it("Should create", async () => {
          return pactum
            .spec()
            .post("/heroes")
            .withJson(hero)
            .withHeaders({
              Authorization: "Bearer $S{accessPlayer}",
            })
            .expectStatus(403)
            .toss();
        });
      });
    });

    describe("GET /heroes/:id", () => {
      let heroId: number;

      it("Should throw if not authenticated", async () => {
        heroId = (await prisma.hero.findFirst()).id;

        return pactum.spec().get(`/heroes/${heroId}`).expectStatus(401).toss();
      });

      describe("As GUEST", () => {
        it("Should get hero", async () => {
          return pactum
            .spec()
            .get(`/heroes/${heroId}`)
            .withHeaders({
              Authorization: "Bearer $S{accessGuest}",
            })
            .expectStatus(200)
            .toss();
        });
      });

      describe("As PLAYER", () => {
        it("Should get hero", async () => {
          return pactum
            .spec()
            .get(`/heroes/${heroId}`)
            .withHeaders({
              Authorization: "Bearer $S{accessPlayer}",
            })
            .expectStatus(200)
            .toss();
        });
      });

      describe("As ADMIN", () => {
        it("Should get hero", async () => {
          return pactum
            .spec()
            .get(`/heroes/${heroId}`)
            .withHeaders({
              Authorization: "Bearer $S{accessAdmin}",
            })
            .expectStatus(200)
            .toss();
        });
      });
    });
  });
