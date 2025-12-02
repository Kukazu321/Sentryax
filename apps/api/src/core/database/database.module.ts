import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Import schema directly from workspace package
import * as schema from '../../../../packages/db/src/schema';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

/**
 * Database module using Drizzle ORM with PostgreSQL
 * Uses postgres.js driver for better performance in long-running processes
 */
@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.getOrThrow<string>('DATABASE_URL');
        
        // postgres.js client - better for NestJS than Neon HTTP
        const client = postgres(connectionString, {
          max: 10, // connection pool size
          idle_timeout: 20,
          connect_timeout: 10,
        });

        return drizzle(client, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
