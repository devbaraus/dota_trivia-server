import { PartialType } from "@nestjs/swagger";

import { LoginAuthDto } from "./login-auth.dto";

export class RefreshTokenAuthDto extends PartialType(LoginAuthDto) {}
