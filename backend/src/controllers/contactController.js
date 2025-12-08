const pool = require('../config/database');

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // In a real application, you would save this to a database or send an email
    // For now, we'll just return success
    console.log('Contact form submission:', { name, email, subject, message });

    res.json({ 
      message: 'Thank you for your message. We will get back to you soon!',
      success: true 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContact };

