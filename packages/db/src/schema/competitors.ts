import { pgTable, text, timestamp, pgEnum, numeric, boolean, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users';
import { createId } from '../utils';

/**
 * Competitors schema
 * Core entity for tracking competitor stores
 */

export const competitorStatusEnum = pgEnum('competitor_status', ['active', 'paused', 'archived']);
export const competitorTypeEnum = pgEnum('competitor_type', ['direct', 'indirect', 'aspirational']);

export const competitors = pgTable('competitors', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  domain: text('domain').notNull(),
  shopifyStoreUrl: text('shopify_store_url'),
  logoUrl: text('logo_url'),
  type: competitorTypeEnum('type').default('direct').notNull(),
  status: competitorStatusEnum('status').default('active').notNull(),
  notes: text('notes'),
  lastScannedAt: timestamp('last_scanned_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const competitorProducts = pgTable('competitor_products', {
  id: text('id').primaryKey().$defaultFn(createId),
  competitorId: text('competitor_id')
    .notNull()
    .references(() => competitors.id, { onDelete: 'cascade' }),
  externalId: text('external_id').notNull(),
  title: text('title').notNull(),
  handle: text('handle').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric('compare_at_price', { precision: 10, scale: 2 }),
  currency: text('currency').default('EUR').notNull(),
  imageUrl: text('image_url'),
  productUrl: text('product_url').notNull(),
  isAvailable: boolean('is_available').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const competitorProductVariants = pgTable('competitor_product_variants', {
  id: text('id').primaryKey().$defaultFn(createId),
  productId: text('product_id')
    .notNull()
    .references(() => competitorProducts.id, { onDelete: 'cascade' }),
  externalId: text('external_id').notNull(),
  title: text('title').notNull(),
  sku: text('sku'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric('compare_at_price', { precision: 10, scale: 2 }),
  isAvailable: boolean('is_available').default(true).notNull(),
  inventoryQuantity: jsonb('inventory_quantity').$type<number>(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Competitor = typeof competitors.$inferSelect;
export type NewCompetitor = typeof competitors.$inferInsert;
export type CompetitorProduct = typeof competitorProducts.$inferSelect;
export type NewCompetitorProduct = typeof competitorProducts.$inferInsert;
export type CompetitorProductVariant = typeof competitorProductVariants.$inferSelect;
export type NewCompetitorProductVariant = typeof competitorProductVariants.$inferInsert;
