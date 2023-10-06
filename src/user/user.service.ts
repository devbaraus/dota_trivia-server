import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";
import * as argon from "argon2";

import { CreateUserDto, UpdateUserDto } from "@/user/dto";
import { User } from "@/user/entity";
import { UserRepository } from "@/user/user.repository";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private config: ConfigService,
  ) {}

  private removePasswordHash(user: User) {
    const { passwordHash, ...userWithoutPasswordHash } = user;
    return userWithoutPasswordHash;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await argon.hash(createUserDto.password, {
        secret: Buffer.from(this.config.get("APP_SECRET")),
      });

      delete createUserDto.password;

      const user = await this.userRepository.create({
        ...createUserDto,
        passwordHash: hash,
      });

      return this.removePasswordHash(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(error);
      }

      throw error;
    }
  }

  async findAll(skip?: number, take?: number, where?: unknown, order?: unknown) {
    const users = await this.userRepository.findAll(skip, take, where, order);

    return users.map(user => this.removePasswordHash(user));
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.removePasswordHash(user);
  }

  async update(id: number, entity: UpdateUserDto) {
    const user = await this.userRepository.update(id, entity);
    return this.removePasswordHash(user);
  }

  async remove(id: number): Promise<null> {
    return this.userRepository.remove(id);
  }
}
