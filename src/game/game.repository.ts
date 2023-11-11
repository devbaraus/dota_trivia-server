import { ConflictException, Injectable } from "@nestjs/common";
import { GameType, Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GameRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.GameCreateInput) {
    try {
      return await this.prismaService.game.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Game already exists.");
        }
      }
      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: Prisma.GameWhereInput, orderBy?: Prisma.GameOrderByWithRelationInput) {
    return this.prismaService.game.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number) {
    return this.prismaService.game.findUnique({ where: { id } });
  }

  async findByType(type: GameType) {
    return this.prismaService.game.findUnique({ where: { type } });
  }

  async remove(id: number) {
    await this.prismaService.game.delete({ where: { id } });
    return null;
  }

  async update(id: number, data: Prisma.GameUpdateInput) {
    return this.prismaService.game.update({
      where: { id },
      data,
    });
  }
}
