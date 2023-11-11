import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { GameType, Match, MatchDifficulty, Prisma, User } from "@prisma/client";
import { Request } from "express";

import { GameService } from "../../game/game.service";
import { MatchService } from "../../match/match.service";
import { CreateEmojiHeroDto, UpdateEmojiHeroDto } from "./dto";
import { EmojiHeroRepository } from "./emoji-hero.repository";

type GameDifficultyParams = Pick<Match, "attemptTimeMax" | "attemptMax" | "attemptPerTime" | "attemptPerScore" | "attemptPerScoreDecrement">;

type EmojiHeroDifficulty = Record<MatchDifficulty, GameDifficultyParams>;

@Injectable()
export class EmojiHeroService {
  private readonly difficulty: EmojiHeroDifficulty = {
    EASY: {
      attemptTimeMax: 300,
      attemptMax: 5,
      attemptPerTime: 300 / 5,
      attemptPerScore: 100,
      attemptPerScoreDecrement: 100 / 5,
    },
    MEDIUM: {
      attemptTimeMax: 180,
      attemptMax: 4,
      attemptPerTime: 180 / 4,
      attemptPerScore: 100,
      attemptPerScoreDecrement: 100 / 4,
    },
    HARD: {
      attemptTimeMax: 60,
      attemptMax: 3,
      attemptPerTime: 60 / 3,
      attemptPerScore: 100,
      attemptPerScoreDecrement: 100 / 3,
    },
  };

  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly repository: EmojiHeroRepository,
    private readonly matchService: MatchService,
    private readonly gameService: GameService,
  ) {}

  async createMatch(id: number, difficulty: MatchDifficulty) {
    const difficultyParams = this.difficulty[difficulty];

    const match = await this.matchService.create({
      ...difficultyParams,
      emojiHeroGameId: id,
    });

    return match;
  }

  async createRandomMatch() {
    const [emojiGame] = await this.repository.pickRandom();

    const difficultyParams = this.difficulty[emojiGame.difficulty];

    const match = await this.matchService.create({
      ...difficultyParams,
      emojiHeroGameId: emojiGame.id,
    });

    return match;
  }

  async create(dto: CreateEmojiHeroDto) {
    try {
      const user = this.request.get("user") as unknown as User;
      const game = await this.gameService.findByType(GameType.EMOJI_HERO);

      const data = {
        emojis: {
          set: dto.emojis,
        },
        hero: {
          connect: {
            id: dto.heroId,
          },
        },
        game: {
          connect: {
            id: game.id,
          },
        },
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      } as Prisma.EmojiHeroGameCreateInput;

      const minigame = await this.repository.create(data);
      return {
        ...minigame,
        heroId: undefined,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(error);
      }

      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: unknown, order?: unknown) {
    const games = await this.repository.findAll(skip, take, where, order);
    return games.map(game => ({
      ...game,
      heroId: undefined,
    }));
  }

  async findOne(id: number) {
    const game = await this.repository.findOne(id);

    if (!game) {
      throw new NotFoundException("User not found");
    }

    return {
      ...game,
      heroId: undefined,
    };
  }

  async update(id: number, dto: UpdateEmojiHeroDto) {
    const user = this.request.get("user") as unknown as User;

    const data = {
      ...dto,
      updatedBy: {
        connect: {
          id: user.id,
        },
      },
    };

    const game = await this.repository.update(id, data);

    return {
      ...game,
      heroId: undefined,
    };
  }

  async remove(id: number) {
    return this.repository.remove(id);
  }
}
