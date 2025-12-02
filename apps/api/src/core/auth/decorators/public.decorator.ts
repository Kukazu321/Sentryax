import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator to mark routes as public (no auth required)
 * Usage: @Public() on controller method or class
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
