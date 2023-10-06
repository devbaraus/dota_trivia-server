import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthService } from "@/auth/auth.service";
import { LoginAuthDto, RegisterAuthDto } from "@/auth/dto";
import { Role } from "@/auth/enum";
import { UserService } from "@/user/user.service";

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

  @Post("login")
  login(@Body() dto: LoginAuthDto) {
    return this.authService.signIn(dto.username, dto.password);
  }

  // @Post("refresh-token")
  // refreshToken(@Body() dto: TokenDto) {
  //   return this.authService.create(createAuthDto);
  // }
}
