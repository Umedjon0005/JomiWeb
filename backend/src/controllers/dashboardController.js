const pool = require('../config/database');

const getDashboardStats = async (req, res) => {
  try {
    const [newsCount, eventsCount, teachersCount] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM news'),
      pool.query('SELECT COUNT(*) FROM events'),
      pool.query('SELECT COUNT(*) FROM teachers')
    ]);

    res.json({
      news: parseInt(newsCount.rows[0].count),
      events: parseInt(eventsCount.rows[0].count),
      teachers: parseInt(teachersCount.rows[0].count)
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardStats };

