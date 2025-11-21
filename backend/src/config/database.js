const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = {
  host: process.env.DB_HOST || 'fdbfaab122c0842cf1db7eec.twc1.net',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'db_Jomiweb',
  user: process.env.DB_USER || 'umed',
  password: process.env.DB_PASSWORD || 'umed2020',
};

// Add SSL configuration if PGSSLROOTCERT is set (for managed PostgreSQL)
if (process.env.PGSSLROOTCERT) {
  poolConfig.ssl = {
    rejectUnauthorized: true,
    ca: require('fs').readFileSync(process.env.PGSSLROOTCERT).toString(),
  };
} else if (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1') {
  // For remote databases, use SSL by default
  poolConfig.ssl = {
    rejectUnauthorized: false, // Set to true if you have a CA certificate
  };
}

const pool = new Pool(poolConfig);

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

