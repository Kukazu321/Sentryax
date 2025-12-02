import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClerkService } from './clerk.service';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

/**
 * Global authentication guard using Clerk
 * Validates JWT tokens from Authorization header
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly clerkService: ClerkService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }

    try {
      const payload = await this.clerkService.verifyToken(token);
      request.user = payload;
      request.userId = payload.sub;
    } catch {
      throw new UnauthorizedException('Invalid authentication token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request & { headers: { authorization?: string } }): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
