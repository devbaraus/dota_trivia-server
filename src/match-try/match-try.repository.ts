import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MatchTryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.MatchTryCreateInput) {
    try {
      return await this.prismaService.matchTry.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Game already exists.");
        }
      }
      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: Prisma.MatchTryWhereInput, orderBy?: Prisma.MatchTryOrderByWithRelationInput) {
    return this.prismaService.matchTry.findMany({
      skip,
      take,
      orderBy,
      where,
    });
  }

  async findOne(id: number) {
    return this.prismaService.matchTry.findUnique({ where: { id } });
  }

  async remove(id: number) {
    await this.prismaService.matchTry.delete({ where: { id } });
    return null;
  }

  async update(id: number, data: Prisma.MatchTryUpdateInput) {
    return this.prismaService.matchTry.update({
      where: { id },
      data,
    });
  }
}
