const pool = require('../config/database');

const getAboutContent = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM about_content ORDER BY section_key');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching about content:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAboutContent = async (req, res) => {
  try {
    const { section_key, title, content } = req.body;

    const result = await pool.query(
      `INSERT INTO about_content (section_key, title, content, updated_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
       ON CONFLICT (section_key) 
       DO UPDATE SET title = $2, content = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [section_key, title, content]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating about content:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAboutContent,
  updateAboutContent
};

