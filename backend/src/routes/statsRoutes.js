const express = require('express');
const router = express.Router();
const {
  getStats,
  updateStat
} = require('../controllers/statsController');
const { authenticate } = require('../middleware/auth');

// Public route
router.get('/', getStats);

// Protected route
router.put('/', authenticate, updateStat);

module.exports = router;

