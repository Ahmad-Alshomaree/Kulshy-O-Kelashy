import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/db/schema';

// Use local SQLite for development or Turso for production
const url = process.env.TURSO_CONNECTION_URL || 'file:./local.db';
const authToken = process.env.TURSO_AUTH_TOKEN || '';

const client = createClient({
  url,
  authToken: authToken || undefined,
});

export const db = drizzle(client, { schema });

export type Database = typeof db;