const express = require('express');
const router = express.Router();
const {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require('../controllers/teachersController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: List of teachers
 *   post:
 *     summary: Create a new teacher (Admin only)
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.post('/', authenticate, upload.single('photo'), createTeacher);
router.put('/:id', authenticate, upload.single('photo'), updateTeacher);
router.delete('/:id', authenticate, deleteTeacher);

module.exports = router;
