/**
 * @pricewatch/db
 * Database client and schema exports
 * Uses Drizzle ORM with Neon Serverless PostgreSQL
 */

export * from './client';
export * from './schema';

// Export Database type for dependency injection
export type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
export type Database = ReturnType<typeof import('./client').createHttpClient>;
