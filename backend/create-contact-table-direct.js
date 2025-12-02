require('dotenv').config();
const { Pool } = require('pg');

const poolConfig = {
  host: process.env.DB_HOST || 'fdbfaab122c0842cf1db7eec.twc1.net',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'db_Jomiweb',
  user: process.env.DB_USER || 'umed',
  password: process.env.DB_PASSWORD || 'umed2020',
};

// Add SSL configuration for remote database
if (process.env.PGSSLROOTCERT && require('fs').existsSync(process.env.PGSSLROOTCERT)) {
  poolConfig.ssl = {
    rejectUnauthorized: true,
    ca: require('fs').readFileSync(process.env.PGSSLROOTCERT).toString(),
  };
} else {
  poolConfig.ssl = {
    rejectUnauthorized: false,
  };
}

const pool = new Pool(poolConfig);

const createContactTable = async () => {
  try {
    console.log('🔄 Creating contact_requests table...');
    
    // Create contact_requests table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_requests (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500),
        message TEXT NOT NULL,
        language VARCHAR(10) DEFAULT 'en',
        read_status BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Contact requests table created successfully!');
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating contact_requests table:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    if (error.detail) {
      console.error('Error detail:', error.detail);
    }
    await pool.end();
    process.exit(1);
  }
};

createContactTable();

