/**
 * Application constants
 * Single source of truth for magic numbers and strings
 */

// Subscription tiers and their limits
export const SUBSCRIPTION_LIMITS = {
  free: {
    maxCompetitors: 3,
    maxScansPerDay: 5,
    maxCounterAttackRules: 1,
    maxWebhooks: 1,
    features: {
      enableCounterAttacks: false,
      enableAiSuggestions: false,
      enableSlackIntegration: false,
      enableAdvancedAnalytics: false,
    },
  },
  starter: {
    maxCompetitors: 10,
    maxScansPerDay: 50,
    maxCounterAttackRules: 5,
    maxWebhooks: 3,
    features: {
      enableCounterAttacks: true,
      enableAiSuggestions: false,
      enableSlackIntegration: false,
      enableAdvancedAnalytics: false,
    },
  },
  growth: {
    maxCompetitors: 50,
    maxScansPerDay: 500,
    maxCounterAttackRules: 25,
    maxWebhooks: 10,
    features: {
      enableCounterAttacks: true,
      enableAiSuggestions: true,
      enableSlackIntegration: true,
      enableAdvancedAnalytics: true,
    },
  },
  enterprise: {
    maxCompetitors: -1, // unlimited
    maxScansPerDay: -1, // unlimited
    maxCounterAttackRules: -1, // unlimited
    maxWebhooks: -1, // unlimited
    features: {
      enableCounterAttacks: true,
      enableAiSuggestions: true,
      enableSlackIntegration: true,
      enableAdvancedAnalytics: true,
    },
  },
} as const;

// Rate limiting
export const RATE_LIMITS = {
  api: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
  },
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10,
  },
  webhooks: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30,
  },
} as const;

// Scan intervals (in cron format)
export const SCAN_INTERVALS = {
  hourly: '0 * * * *',
  every6Hours: '0 */6 * * *',
  daily: '0 9 * * *',
  weekly: '0 9 * * 1',
} as const;

// Webhook retry configuration
export const WEBHOOK_RETRY = {
  maxAttempts: 5,
  backoffMs: [1000, 5000, 30000, 120000, 600000], // 1s, 5s, 30s, 2m, 10m
} as const;

// Queue names for BullMQ
export const QUEUE_NAMES = {
  scans: 'scans',
  counterAttacks: 'counter-attacks',
  webhooks: 'webhooks',
  notifications: 'notifications',
} as const;

// Cache TTLs (in seconds)
export const CACHE_TTL = {
  user: 300, // 5 minutes
  competitor: 60, // 1 minute
  scanResults: 3600, // 1 hour
  dashboard: 30, // 30 seconds
} as const;

// Severity colors for UI
export const SEVERITY_COLORS = {
  low: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  high: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  critical: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
} as const;

// Status colors for UI
export const STATUS_COLORS = {
  active: { bg: 'bg-green-100', text: 'text-green-700' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  paused: { bg: 'bg-gray-100', text: 'text-gray-700' },
  failed: { bg: 'bg-red-100', text: 'text-red-700' },
  completed: { bg: 'bg-blue-100', text: 'text-blue-700' },
} as const;
