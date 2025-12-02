import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator to extract current user from request
 * Usage: @CurrentUser() user: JwtPayload
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);

/**
 * Decorator to extract current user ID from request
 * Usage: @CurrentUserId() userId: string
 */
export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userId;
  }
);
