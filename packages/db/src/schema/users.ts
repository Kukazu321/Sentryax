import { pgTable, text, timestamp, pgEnum, jsonb } from 'drizzle-orm/pg-core';
import { createId } from '../utils';

/**
 * Users schema
 * Synced with Clerk via webhooks
 */

export const subscriptionTierEnum = pgEnum('subscription_tier', [
  'free',
  'starter',
  'growth',
  'enterprise',
]);

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'canceled',
  'past_due',
  'trialing',
]);

export const users = pgTable('users', {
  id: text('id').primaryKey().$defaultFn(createId),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  avatarUrl: text('avatar_url'),
  shopifyStoreUrl: text('shopify_store_url'),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('free').notNull(),
  subscriptionStatus: subscriptionStatusEnum('subscription_status').default('active').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  emailNotifications: jsonb('email_notifications').$type<boolean>().default(true).notNull(),
  slackNotifications: jsonb('slack_notifications').$type<boolean>().default(false).notNull(),
  weeklyReports: jsonb('weekly_reports').$type<boolean>().default(true).notNull(),
  instantAlerts: jsonb('instant_alerts').$type<boolean>().default(true).notNull(),
  timezone: text('timezone').default('UTC').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserSettings = typeof userSettings.$inferSelect;
export type NewUserSettings = typeof userSettings.$inferInsert;
