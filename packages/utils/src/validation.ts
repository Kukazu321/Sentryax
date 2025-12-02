import { z } from 'zod';

/**
 * Common Zod schemas for validation
 * Used across frontend and backend
 */

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// URL validation
export const urlSchema = z.string().url('Invalid URL');

// Shopify store URL validation
export const shopifyStoreUrlSchema = z
  .string()
  .regex(
    /^https:\/\/[a-zA-Z0-9-]+\.myshopify\.com\/?$/,
    'Must be a valid Shopify store URL (e.g., https://store.myshopify.com)'
  );

// Domain validation (without protocol)
export const domainSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
    'Invalid domain format'
  );

// Pagination schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ID validation (our custom format: timestamp_uuid)
export const idSchema = z.string().regex(/^[a-z0-9]+_[a-f0-9]{8}$/, 'Invalid ID format');

// Price validation
export const priceSchema = z.coerce
  .number()
  .min(0, 'Price must be positive')
  .multipleOf(0.01, 'Price must have at most 2 decimal places');

// Percentage validation (0-100)
export const percentageSchema = z.coerce
  .number()
  .min(0, 'Percentage must be at least 0')
  .max(100, 'Percentage must be at most 100');

// Cron expression validation (basic)
export const cronSchema = z
  .string()
  .regex(
    /^(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)\s+(\*|[0-9,\-\/]+)$/,
    'Invalid cron expression'
  );

// Competitor input validation
export const createCompetitorSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  domain: domainSchema,
  shopifyStoreUrl: shopifyStoreUrlSchema.optional(),
  logoUrl: urlSchema.optional(),
  type: z.enum(['direct', 'indirect', 'aspirational']).default('direct'),
  notes: z.string().max(1000, 'Notes too long').optional(),
});

export const updateCompetitorSchema = createCompetitorSchema.partial();

// Counter-attack rule validation
export const createCounterAttackRuleSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(500, 'Description too long').optional(),
  competitorId: idSchema.optional(),
  triggerCondition: z.enum([
    'price_drop',
    'price_increase',
    'new_product',
    'stock_out',
    'new_ad',
    'manual',
  ]),
  triggerThreshold: z.record(z.unknown()).optional(),
  counterAttackType: z.enum([
    'price_match',
    'price_undercut',
    'ad_campaign',
    'email_campaign',
    'social_post',
    'discount_code',
  ]),
  counterAttackConfig: z.record(z.unknown()),
  requiresApproval: z.boolean().default(true),
  isActive: z.boolean().default(true),
});

// Webhook validation
export const createWebhookSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  url: urlSchema,
  direction: z.enum(['incoming', 'outgoing']),
  events: z
    .array(
      z.enum([
        'scan.completed',
        'scan.failed',
        'change.detected',
        'change.critical',
        'counter_attack.created',
        'counter_attack.executed',
        'counter_attack.failed',
        'competitor.added',
        'competitor.removed',
      ])
    )
    .min(1, 'At least one event is required'),
});

// Type exports
export type CreateCompetitorInput = z.infer<typeof createCompetitorSchema>;
export type UpdateCompetitorInput = z.infer<typeof updateCompetitorSchema>;
export type CreateCounterAttackRuleInput = z.infer<typeof createCounterAttackRuleSchema>;
export type CreateWebhookInput = z.infer<typeof createWebhookSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
