const pool = require('../config/database');
const { getLanguageFromRequest, applyTranslations } = require('../utils/language');

const translationFields = ['label'];

const getStats = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const result = await pool.query('SELECT * FROM stats ORDER BY stat_key');
    const rows = result.rows.map(row => applyTranslations(row, lang, translationFields));
    res.json(rows);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStat = async (req, res) => {
  try {
    const { stat_key, stat_value, label, label_ru, label_tj } = req.body;

    const result = await pool.query(
      `INSERT INTO stats (stat_key, stat_value, label, label_ru, label_tj, updated_at)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       ON CONFLICT (stat_key) 
       DO UPDATE SET stat_value = $2, label = $3, label_ru = $4, label_tj = $5, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [
        stat_key,
        stat_value,
        label,
        label_ru || null,
        label_tj || null,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating stat:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStats,
  updateStat
};

