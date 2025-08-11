import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  constructor() {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token || process.env.INTERNAL_ACCESS_TOKEN !== token)
      throw new UnauthorizedException('Não autorizado!');
    return true
  }
}
