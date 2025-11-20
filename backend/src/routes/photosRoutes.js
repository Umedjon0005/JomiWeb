const express = require("express");
const router = express.Router();
const {
  getAllPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto,
} = require("../controllers/photosController");
const { authenticate } = require("../middleware/auth");
const upload = require("../middleware/upload");

/**
 * @swagger
 * /api/photos:
 *   get:
 *     summary: Get all photos
 *     tags: [Photos]
 */
router.get("/", getAllPhotos);
router.get("/:id", getPhotoById);
router.post("/", authenticate, upload.single("image"), createPhoto);
router.put("/:id", authenticate, upload.single("image"), updatePhoto);
router.delete("/:id", authenticate, deletePhoto);

module.exports = router;

