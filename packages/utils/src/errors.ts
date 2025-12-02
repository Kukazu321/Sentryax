/**
 * Custom error classes
 * Consistent error handling across the app
 */

export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 500,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

// Authentication errors
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super('FORBIDDEN', message, 403);
    this.name = 'ForbiddenError';
  }
}

// Resource errors
export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with ID ${id} not found` : `${resource} not found`;
    super('NOT_FOUND', message, 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409);
    this.name = 'ConflictError';
  }
}

// Validation errors
export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
  }
}

// Rate limiting
export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super('RATE_LIMITED', 'Too many requests', 429, { retryAfter });
    this.name = 'RateLimitError';
  }
}

// Quota errors
export class QuotaExceededError extends AppError {
  constructor(resource: string, limit: number) {
    super('QUOTA_EXCEEDED', `${resource} quota exceeded (limit: ${limit})`, 403, {
      resource,
      limit,
    });
    this.name = 'QuotaExceededError';
  }
}

// External service errors
export class ExternalServiceError extends AppError {
  constructor(service: string, message: string, details?: Record<string, unknown>) {
    super('EXTERNAL_SERVICE_ERROR', `${service}: ${message}`, 502, details);
    this.name = 'ExternalServiceError';
  }
}

export class IntegrationError extends AppError {
  constructor(integration: string, message: string) {
    super('INTEGRATION_ERROR', `${integration}: ${message}`, 400);
    this.name = 'IntegrationError';
  }
}

// Helper to check if error is an AppError
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

// Helper to convert unknown errors to AppError
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) return error;
  
  if (error instanceof Error) {
    return new AppError('INTERNAL_ERROR', error.message, 500);
  }
  
  return new AppError('INTERNAL_ERROR', 'An unexpected error occurred', 500);
}
