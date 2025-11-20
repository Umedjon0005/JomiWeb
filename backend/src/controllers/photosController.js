const pool = require("../config/database");
const { getLanguageFromRequest, applyTranslations } = require("../utils/language");

const translationFields = ["title", "description"];

const getAllPhotos = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const result = await pool.query(
      "SELECT * FROM photos ORDER BY sort_order ASC, created_at DESC"
    );
    const rows = result.rows.map((row) =>
      applyTranslations(row, lang, translationFields)
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPhotoById = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM photos WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }
    res.json(applyTranslations(result.rows[0], lang, translationFields));
  } catch (error) {
    console.error("Error fetching photo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createPhoto = async (req, res) => {
  try {
    const { title, description, sort_order, title_ru, title_tj, description_ru, description_tj } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image_url) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await pool.query(
      `
      INSERT INTO photos (title, description, title_ru, title_tj, description_ru, description_tj, image_url, sort_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        title,
        description || null,
        title_ru || null,
        title_tj || null,
        description_ru || null,
        description_tj || null,
        image_url,
        sort_order || 0,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating photo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, sort_order, title_ru, title_tj, description_ru, description_tj } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const fields = [
      "title = $1",
      "description = $2",
      "title_ru = $3",
      "title_tj = $4",
      "description_ru = $5",
      "description_tj = $6",
      "sort_order = $7",
    ];
    const values = [
      title,
      description || null,
      title_ru || null,
      title_tj || null,
      description_ru || null,
      description_tj || null,
      sort_order || 0,
    ];

    if (image_url) {
      fields.push("image_url = $" + (fields.length + 1));
      values.push(image_url);
    }

    const setClause = fields.join(", ");
    values.push(id);

    const result = await pool.query(
      `
      UPDATE photos
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length}
      RETURNING *
      `,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating photo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM photos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto,
};

