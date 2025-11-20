const pool = require("../config/database");
const { getLanguageFromRequest, applyTranslations } = require("../utils/language");

const translationFields = [
  "title",
  "description",
  "location",
  "winner_name",
  "project_name",
];

const getAllOlympiads = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const result = await pool.query(
      "SELECT * FROM olympiads ORDER BY olympiad_date DESC"
    );
    const rows = result.rows.map((row) =>
      applyTranslations(row, lang, translationFields)
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching olympiads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOlympiadById = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM olympiads WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Olympiad not found" });
    }

    res.json(applyTranslations(result.rows[0], lang, translationFields));
  } catch (error) {
    console.error("Error fetching olympiad:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createOlympiad = async (req, res) => {
  try {
    const {
      title,
      description,
      olympiad_date,
      location,
      reference_url,
      winner_name,
      project_name,
      title_ru,
      title_tj,
      description_ru,
      description_tj,
      location_ru,
      location_tj,
      winner_name_ru,
      winner_name_tj,
      project_name_ru,
      project_name_tj,
    } = req.body;

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Request body:', req.body);
      console.log('Request files:', req.files);
    }

    // Handle file uploads - multer.fields() stores files in req.files as an object
    const image_url =
      req.files && req.files.image && req.files.image[0]
        ? `/uploads/${req.files.image[0].filename}`
        : null;

    const project_image_url =
      req.files && req.files.project_image && req.files.project_image[0]
        ? `/uploads/${req.files.project_image[0].filename}`
        : null;

    // Validate required fields
    if (!title || !description || !olympiad_date) {
      return res.status(400).json({ 
        message: "Missing required fields: title, description, and olympiad_date are required" 
      });
    }

    // Format date - ensure it's in YYYY-MM-DD format
    let formattedDate = olympiad_date;
    if (olympiad_date && typeof olympiad_date === 'string' && olympiad_date.includes('T')) {
      formattedDate = olympiad_date.split('T')[0];
    }

    const result = await pool.query(
      `INSERT INTO olympiads 
        (title, description, title_ru, title_tj, description_ru, description_tj, olympiad_date, location, location_ru, location_tj, image_url, reference_url, winner_name, winner_name_ru, winner_name_tj, project_name, project_name_ru, project_name_tj, project_image_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
       RETURNING *`,
      [
        title,
        description,
        title_ru || null,
        title_tj || null,
        description_ru || null,
        description_tj || null,
        formattedDate,
        location || null,
        location_ru || null,
        location_tj || null,
        image_url,
        reference_url || null,
        winner_name || null,
        winner_name_ru || null,
        winner_name_tj || null,
        project_name || null,
        project_name_ru || null,
        project_name_tj || null,
        project_image_url,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating olympiad:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

const updateOlympiad = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      olympiad_date,
      location,
      reference_url,
      winner_name,
      project_name,
      title_ru,
      title_tj,
      description_ru,
      description_tj,
      location_ru,
      location_tj,
      winner_name_ru,
      winner_name_tj,
      project_name_ru,
      project_name_tj,
    } = req.body;

    // Format date - ensure it's in YYYY-MM-DD format
    let formattedDate = olympiad_date;
    if (olympiad_date && olympiad_date.includes('T')) {
      formattedDate = olympiad_date.split('T')[0];
    }

    const image_url =
      req.files && req.files.image && req.files.image[0]
        ? `/uploads/${req.files.image[0].filename}`
        : null;

    const project_image_url =
      req.files && req.files.project_image && req.files.project_image[0]
        ? `/uploads/${req.files.project_image[0].filename}`
        : null;

    const fields = [
      "title",
      "description",
      "title_ru",
      "title_tj",
      "description_ru",
      "description_tj",
      "olympiad_date",
      "location",
      "location_ru",
      "location_tj",
      "reference_url",
      "winner_name",
      "winner_name_ru",
      "winner_name_tj",
      "project_name",
      "project_name_ru",
      "project_name_tj",
    ];
    const values = [
      title,
      description,
      title_ru || null,
      title_tj || null,
      description_ru || null,
      description_tj || null,
      formattedDate || olympiad_date,
      location || null,
      location_ru || null,
      location_tj || null,
      reference_url || null,
      winner_name || null,
      winner_name_ru || null,
      winner_name_tj || null,
      project_name || null,
      project_name_ru || null,
      project_name_tj || null,
    ];

    if (image_url) {
      fields.push("image_url");
      values.push(image_url);
    }
    if (project_image_url) {
      fields.push("project_image_url");
      values.push(project_image_url);
    }

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");
    values.push(id);

    const query = `
      UPDATE olympiads 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $${values.length}
      RETURNING *`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Olympiad not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating olympiad:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOlympiad = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM olympiads WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Olympiad not found" });
    }

    res.json({ message: "Olympiad deleted successfully" });
  } catch (error) {
    console.error("Error deleting olympiad:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllOlympiads,
  getOlympiadById,
  createOlympiad,
  updateOlympiad,
  deleteOlympiad,
};
