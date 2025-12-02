import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { QUEUE_NAMES } from '@pricewatch/utils';

export const REDIS_CONNECTION = 'REDIS_CONNECTION';
export const SCANS_QUEUE = 'SCANS_QUEUE';
export const COUNTER_ATTACKS_QUEUE = 'COUNTER_ATTACKS_QUEUE';
export const WEBHOOKS_QUEUE = 'WEBHOOKS_QUEUE';

/**
 * Queue module using BullMQ + Redis
 * Why BullMQ over Bull:
 * - Better TypeScript support
 * - More features (rate limiting, prioritization)
 * - Active development
 * 
 * Why Upstash Redis:
 * - Serverless-friendly
 * - Pay-per-request pricing
 * - Global replication
 */
@Global()
@Module({
  providers: [
    {
      provide: REDIS_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.getOrThrow<string>('REDIS_URL');
        return new IORedis(redisUrl, {
          maxRetriesPerRequest: null,
          enableReadyCheck: false,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: SCANS_QUEUE,
      useFactory: (redis: IORedis) => {
        return new Queue(QUEUE_NAMES.scans, { connection: redis });
      },
      inject: [REDIS_CONNECTION],
    },
    {
      provide: COUNTER_ATTACKS_QUEUE,
      useFactory: (redis: IORedis) => {
        return new Queue(QUEUE_NAMES.counterAttacks, { connection: redis });
      },
      inject: [REDIS_CONNECTION],
    },
    {
      provide: WEBHOOKS_QUEUE,
      useFactory: (redis: IORedis) => {
        return new Queue(QUEUE_NAMES.webhooks, { connection: redis });
      },
      inject: [REDIS_CONNECTION],
    },
  ],
  exports: [REDIS_CONNECTION, SCANS_QUEUE, COUNTER_ATTACKS_QUEUE, WEBHOOKS_QUEUE],
})
export class QueueModule {}
