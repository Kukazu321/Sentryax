import { defineConfig } from 'drizzle-kit';

/**
 * Drizzle Kit configuration
 * Uses Neon Serverless PostgreSQL - zero cold starts, scales to zero
 * Why Neon over Supabase: Better serverless DX, branching, no connection pooling needed
 */
export default defineConfig({
  schema: './src/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
