require("dotenv").config();

// --- postgres connection ---

const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/collex"
);

module.exports = client;

/* 
- loads .env
- creates Client with my DATABASE_URL (w/ local feedback)
- exports the client so i can import it in my server and queries
*/