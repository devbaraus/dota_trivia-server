import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class InjectUserInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    if (type !== "Bearer") {
      return next.handle();
    }

    const { sub } = this.jwtService.decode(token);

    const user = await this.prismaService.user.findUnique({ where: { id: sub } });

    request.headers.user = user;

    return next.handle();
  }
}
