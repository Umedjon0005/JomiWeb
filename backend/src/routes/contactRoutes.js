const express = require('express');
const router = express.Router();
const { 
  submitContact,
  getAllContactRequests,
  getContactRequestById,
  markAsRead,
  deleteContactRequest
} = require('../controllers/contactController');
const { authenticate } = require('../middleware/auth');

// Public route - submit contact form
router.post('/', submitContact);

// Protected routes - admin only
router.get('/', authenticate, getAllContactRequests);
router.get('/:id', authenticate, getContactRequestById);
router.patch('/:id/read', authenticate, markAsRead);
router.delete('/:id', authenticate, deleteContactRequest);

module.exports = router;

