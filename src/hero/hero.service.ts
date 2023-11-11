import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { CreateHeroDto, UpdateHeroDto } from "./dto";
import { HeroRepository } from "./hero.repository";

@Injectable()
export class HeroService {
  constructor(private readonly heroRepository: HeroRepository) {}

  async create(dto: CreateHeroDto) {
    try {
      return await this.heroRepository.create(dto as Prisma.HeroCreateInput);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(error);
      }

      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: unknown, order?: unknown) {
    return this.heroRepository.findAll(skip, take, where, order);
  }

  async findOne(id: number) {
    const user = await this.heroRepository.findOne(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update(id: number, dto: UpdateHeroDto) {
    return this.heroRepository.update(id, dto);
  }

  async remove(id: number) {
    return this.heroRepository.remove(id);
  }
}
