import { pgTable, text, timestamp, pgEnum, jsonb, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { competitors } from './competitors';
import { createId } from '../utils';

/**
 * Scans schema
 * Periodic competitor data collection
 */

export const scanStatusEnum = pgEnum('scan_status', ['pending', 'running', 'completed', 'failed']);
export const scanTypeEnum = pgEnum('scan_type', [
  'full',
  'incremental',
  'products',
  'pricing',
  'ads',
  'social',
]);
export const changeTypeEnum = pgEnum('change_type', [
  'price_change',
  'new_product',
  'removed_product',
  'stock_change',
  'ad_change',
  'content_change',
]);
export const changeSeverityEnum = pgEnum('change_severity', ['low', 'medium', 'high', 'critical']);

export const scans = pgTable('scans', {
  id: text('id').primaryKey().$defaultFn(createId),
  competitorId: text('competitor_id')
    .notNull()
    .references(() => competitors.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: scanTypeEnum('type').notNull(),
  status: scanStatusEnum('status').default('pending').notNull(),
  startedAt: timestamp('started_at', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  errorMessage: text('error_message'),
  metadata: jsonb('metadata').$type<{
    productsScanned?: number;
    changesDetected?: number;
    duration?: number;
    source?: string;
  }>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const scanResults = pgTable('scan_results', {
  id: text('id').primaryKey().$defaultFn(createId),
  scanId: text('scan_id')
    .notNull()
    .references(() => scans.id, { onDelete: 'cascade' }),
  competitorId: text('competitor_id')
    .notNull()
    .references(() => competitors.id, { onDelete: 'cascade' }),
  changeType: changeTypeEnum('change_type').notNull(),
  severity: changeSeverityEnum('severity').default('low').notNull(),
  entityType: text('entity_type').notNull(), // 'product' | 'variant' | 'ad' | 'content'
  entityId: text('entity_id').notNull(),
  previousValue: text('previous_value'),
  newValue: text('new_value'),
  diff: jsonb('diff').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const scanSchedules = pgTable('scan_schedules', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  competitorId: text('competitor_id').references(() => competitors.id, { onDelete: 'cascade' }),
  type: scanTypeEnum('type').notNull(),
  cronExpression: text('cron_expression').notNull(),
  isActive: jsonb('is_active').$type<boolean>().default(true).notNull(),
  lastRunAt: timestamp('last_run_at', { withTimezone: true }),
  nextRunAt: timestamp('next_run_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Scan = typeof scans.$inferSelect;
export type NewScan = typeof scans.$inferInsert;
export type ScanResult = typeof scanResults.$inferSelect;
export type NewScanResult = typeof scanResults.$inferInsert;
export type ScanSchedule = typeof scanSchedules.$inferSelect;
export type NewScanSchedule = typeof scanSchedules.$inferInsert;
