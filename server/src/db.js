import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
dotenv.config();
import * as schema from './db/schema.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // use Render DB URL
  ssl: {
    rejectUnauthorized: false, // required for hosted Postgres
  },
});

export const db = drizzle(pool);
