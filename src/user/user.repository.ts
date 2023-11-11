import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private omitPasswordHash(user: User) {
    const { passwordHash, ...userWithoutPasswordHash } = user;
    return userWithoutPasswordHash;
  }

  async create(data: Prisma.UserCreateInput) {
    try {
      const user = await this.prismaService.user.create({ data });
      return this.omitPasswordHash(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Credentials already exists.");
        }
      }
      throw error; // Re-throw other unexpected errors
    }
  }

  async findAll(skip?: number, take?: number, where?: Prisma.UserWhereInput, orderBy?: Prisma.UserOrderByWithRelationInput) {
    const users = await this.prismaService.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });

    return users.map(user => this.omitPasswordHash(user));
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return this.omitPasswordHash(user);
  }

  async findByUsername(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    return this.omitPasswordHash(user);
  }

  async remove(id: number) {
    await this.prismaService.user.delete({ where: { id } });
    return null;
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.prismaService.user.update({
      where: { id },
      data,
    });

    return this.omitPasswordHash(user);
  }
}
