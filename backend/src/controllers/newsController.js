const pool = require('../config/database');
const { getLanguageFromRequest, applyTranslations } = require('../utils/language');

const translationFields = ['title', 'content'];

const getAllNews = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const result = await pool.query('SELECT * FROM news ORDER BY publish_date DESC');
    const rows = result.rows.map(row => applyTranslations(row, lang, translationFields));
    res.json(rows);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getNewsById = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM news WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    res.json(applyTranslations(result.rows[0], lang, translationFields));
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, content, publish_date, title_ru, title_tj, content_ru, content_tj } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO news (title, content, title_ru, title_tj, content_ru, content_tj, image_url, publish_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        title,
        content,
        title_ru || null,
        title_tj || null,
        content_ru || null,
        content_tj || null,
        image_url,
        publish_date
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, publish_date, title_ru, title_tj, content_ru, content_tj } = req.body;
    
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    let query, params;
    if (image_url) {
      query = `UPDATE news SET 
        title = $1, 
        content = $2, 
        title_ru = $3, 
        title_tj = $4, 
        content_ru = $5, 
        content_tj = $6, 
        image_url = $7, 
        publish_date = $8, 
        updated_at = CURRENT_TIMESTAMP 
        WHERE id = $9 RETURNING *`;
      params = [
        title,
        content,
        title_ru || null,
        title_tj || null,
        content_ru || null,
        content_tj || null,
        image_url,
        publish_date,
        id
      ];
    } else {
      query = `UPDATE news SET 
        title = $1, 
        content = $2, 
        title_ru = $3, 
        title_tj = $4, 
        content_ru = $5, 
        content_tj = $6, 
        publish_date = $7, 
        updated_at = CURRENT_TIMESTAMP 
        WHERE id = $8 RETURNING *`;
      params = [
        title,
        content,
        title_ru || null,
        title_tj || null,
        content_ru || null,
        content_tj || null,
        publish_date,
        id
      ];
    }

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM news WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
};

