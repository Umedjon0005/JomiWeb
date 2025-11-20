const pool = require("../config/database");
const { getLanguageFromRequest, applyTranslations } = require("../utils/language");

const translationFields = ["title", "caption"];

const getAllMoments = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const result = await pool.query(
      "SELECT * FROM moments ORDER BY sort_order ASC, created_at DESC"
    );
    const rows = result.rows.map((row) =>
      applyTranslations(row, lang, translationFields)
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching moments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMomentById = async (req, res) => {
  try {
    const lang = getLanguageFromRequest(req);
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM moments WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Moment not found" });
    }
    res.json(applyTranslations(result.rows[0], lang, translationFields));
  } catch (error) {
    console.error("Error fetching moment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createMoment = async (req, res) => {
  try {
    const { title, caption, sort_order, title_ru, title_tj, caption_ru, caption_tj } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `
      INSERT INTO moments (title, caption, title_ru, title_tj, caption_ru, caption_tj, image_url, sort_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        title,
        caption || null,
        title_ru || null,
        title_tj || null,
        caption_ru || null,
        caption_tj || null,
        image_url,
        sort_order || 0,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating moment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateMoment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, caption, sort_order, title_ru, title_tj, caption_ru, caption_tj } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const fields = [
      "title = $1",
      "caption = $2",
      "title_ru = $3",
      "title_tj = $4",
      "caption_ru = $5",
      "caption_tj = $6",
      "sort_order = $7",
    ];
    const values = [
      title,
      caption || null,
      title_ru || null,
      title_tj || null,
      caption_ru || null,
      caption_tj || null,
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
      UPDATE moments
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length}
      RETURNING *
      `,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Moment not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating moment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMoment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM moments WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Moment not found" });
    }

    res.json({ message: "Moment deleted successfully" });
  } catch (error) {
    console.error("Error deleting moment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllMoments,
  getMomentById,
  createMoment,
  updateMoment,
  deleteMoment,
};
