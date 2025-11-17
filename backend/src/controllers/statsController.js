const pool = require('../config/database');

const getStats = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stats ORDER BY stat_key');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStat = async (req, res) => {
  try {
    const { stat_key, stat_value, label } = req.body;

    const result = await pool.query(
      `INSERT INTO stats (stat_key, stat_value, label, updated_at)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
       ON CONFLICT (stat_key) 
       DO UPDATE SET stat_value = $2, label = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [stat_key, stat_value, label]
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

