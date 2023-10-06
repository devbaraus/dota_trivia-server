import { PartialType } from "@nestjs/swagger";

import { LoginAuthDto } from "@/auth/dto/login-auth.dto";

export class RefreshTokenAuthDto extends PartialType(LoginAuthDto) {}
