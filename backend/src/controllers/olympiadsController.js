const pool = require("../config/database");

const getAllOlympiads = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM olympiads ORDER BY olympiad_date DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching olympiads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOlympiadById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM olympiads WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Olympiad not found" });
    }

    res.json(result.rows[0]);
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
    } = req.body;

    const image_url =
      req.files && req.files.image && req.files.image[0]
        ? `/uploads/${req.files.image[0].filename}`
        : null;

    const project_image_url =
      req.files && req.files.project_image && req.files.project_image[0]
        ? `/uploads/${req.files.project_image[0].filename}`
        : null;

    const result = await pool.query(
      `INSERT INTO olympiads 
        (title, description, olympiad_date, location, image_url, reference_url, winner_name, project_name, project_image_url) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) 
       RETURNING *`,
      [
        title,
        description,
        olympiad_date,
        location || null,
        image_url,
        reference_url || null,
        winner_name || null,
        project_name || null,
        project_image_url,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating olympiad:", error);
    res.status(500).json({ message: "Server error" });
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
    } = req.body;

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
      "olympiad_date",
      "location",
      "reference_url",
      "winner_name",
      "project_name",
    ];
    const values = [
      title,
      description,
      olympiad_date,
      location || null,
      reference_url || null,
      winner_name || null,
      project_name || null,
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
