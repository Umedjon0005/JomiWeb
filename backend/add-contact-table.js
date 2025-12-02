const pool = require('./src/config/database');

const addContactTable = async () => {
  try {
    console.log('Creating contact_requests table...');
    
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
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating contact_requests table:', error.message || error);
    if (error.code === '42501' || error.message?.includes('permission denied')) {
      console.error('\n⚠️  Database permission error. Please check database permissions.');
    }
    process.exit(1);
  }
};

addContactTable();

