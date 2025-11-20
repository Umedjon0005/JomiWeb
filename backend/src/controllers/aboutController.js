const pool = require('../config/database');
const { getLanguageFromRequest, applyTranslations } = require('../utils/language');

const translationFields = ['title', 'content'];

const getAboutContent = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const result = await pool.query('SELECT * FROM about_content ORDER BY section_key');
    const rows = result.rows.map(row => applyTranslations(row, lang, translationFields));
    res.json(rows);
  } catch (error) {
    console.error('Error fetching about content:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAboutContent = async (req, res) => {
  try {
    const { section_key, title, content, title_ru, title_tj, content_ru, content_tj } = req.body;

    const result = await pool.query(
      `INSERT INTO about_content (section_key, title, content, title_ru, title_tj, content_ru, content_tj, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
       ON CONFLICT (section_key) 
       DO UPDATE SET title = $2, content = $3, title_ru = $4, title_tj = $5, content_ru = $6, content_tj = $7, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [
        section_key,
        title,
        content,
        title_ru || null,
        title_tj || null,
        content_ru || null,
        content_tj || null,
      ]
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

