const pool = require('../config/database');

const getAllTeachers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM teachers ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createTeacher = async (req, res) => {
  try {
    const { name, bio, qualifications, subjects } = req.body;
    const photo_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      'INSERT INTO teachers (name, bio, qualifications, subjects, photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, bio, qualifications, subjects, photo_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, qualifications, subjects } = req.body;
    
    let photo_url = null;
    if (req.file) {
      photo_url = `/uploads/${req.file.filename}`;
    }

    let query, params;
    if (photo_url) {
      query = 'UPDATE teachers SET name = $1, bio = $2, qualifications = $3, subjects = $4, photo_url = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *';
      params = [name, bio, qualifications, subjects, photo_url, id];
    } else {
      query = 'UPDATE teachers SET name = $1, bio = $2, qualifications = $3, subjects = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *';
      params = [name, bio, qualifications, subjects, id];
    }

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM teachers WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
};

