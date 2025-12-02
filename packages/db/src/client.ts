import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Database client factory
 * Why Neon HTTP driver: Perfect for serverless, no connection management needed
 * For long-running processes (NestJS), use the WebSocket driver instead
 */

// HTTP client for serverless (Next.js Server Actions, API routes)
export function createHttpClient(databaseUrl: string) {
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

// Type export for use in other packages
export type Database = ReturnType<typeof createHttpClient>;

// Singleton for serverless environments
let httpClient: Database | null = null;

export function getHttpClient(): Database {
  if (!httpClient) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    httpClient = createHttpClient(url);
  }
  return httpClient;
}
