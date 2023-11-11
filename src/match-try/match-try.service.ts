import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Prisma, User } from "@prisma/client";
import { Request } from "express";

import { CreateMatchTryDto, UpdateMatchDto } from "./dto";
import { MatchTryRepository } from "./match-try.repository";

@Injectable()
export class MatchTryService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly repository: MatchTryRepository,
  ) {}

  async create(dto: CreateMatchTryDto) {
    try {
      return await this.repository.create({
        hero: {
          connect: {
            id: dto.heroId,
          },
        },
        match: {
          connect: {
            id: dto.matchId,
          },
        },
        score: dto.score,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(error);
      }

      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: unknown, order?: unknown) {
    return this.repository.findAll(skip, take, where, order);
  }

  async findOne(id: number) {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update(id: number, dto: UpdateMatchDto) {
    const user = this.request.get("user") as unknown as User;

    const data = {
      ...dto,
      updatedBy: {
        connect: {
          id: user.id,
        },
      },
    };

    return this.repository.update(id, data);
  }

  async remove(id: number) {
    return this.repository.remove(id);
  }
}
