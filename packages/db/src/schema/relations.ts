import { relations } from 'drizzle-orm';
import { users, userSettings } from './users';
import { competitors, competitorProducts, competitorProductVariants } from './competitors';
import { scans, scanResults, scanSchedules } from './scans';
import { counterAttacks, counterAttackRules } from './counter-attacks';
import { integrations, oauthStates } from './integrations';
import { webhooks, webhookDeliveries } from './webhooks';

/**
 * Drizzle ORM Relations
 * Defines relationships between tables for query builder
 */

// User relations
export const usersRelations = relations(users, ({ one, many }) => ({
  settings: one(userSettings, {
    fields: [users.id],
    references: [userSettings.userId],
  }),
  competitors: many(competitors),
  scans: many(scans),
  scanSchedules: many(scanSchedules),
  counterAttacks: many(counterAttacks),
  counterAttackRules: many(counterAttackRules),
  integrations: many(integrations),
  oauthStates: many(oauthStates),
  webhooks: many(webhooks),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(users, {
    fields: [userSettings.userId],
    references: [users.id],
  }),
}));

// Competitor relations
export const competitorsRelations = relations(competitors, ({ one, many }) => ({
  user: one(users, {
    fields: [competitors.userId],
    references: [users.id],
  }),
  products: many(competitorProducts),
  scans: many(scans),
  scanResults: many(scanResults),
  counterAttacks: many(counterAttacks),
  counterAttackRules: many(counterAttackRules),
}));

export const competitorProductsRelations = relations(competitorProducts, ({ one, many }) => ({
  competitor: one(competitors, {
    fields: [competitorProducts.competitorId],
    references: [competitors.id],
  }),
  variants: many(competitorProductVariants),
}));

export const competitorProductVariantsRelations = relations(
  competitorProductVariants,
  ({ one }) => ({
    product: one(competitorProducts, {
      fields: [competitorProductVariants.productId],
      references: [competitorProducts.id],
    }),
  })
);

// Scan relations
export const scansRelations = relations(scans, ({ one, many }) => ({
  user: one(users, {
    fields: [scans.userId],
    references: [users.id],
  }),
  competitor: one(competitors, {
    fields: [scans.competitorId],
    references: [competitors.id],
  }),
  results: many(scanResults),
}));

export const scanResultsRelations = relations(scanResults, ({ one, many }) => ({
  scan: one(scans, {
    fields: [scanResults.scanId],
    references: [scans.id],
  }),
  competitor: one(competitors, {
    fields: [scanResults.competitorId],
    references: [competitors.id],
  }),
  counterAttacks: many(counterAttacks),
}));

export const scanSchedulesRelations = relations(scanSchedules, ({ one }) => ({
  user: one(users, {
    fields: [scanSchedules.userId],
    references: [users.id],
  }),
  competitor: one(competitors, {
    fields: [scanSchedules.competitorId],
    references: [competitors.id],
  }),
}));

// Counter-attack relations
export const counterAttacksRelations = relations(counterAttacks, ({ one }) => ({
  user: one(users, {
    fields: [counterAttacks.userId],
    references: [users.id],
  }),
  competitor: one(competitors, {
    fields: [counterAttacks.competitorId],
    references: [competitors.id],
  }),
  scanResult: one(scanResults, {
    fields: [counterAttacks.scanResultId],
    references: [scanResults.id],
  }),
}));

export const counterAttackRulesRelations = relations(counterAttackRules, ({ one }) => ({
  user: one(users, {
    fields: [counterAttackRules.userId],
    references: [users.id],
  }),
  competitor: one(competitors, {
    fields: [counterAttackRules.competitorId],
    references: [competitors.id],
  }),
}));

// Integration relations
export const integrationsRelations = relations(integrations, ({ one }) => ({
  user: one(users, {
    fields: [integrations.userId],
    references: [users.id],
  }),
}));

export const oauthStatesRelations = relations(oauthStates, ({ one }) => ({
  user: one(users, {
    fields: [oauthStates.userId],
    references: [users.id],
  }),
}));

// Webhook relations
export const webhooksRelations = relations(webhooks, ({ one, many }) => ({
  user: one(users, {
    fields: [webhooks.userId],
    references: [users.id],
  }),
  deliveries: many(webhookDeliveries),
}));

export const webhookDeliveriesRelations = relations(webhookDeliveries, ({ one }) => ({
  webhook: one(webhooks, {
    fields: [webhookDeliveries.webhookId],
    references: [webhooks.id],
  }),
}));
