import { PartialType } from "@nestjs/swagger";

import { TokenDto } from "@/auth/dto/token.dto";

export class RefreshTokenDto extends PartialType(TokenDto) {}
