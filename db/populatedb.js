// db/populatedb.js
// Edit the SQL to match your project's tables

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_member BOOLEAN NOT NULL DEFAULT false,
  is_admin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
`;

async function main() {
  console.log("Creating tables...");
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done!");
}

main();