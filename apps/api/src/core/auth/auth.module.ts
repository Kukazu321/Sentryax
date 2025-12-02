import { Module, Global } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ClerkService } from './clerk.service';

/**
 * Authentication module using Clerk
 * Why Clerk over Auth0:
 * - Better DX, simpler setup
 * - Built-in React components
 * - Generous free tier (10k MAU)
 * - Native webhook support for user sync
 */
@Global()
@Module({
  providers: [
    ClerkService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [ClerkService],
})
export class AuthModule {}
