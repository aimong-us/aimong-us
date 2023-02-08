require('dotenv').config();
const { Pool } = require('pg');
const PG_URI = process.env.DB_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = pool;
