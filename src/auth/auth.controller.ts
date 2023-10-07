import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Role } from "@prisma/client";

import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { LoginAuthDto, RegisterAuthDto } from "./dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post("register")
  async register(@Body() dto: RegisterAuthDto) {
    const userDto = {
      ...dto,
      roles: [Role.PLAYER],
    };

    return await this.userService.create(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() dto: LoginAuthDto) {
    return this.authService.signIn(dto.username, dto.password);
  }

  // @Post("refresh-token")
  // refreshToken(@Body() dto: TokenDto) {
  //   return this.authService.create(createAuthDto);
  // }
}
