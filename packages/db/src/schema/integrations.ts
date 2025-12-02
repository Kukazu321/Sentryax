import { pgTable, text, timestamp, pgEnum, jsonb } from 'drizzle-orm/pg-core';
import { users } from './users';
import { createId } from '../utils';

/**
 * Integrations schema
 * OAuth connections to external services
 */

export const integrationTypeEnum = pgEnum('integration_type', [
  'shopify',
  'meta_ads',
  'google_ads',
  'klaviyo',
  'gmail',
  'canva',
  'slack',
]);

export const integrationStatusEnum = pgEnum('integration_status', [
  'connected',
  'disconnected',
  'error',
  'pending',
]);

export const integrations = pgTable('integrations', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: integrationTypeEnum('type').notNull(),
  status: integrationStatusEnum('status').default('pending').notNull(),
  externalAccountId: text('external_account_id'),
  externalAccountName: text('external_account_name'),
  // Tokens are encrypted at application level before storage
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token'),
  tokenExpiresAt: timestamp('token_expires_at', { withTimezone: true }),
  scopes: jsonb('scopes').$type<string[]>().default([]).notNull(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  lastSyncAt: timestamp('last_sync_at', { withTimezone: true }),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// OAuth state for CSRF protection
export const oauthStates = pgTable('oauth_states', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  integrationType: integrationTypeEnum('integration_type').notNull(),
  state: text('state').notNull().unique(),
  redirectUrl: text('redirect_url').notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Integration = typeof integrations.$inferSelect;
export type NewIntegration = typeof integrations.$inferInsert;
export type OAuthState = typeof oauthStates.$inferSelect;
export type NewOAuthState = typeof oauthStates.$inferInsert;
