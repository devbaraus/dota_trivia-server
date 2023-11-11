import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MatchRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.MatchCreateInput) {
    try {
      return await this.prismaService.match.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Game already exists.");
        }
      }
      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: Prisma.MatchWhereInput, orderBy?: Prisma.MatchOrderByWithRelationInput) {
    return this.prismaService.match.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number) {
    return this.prismaService.match.findUnique({ where: { id } });
  }

  async findOneWithEmojiHeroGame(id: number) {
    return this.prismaService.match.findUnique({ where: { id }, include: { emojiHeroGame: true } });
  }

  async remove(id: number) {
    await this.prismaService.match.delete({ where: { id } });
    return null;
  }

  async update(id: number, data: Prisma.MatchUpdateInput) {
    return this.prismaService.match.update({
      where: { id },
      data,
    });
  }
}
