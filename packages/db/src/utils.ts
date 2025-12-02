/**
 * Database utilities
 */

/**
 * Generate a unique ID using crypto.randomUUID
 * Prefix with timestamp for better indexing and sortability
 * Format: {timestamp_base36}_{random_uuid_first8}
 */
export function createId(): string {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomUUID().split('-')[0];
  return `${timestamp}_${random}`;
}
