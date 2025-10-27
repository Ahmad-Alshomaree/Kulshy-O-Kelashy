import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';

// Use local SQLite for development or Turso for production
const url = process.env.TURSO_CONNECTION_URL || 'file:./local.db';
const authToken = process.env.TURSO_AUTH_TOKEN || '';

const dbConfig: Config = defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url,
    authToken: authToken || undefined,
  },
});

export default dbConfig;