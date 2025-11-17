const express = require('express');
const router = express.Router();
const {
  getAboutContent,
  updateAboutContent
} = require('../controllers/aboutController');
const { authenticate } = require('../middleware/auth');

// Public route
router.get('/', getAboutContent);

// Protected route
router.put('/', authenticate, updateAboutContent);

module.exports = router;

