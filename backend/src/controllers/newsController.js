const pool = require('../config/database');

const getAllNews = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news ORDER BY publish_date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM news WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, content, publish_date } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      'INSERT INTO news (title, content, image_url, publish_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, image_url, publish_date]
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
    const { title, content, publish_date } = req.body;
    
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    let query, params;
    if (image_url) {
      query = 'UPDATE news SET title = $1, content = $2, image_url = $3, publish_date = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *';
      params = [title, content, image_url, publish_date, id];
    } else {
      query = 'UPDATE news SET title = $1, content = $2, publish_date = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *';
      params = [title, content, publish_date, id];
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

