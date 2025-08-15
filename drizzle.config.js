import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const connectionString =
  process.env.DATABASE_URL_MAIN && process.env.USE_PROD === "true"
    ? process.env.DATABASE_URL_MAIN // prod Neon branch
    : process.env.DATABASE_URL;    // dev Neon branch

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: connectionString },
	verbose: true,
	strict: true
});
