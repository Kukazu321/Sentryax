import { pgTable, text, timestamp, pgEnum, jsonb, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { competitors } from './competitors';
import { scanResults } from './scans';
import { createId } from '../utils';

/**
 * Counter-Attacks schema
 * Automated responses to competitor changes
 */

export const counterAttackTypeEnum = pgEnum('counter_attack_type', [
  'price_match',
  'price_undercut',
  'ad_campaign',
  'email_campaign',
  'social_post',
  'discount_code',
]);

export const counterAttackStatusEnum = pgEnum('counter_attack_status', [
  'draft',
  'pending_approval',
  'approved',
  'executing',
  'completed',
  'failed',
  'canceled',
]);

export const triggerConditionEnum = pgEnum('trigger_condition', [
  'price_drop',
  'price_increase',
  'new_product',
  'stock_out',
  'new_ad',
  'manual',
]);

export const counterAttacks = pgTable('counter_attacks', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  scanResultId: text('scan_result_id').references(() => scanResults.id, { onDelete: 'set null' }),
  competitorId: text('competitor_id')
    .notNull()
    .references(() => competitors.id, { onDelete: 'cascade' }),
  type: counterAttackTypeEnum('type').notNull(),
  status: counterAttackStatusEnum('status').default('draft').notNull(),
  triggerCondition: triggerConditionEnum('trigger_condition').notNull(),
  config: jsonb('config').$type<Record<string, unknown>>().notNull(),
  executedAt: timestamp('executed_at', { withTimezone: true }),
  result: jsonb('result').$type<{
    success: boolean;
    message: string;
    externalIds?: Record<string, string>;
    metrics?: Record<string, number>;
  }>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const counterAttackRules = pgTable('counter_attack_rules', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  competitorId: text('competitor_id').references(() => competitors.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  triggerCondition: triggerConditionEnum('trigger_condition').notNull(),
  triggerThreshold: jsonb('trigger_threshold').$type<Record<string, unknown>>(),
  counterAttackType: counterAttackTypeEnum('counter_attack_type').notNull(),
  counterAttackConfig: jsonb('counter_attack_config').$type<Record<string, unknown>>().notNull(),
  requiresApproval: boolean('requires_approval').default(true).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type CounterAttack = typeof counterAttacks.$inferSelect;
export type NewCounterAttack = typeof counterAttacks.$inferInsert;
export type CounterAttackRule = typeof counterAttackRules.$inferSelect;
export type NewCounterAttackRule = typeof counterAttackRules.$inferInsert;
