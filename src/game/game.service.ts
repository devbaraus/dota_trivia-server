import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { GameType, Prisma, User } from "@prisma/client";
import { Request } from "express";

import { CreateGameDto, UpdateGameDto } from "./dto";
import { GameRepository } from "./game.repository";

@Injectable({ scope: Scope.REQUEST })
export class GameService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly repository: GameRepository,
  ) {}

  async create(dto: CreateGameDto) {
    try {
      const user = this.request.get("user") as unknown as User;

      const data = {
        ...dto,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      } as Prisma.GameCreateInput;

      return await this.repository.create(data);
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

  async findByType(type: GameType) {
    return this.repository.findByType(type);
  }

  async update(id: number, dto: UpdateGameDto) {
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
