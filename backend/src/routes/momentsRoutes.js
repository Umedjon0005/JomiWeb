const express = require("express");
const router = express.Router();
const {
  getAllMoments,
  getMomentById,
  createMoment,
  updateMoment,
  deleteMoment,
} = require("../controllers/momentsController");
const { authenticate } = require("../middleware/auth");
const upload = require("../middleware/upload");

/**
 * @swagger
 * /api/moments:
 *   get:
 *     summary: Get all campus moments
 *     tags: [Moments]
 */
router.get("/", getAllMoments);
router.get("/:id", getMomentById);
router.post("/", authenticate, upload.single("image"), createMoment);
router.put("/:id", authenticate, upload.single("image"), updateMoment);
router.delete("/:id", authenticate, deleteMoment);

module.exports = router;
