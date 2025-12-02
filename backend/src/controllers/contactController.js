const pool = require('../config/database');
const { getLanguageFromRequest } = require('../utils/language');

// Ensure contact_requests table exists
const ensureTableExists = async () => {
  try {
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
    return true;
  } catch (error) {
    console.error('Error ensuring contact_requests table exists:', error);
    return false;
  }
};

// Call once on module load to ensure table exists
let tableChecked = false;
const checkTable = async () => {
  if (!tableChecked) {
    await ensureTableExists();
    tableChecked = true;
  }
};

const submitContact = async (req, res) => {
  try {
    // Ensure table exists before proceeding
    await checkTable();
    
    const { name, email, subject, message } = req.body;
    const lang = getLanguageFromRequest(req);

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required',
        success: false 
      });
    }

    // Save to database
    const result = await pool.query(
      `INSERT INTO contact_requests (name, email, subject, message, language)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, subject || null, message, lang]
    );

    console.log('Contact form submission saved:', result.rows[0].id);

    res.json({ 
      message: 'Thank you for your message. We will get back to you soon!',
      success: true 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Try to create table if it doesn't exist
    if (error.code === '42P01' || error.message?.includes('does not exist') || error.message?.includes('contact_requests')) {
      console.log('Attempting to create contact_requests table...');
      const tableCreated = await ensureTableExists();
      
      if (tableCreated) {
        // Retry the insert
        try {
          const { name, email, subject, message } = req.body;
          const lang = getLanguageFromRequest(req);
          const result = await pool.query(
            `INSERT INTO contact_requests (name, email, subject, message, language)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [name, email, subject || null, message, lang]
          );
          console.log('Contact form submission saved after table creation:', result.rows[0].id);
          return res.json({ 
            message: 'Thank you for your message. We will get back to you soon!',
            success: true 
          });
        } catch (retryError) {
          console.error('Error on retry:', retryError);
        }
      }
      
      return res.status(500).json({ 
        message: 'Database configuration error. Please contact administrator.',
        error: 'Table contact_requests does not exist. Please run database migration.'
      });
    }
    
    res.status(500).json({ 
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getAllContactRequests = async (req, res) => {
  try {
    // Ensure table exists
    await checkTable();
    
    const result = await pool.query(
      `SELECT * FROM contact_requests 
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    // Try to create table if it doesn't exist
    if (error.code === '42P01') {
      await ensureTableExists();
      return res.json([]); // Return empty array if table was just created
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const getContactRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM contact_requests WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Contact request not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching contact request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE contact_requests 
       SET read_status = TRUE 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Contact request not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating contact request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteContactRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM contact_requests WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Contact request not found' });
    }
    res.json({ message: 'Contact request deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  submitContact,
  getAllContactRequests,
  getContactRequestById,
  markAsRead,
  deleteContactRequest
};

