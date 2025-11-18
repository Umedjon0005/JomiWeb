const pool = require("../config/database");

const getAllMoments = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM moments ORDER BY sort_order ASC, created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching moments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getMomentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM moments WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Moment not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching moment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createMoment = async (req, res) => {
  try {
    const { title, caption, sort_order } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `
      INSERT INTO moments (title, caption, image_url, sort_order)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [title, caption || null, image_url, sort_order || 0]
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
    const { title, caption, sort_order } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const fields = ["title = $1", "caption = $2", "sort_order = $3"];
    const values = [title, caption || null, sort_order || 0];

    if (image_url) {
      fields.push("image_url = $4");
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
