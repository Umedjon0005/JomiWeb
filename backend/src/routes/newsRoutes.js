const express = require('express');
const router = express.Router();
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/newsController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all news articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of news articles
 *   post:
 *     summary: Create a new news article (Admin only)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - publish_date
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               publish_date:
 *                 type: string
 *                 format: date
 *               image:
 *                 type: string
 *                 format: binary
 */
router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', authenticate, upload.single('image'), createNews);
router.put('/:id', authenticate, upload.single('image'), updateNews);
router.delete('/:id', authenticate, deleteNews);

module.exports = router;
