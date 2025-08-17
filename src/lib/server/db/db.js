import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import * as schema from './schema';

let connectionString;

try{
    const { DATABASE_URL } = await import("$env/static/private");
    connectionString = DATABASE_URL;
}
catch (error) {
    console.error("Running outside of sveltekit environment, using environment variables directly.");
}

if (!connectionString) {
    connectionString = process.env.DATABASE_URL;
}

console.log(connectionString)

neonConfig.webSocketConstructor = ws;
const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });