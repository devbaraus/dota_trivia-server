import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Prisma, Role, User } from "@prisma/client";
import { Request } from "express";

import { CreateMatchTryDto } from "../match-try/dto";
import { MatchTryService } from "../match-try/match-try.service";
import { CreateMatchDto, UpdateMatchDto } from "./dto";
import { MatchRepository } from "./match.repository";

@Injectable()
export class MatchService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly repository: MatchRepository,
    private readonly matchTryService: MatchTryService,
  ) {}

  calculateScore(maxScore: number, scoreDecrement: number, tries: number) {
    // 100
    return Math.max(maxScore - scoreDecrement * Math.max(tries, 0), 0);
  }

  async createEmojiHeroGameTry(id: number, dto: CreateMatchTryDto) {
    const user = this.request.get("user") as unknown as User;
    const match = await this.repository.findOneWithEmojiHeroGame(id);

    if (!user.roles.includes(Role.ADMIN) && match.userId !== user.id) {
      throw new ForbiddenException();
    }

    const tries = await this.matchTryService.findAll(0, 0, { matchId: match.id });

    const game = match.emojiHeroGame;

    const attemptScore = this.calculateScore(match.attemptPerScore, match.attemptPerScoreDecrement, tries.length);

    const isCorrect = dto.heroId === game.heroId;

    return await this.matchTryService.create({
      heroId: dto.heroId,
      matchId: dto.matchId,
      score: isCorrect ? attemptScore : 0,
    });
  }

  async create(dto: CreateMatchDto) {
    try {
      const user = this.request.get("user") as unknown as User;

      const data = {
        ...dto,
        emojiHeroGameId: undefined,
        emojiHeroGame: {
          connect: {
            id: dto.emojiHeroGameId,
          },
        },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      } as Prisma.MatchCreateInput;

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
    const match = await this.repository.findOne(id);

    if (!match) {
      throw new NotFoundException("Match not found");
    }

    return match;
  }

  async findOneWithEmojiHeroGame(id: number) {
    return this.repository.findOneWithEmojiHeroGame(id);
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
