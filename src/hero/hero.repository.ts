import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HeroRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.HeroCreateInput) {
    try {
      return await this.prismaService.hero.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Hero already exists.");
        }
      }
      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: Prisma.HeroWhereInput, orderBy?: Prisma.HeroOrderByWithRelationInput) {
    return this.prismaService.hero.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: number) {
    return this.prismaService.hero.findUnique({ where: { id } });
  }

  async remove(id: number) {
    await this.prismaService.hero.delete({ where: { id } });
    return null;
  }

  async update(id: number, data: Prisma.HeroUpdateInput) {
    return this.prismaService.hero.update({
      where: { id },
      data,
    });
  }
}
