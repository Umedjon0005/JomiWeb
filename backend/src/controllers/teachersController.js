const pool = require('../config/database');
const { getLanguageFromRequest, applyTranslations } = require('../utils/language');

const translationFields = ['name', 'bio', 'qualifications', 'subjects'];

const getAllTeachers = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const result = await pool.query('SELECT * FROM teachers ORDER BY name ASC');
    const rows = result.rows.map(row => applyTranslations(row, lang, translationFields));
    res.json(rows);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    
    res.json(applyTranslations(result.rows[0], lang, translationFields));
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createTeacher = async (req, res) => {
  try {
    const { 
      name, bio, qualifications, subjects,
      name_ru, name_tj,
      bio_ru, bio_tj,
      qualifications_ru, qualifications_tj,
      subjects_ru, subjects_tj
    } = req.body;
    const photo_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO teachers (
        name, bio, qualifications, subjects, 
        name_ru, name_tj, bio_ru, bio_tj, qualifications_ru, qualifications_tj, subjects_ru, subjects_tj,
        photo_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [
        name,
        bio,
        qualifications,
        subjects,
        name_ru || null,
        name_tj || null,
        bio_ru || null,
        bio_tj || null,
        qualifications_ru || null,
        qualifications_tj || null,
        subjects_ru || null,
        subjects_tj || null,
        photo_url
      ]
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
    const { 
      name, bio, qualifications, subjects,
      name_ru, name_tj,
      bio_ru, bio_tj,
      qualifications_ru, qualifications_tj,
      subjects_ru, subjects_tj
    } = req.body;
    
    let photo_url = null;
    if (req.file) {
      photo_url = `/uploads/${req.file.filename}`;
    }

    let query, params;
    const baseParams = [
      name,
      bio,
      qualifications,
      subjects,
      name_ru || null,
      name_tj || null,
      bio_ru || null,
      bio_tj || null,
      qualifications_ru || null,
      qualifications_tj || null,
      subjects_ru || null,
      subjects_tj || null,
    ];

    if (photo_url) {
      query = `UPDATE teachers SET 
        name = $1, bio = $2, qualifications = $3, subjects = $4,
        name_ru = $5, name_tj = $6,
        bio_ru = $7, bio_tj = $8,
        qualifications_ru = $9, qualifications_tj = $10,
        subjects_ru = $11, subjects_tj = $12,
        photo_url = $13,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = $14 RETURNING *`;
      params = [...baseParams, photo_url, id];
    } else {
      query = `UPDATE teachers SET 
        name = $1, bio = $2, qualifications = $3, subjects = $4,
        name_ru = $5, name_tj = $6,
        bio_ru = $7, bio_tj = $8,
        qualifications_ru = $9, qualifications_tj = $10,
        subjects_ru = $11, subjects_tj = $12,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = $13 RETURNING *`;
      params = [...baseParams, id];
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

