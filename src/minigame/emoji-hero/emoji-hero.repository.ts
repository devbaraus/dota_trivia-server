import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EmojiHeroRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.EmojiHeroGameCreateInput) {
    try {
      return await this.prismaService.emojiHeroGame.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Game already exists.");
        }
      }
      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: Prisma.EmojiHeroGameWhereInput, orderBy?: Prisma.EmojiHeroGameOrderByWithRelationInput) {
    return this.prismaService.emojiHeroGame.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number) {
    return this.prismaService.emojiHeroGame.findUnique({ where: { id } });
  }

  async pickRandom(count: number = 2) {
    const ids = (await this.prismaService.$queryRaw`SELECT id FROM "EmojiHeroGame" ORDER BY RANDOM() LIMIT ${count}`) as {
      id: number;
    }[];
    return this.prismaService.emojiHeroGame.findMany({
      where: {
        id: {
          in: ids.map(i => i.id),
        },
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.emojiHeroGame.delete({ where: { id } });
    return null;
  }

  async update(id: number, data: Prisma.EmojiHeroGameUpdateInput) {
    return this.prismaService.emojiHeroGame.update({
      where: { id },
      data,
    });
  }
}
