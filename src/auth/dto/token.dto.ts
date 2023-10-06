import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class TokenDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(8)
  @IsStrongPassword()
  password: string;
}
