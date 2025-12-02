const pool = require('../config/database');
const { getLanguageFromRequest } = require('../utils/language');

const submitContact = async (req, res) => {
  try {
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
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      detail: error.detail,
      table: error.table
    });
    
    // Check if table doesn't exist
    if (error.code === '42P01' || error.message?.includes('does not exist') || error.message?.includes('contact_requests')) {
      console.error('❌ Contact requests table does not exist. Please run migration.');
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
    const result = await pool.query(
      `SELECT * FROM contact_requests 
       ORDER BY created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contact requests:', error);
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

