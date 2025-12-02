import { pgTable, text, timestamp, pgEnum, jsonb, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { createId } from '../utils';

/**
 * Webhooks schema
 * Incoming and outgoing webhook management
 */

export const webhookDirectionEnum = pgEnum('webhook_direction', ['incoming', 'outgoing']);
export const webhookStatusEnum = pgEnum('webhook_status', ['active', 'inactive', 'failed']);

export const webhooks = pgTable('webhooks', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  direction: webhookDirectionEnum('direction').notNull(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  secret: text('secret').notNull(), // for signature verification
  events: jsonb('events').$type<string[]>().default([]).notNull(),
  status: webhookStatusEnum('status').default('active').notNull(),
  lastTriggeredAt: timestamp('last_triggered_at', { withTimezone: true }),
  failureCount: integer('failure_count').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const webhookDeliveries = pgTable('webhook_deliveries', {
  id: text('id').primaryKey().$defaultFn(createId),
  webhookId: text('webhook_id')
    .notNull()
    .references(() => webhooks.id, { onDelete: 'cascade' }),
  event: text('event').notNull(),
  payload: jsonb('payload').$type<Record<string, unknown>>().notNull(),
  responseStatus: integer('response_status'),
  responseBody: text('response_body'),
  deliveredAt: timestamp('delivered_at', { withTimezone: true }),
  attempts: integer('attempts').default(0).notNull(),
  nextRetryAt: timestamp('next_retry_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Webhook = typeof webhooks.$inferSelect;
export type NewWebhook = typeof webhooks.$inferInsert;
export type WebhookDelivery = typeof webhookDeliveries.$inferSelect;
export type NewWebhookDelivery = typeof webhookDeliveries.$inferInsert;
