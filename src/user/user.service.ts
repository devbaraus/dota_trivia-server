import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";
import * as argon from "argon2";

import { RegisterAuthType } from "../auth/type";
import { UpdateUserDto } from "./dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly config: ConfigService,
  ) {}

  async create(dto: RegisterAuthType) {
    try {
      const hash = await argon.hash(dto.password, {
        secret: Buffer.from(this.config.get("APP_SECRET")),
      });

      delete dto.password;

      const data = {
        ...dto,
        passwordHash: hash,
      };

      return await this.userRepository.create(data as Prisma.UserCreateInput);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(error);
      }

      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: unknown, order?: unknown) {
    return this.userRepository.findAll(skip, take, where, order);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.userRepository.update(id, dto);
  }

  async remove(id: number): Promise<null> {
    return this.userRepository.remove(id);
  }
}
