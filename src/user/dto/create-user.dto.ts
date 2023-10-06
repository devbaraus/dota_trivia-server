import { Exclude } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

import { User } from "@/user/entity";

export class CreateUserDto implements Omit<User, "passwordHash" | "createdAt" | "updatedAt" | "roles"> {
  @Exclude()
  id: number;

  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsDate()
  dateBirth: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(8)
  @IsStrongPassword()
  password: string;
}
