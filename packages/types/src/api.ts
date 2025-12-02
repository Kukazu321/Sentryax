/**
 * API types
 * Shared request/response types for API communication
 */

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// API Response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  stack?: string; // only in development
}

// Common error codes
export const ErrorCodes = {
  // Auth
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  
  // Resources
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',
  
  // Rate limiting
  RATE_LIMITED: 'RATE_LIMITED',
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  
  // External services
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  INTEGRATION_ERROR: 'INTEGRATION_ERROR',
  
  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

// Feature flags
export interface FeatureFlags {
  enableCounterAttacks: boolean;
  enableAiSuggestions: boolean;
  enableSlackIntegration: boolean;
  enableAdvancedAnalytics: boolean;
  maxCompetitors: number;
  maxScansPerDay: number;
}

// Dashboard stats
export interface DashboardStats {
  totalCompetitors: number;
  activeScans: number;
  changesThisWeek: number;
  counterAttacksExecuted: number;
  alertsTriggered: number;
}
