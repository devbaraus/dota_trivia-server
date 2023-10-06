import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthService } from "@/auth/auth.service";
import { TokenDto } from "@/auth/dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("token")
  token(@Body() dto: TokenDto) {
    return this.authService.signIn(dto.username, dto.password);
  }

  // @Post("refresh-token")
  // refreshToken(@Body() dto: TokenDto) {
  //   return this.authService.create(createAuthDto);
  // }
}
