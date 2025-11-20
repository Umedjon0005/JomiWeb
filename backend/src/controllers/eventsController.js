const pool = require('../config/database');
const { getLanguageFromRequest, applyTranslations } = require('../utils/language');

const translationFields = ['title', 'description', 'location'];

const getAllEvents = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const result = await pool.query('SELECT * FROM events ORDER BY event_date DESC');
    const rows = result.rows.map(row => applyTranslations(row, lang, translationFields));
    res.json(rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(applyTranslations(result.rows[0], lang, translationFields));
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, event_date, location, title_ru, title_tj, description_ru, description_tj, location_ru, location_tj } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO events (
        title, description, title_ru, title_tj, description_ru, description_tj,
        event_date, location, location_ru, location_tj, image_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [
        title,
        description,
        title_ru || null,
        title_tj || null,
        description_ru || null,
        description_tj || null,
        event_date,
        location,
        location_ru || null,
        location_tj || null,
        image_url
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date, location, title_ru, title_tj, description_ru, description_tj, location_ru, location_tj } = req.body;
    
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    let query, params;
    if (image_url) {
      query = `UPDATE events SET 
        title = $1,
        description = $2,
        title_ru = $3,
        title_tj = $4,
        description_ru = $5,
        description_tj = $6,
        event_date = $7,
        location = $8,
        location_ru = $9,
        location_tj = $10,
        image_url = $11,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = $12 RETURNING *`;
      params = [
        title,
        description,
        title_ru || null,
        title_tj || null,
        description_ru || null,
        description_tj || null,
        event_date,
        location,
        location_ru || null,
        location_tj || null,
        image_url,
        id
      ];
    } else {
      query = `UPDATE events SET 
        title = $1,
        description = $2,
        title_ru = $3,
        title_tj = $4,
        description_ru = $5,
        description_tj = $6,
        event_date = $7,
        location = $8,
        location_ru = $9,
        location_tj = $10,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = $11 RETURNING *`;
      params = [
        title,
        description,
        title_ru || null,
        title_tj || null,
        description_ru || null,
        description_tj || null,
        event_date,
        location,
        location_ru || null,
        location_tj || null,
        id
      ];
    }

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};

