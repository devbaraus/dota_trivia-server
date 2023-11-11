import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";

import { PrismaService } from "../src/prisma/prisma.service";

export const AuthSpec = (app: INestApplication, prisma: PrismaService, pactum: any) =>
  describe("Auth Controller (e2e)", () => {
    const UserRegisterFactory = () => ({
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 10,
      }),
      username: faker.internet.userName(),
      birthDate: faker.date
        .past({
          years: 18,
        })
        .toISOString()
        .slice(0, 10),
      avatar: faker.image.avatar(),
    });

    const mockCreateUser = UserRegisterFactory();
    const mockLoginUser = { username: mockCreateUser.username, password: mockCreateUser.password };

    describe("POST /auth/register", () => {
      it("Should throw if no email", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserRegisterFactory(),
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
            ...UserRegisterFactory(),
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
            ...UserRegisterFactory(),
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
            ...UserRegisterFactory(),
            birthDate: faker.date.past().toISOString(),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if future date of birth", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserRegisterFactory(),
            birthDate: faker.date.future().toISOString().slice(0, 10),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if wrong email format", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserRegisterFactory(),
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
            ...UserRegisterFactory(),
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
            ...UserRegisterFactory(),
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
            ...UserRegisterFactory(),
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
            ...UserRegisterFactory(),
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
            ...UserRegisterFactory(),
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
            ...UserRegisterFactory(),
            birthDate: undefined,
          })
          .expectStatus(201)
          .toss();
      });

      it("Should register if no avatar", async () => {
        return pactum
          .spec()
          .post("/auth/register")
          .withJson({
            ...UserRegisterFactory(),
            avatar: undefined,
          })
          .expectStatus(201)
          .toss();
      });

      it("Should register with email, password and username", async () => {
        const user = UserRegisterFactory();

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
          .withJson({ ...UserRegisterFactory(), blabla: true })
          .expectStatus(201)
          .toss();
      });

      it("Should register if complete", async () => {
        return pactum.spec().post("/auth/register").withJson(mockCreateUser).expectStatus(201).toss();
      });
    });

    describe("POST /auth/login", () => {
      it("Should throw if no username", async () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withJson({
            ...mockLoginUser,
            username: undefined,
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if no password", async () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withJson({
            ...mockLoginUser,
            password: undefined,
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if long username", async () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withJson({
            ...mockLoginUser,
            username: faker.lorem.paragraph(100),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if short username", async () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withJson({
            ...mockLoginUser,
            username: "ab",
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if long password", async () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withJson({
            ...mockLoginUser,
            password: faker.lorem.paragraph(100),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should throw if wrong username", async () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withJson({
            ...mockLoginUser,
            username: faker.internet.userName(),
          })
          .expectStatus(401)
          .toss();
      });

      it("Should throw if wrong password", async () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withJson({
            ...mockLoginUser,
            password: faker.internet.password({
              length: 10,
            }),
          })
          .expectStatus(401)
          .toss();
      });

      it("Should throw if short password", async () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withJson({
            ...mockLoginUser,
            password: faker.internet.password({
              length: 3,
            }),
          })
          .expectStatus(400)
          .toss();
      });

      it("Should login if extra field", async () => {
        return pactum
          .spec()
          .post("/auth/login")
          .withJson({ ...mockLoginUser, blabla: true })
          .expectStatus(200)
          .toss();
      });

      it("Should login if complete", async () => {
        return pactum.spec().post("/auth/login").withJson(mockLoginUser).expectStatus(200).toss();
      });
    });
  });
