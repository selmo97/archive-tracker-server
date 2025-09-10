require("dotenv").config();

// --- postgres connection ---

const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost:5432/collex" 
);

module.exports = client;

/* summary:
- loads .env
- creates Client/Postgres connection with my DATABASE_URL (w/ local feedback)
- exports the client so i can import it in my server and queries

❓Question
- small question on the database url... local host vs. db url 
*/