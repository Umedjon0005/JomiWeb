const express = require("express");
const router = express.Router();
const {
  getAllOlympiads,
  getOlympiadById,
  createOlympiad,
  updateOlympiad,
  deleteOlympiad,
} = require("../controllers/olympiadsController");
const { authenticate } = require("../middleware/auth");
const upload = require("../middleware/upload");

/**
 * @swagger
 * /api/olympiads:
 *   get:
 *     summary: Get all olympiads
 *     tags: [Olympiads]
 *   post:
 *     summary: Create a new olympiad (Admin only)
 *     tags: [Olympiads]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", getAllOlympiads);
router.get("/:id", getOlympiadById);
router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "project_image", maxCount: 1 },
  ]),
  createOlympiad
);
router.put(
  "/:id",
  authenticate,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "project_image", maxCount: 1 },
  ]),
  updateOlympiad
);
router.delete("/:id", authenticate, deleteOlympiad);

module.exports = router;
