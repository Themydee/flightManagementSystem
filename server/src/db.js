import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './db/schema.js';

const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',       // your PostgreSQL host
  port: 5433,              // default PostgreSQL port
  user: 'postgres',        // your DB username
  password: 'themydee2018', // your DB password
  database: 'flight_db',         // your DB name
});

export const db = drizzle(pool);
