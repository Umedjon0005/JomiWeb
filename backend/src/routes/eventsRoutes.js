const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventsController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 *   post:
 *     summary: Create a new event (Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', authenticate, upload.single('image'), createEvent);
router.put('/:id', authenticate, upload.single('image'), updateEvent);
router.delete('/:id', authenticate, deleteEvent);

module.exports = router;
