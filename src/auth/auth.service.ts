import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";

import { User } from "@/user/entity";
import { UserRepository } from "@/user/user.repository";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new ForbiddenException("Invalid credentials");
    }

    const valid = await argon.verify(user.passwordHash, password);

    if (valid) {
      throw new UnauthorizedException();
    }

    return this.signToken(user);
  }

  async signToken(user: User) {
    const token = this.jwt.sign(
      {
        sub: user.id,
        username: user.username,
        email: user.email,
      },
      {
        secret: this.config.get("JWT_SECRET"),
        expiresIn: this.config.get("JWT_EXPIRES_IN"),
      },
    );

    const { passwordHash, createdAt, updatedAt, ...result } = user;

    return {
      user: result,
      access_token: token,
    };
  }
}
