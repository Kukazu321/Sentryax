import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// Feature modules
import { UsersModule } from './modules/users/users.module';
import { CompetitorsModule } from './modules/competitors/competitors.module';
import { ScansModule } from './modules/scans/scans.module';
import { CounterAttacksModule } from './modules/counter-attacks/counter-attacks.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

// Core modules
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './core/auth/auth.module';
import { QueueModule } from './core/queue/queue.module';
import { HealthModule } from './core/health/health.module';

/**
 * Root application module
 * Clean architecture with feature-based module organization
 */
@Module({
  imports: [
    // Configuration - loads .env files
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting - 100 requests per minute per IP
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Core modules
    DatabaseModule,
    AuthModule,
    QueueModule,
    HealthModule,

    // Feature modules
    UsersModule,
    CompetitorsModule,
    ScansModule,
    CounterAttacksModule,
    IntegrationsModule,
    WebhooksModule,
  ],
})
export class AppModule {}
