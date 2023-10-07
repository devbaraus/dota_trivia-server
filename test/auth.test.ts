import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";

import { PrismaService } from "../src/prisma/prisma.service";

export const AuthTest = (app: INestApplication, prisma: PrismaService, pactum: any) =>
  describe("Auth Controller (e2e)", () => {
    const UserFactory = () => ({
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 10,
      }),
      username: faker.internet.userName(),
      dateBirth: faker.date
        .past({
          years: 18,
        })
        .toISOString()
        .slice(0, 10),
      avatar: faker.image.avatar(),
    });

    const usermock = UserFactory();

    describe("POST /auth/register", () => {
      it("Should throw if no email", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            email: undefined,
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if no username", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            username: undefined,
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if no password", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            password: undefined,
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if wrong date of birth format", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            dateBirth: faker.date.past().toISOString(),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if future date of birth", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            dateBirth: faker.date.future().toISOString().slice(0, 10),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if wrong email format", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            email: faker.person.fullName(),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if long username", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            username: faker.lorem.paragraph(100),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if short username", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            username: "ab",
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if long password", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            password: faker.lorem.paragraph(100),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if short password", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            password: faker.internet.password({
              length: 3,
            }),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if wrong avatar format", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            avatar: faker.person.fullName(),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should register if no date of birth", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            dateBirth: undefined,
          })
          .expectStatus(201)
          .toss();
      });

      it("Should register if no avatar", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserFactory(),
            avatar: undefined,
          })
          .expectStatus(201)
          .toss();
      });

      it("Should register with email, password and username", async () => {
        const user = UserFactory();

        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            email: user.email,
            username: user.username,
            password: user.password,
          })
          .expectStatus(201)
          .toss();
      });

      it("Should register if extra field", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({ ...UserFactory(), blabla: true })
          .expectStatus(201)
          .toss();
      });

      it("Should register if complete", async () => {
        return pactum.spec().post("/auth/register").withJson(UserFactory()).expectStatus(201).toss();
      });
    });
  });
